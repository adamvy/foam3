foam.CLASS({
  package: 'net.nanopay.onboarding',
  name: 'FirebaseInvitationTokenService',
  extends: 'foam.nanos.auth.token.AbstractTokenService',

  imports: [
    'appConfig',
    'email',
    'localTransactionDAO',
    'localUserDAO',
    'logger',
    'tokenDAO'
  ],

  javaImports: [
    'foam.dao.DAO',
    'foam.nanos.app.AppConfig',
    'foam.nanos.auth.User',
    'foam.nanos.auth.token.Token',
    'foam.nanos.logger.Logger',
    'foam.nanos.notification.email.EmailMessage',
    'foam.nanos.notification.email.EmailService',
    'foam.nanos.session.Session',
    'org.apache.commons.io.IOUtils',

    'java.io.BufferedReader',
    'java.io.BufferedWriter',
    'java.io.InputStreamReader',
    'java.io.OutputStreamWriter',
    'java.net.HttpURLConnection',
    'java.net.URL',
    'java.nio.charset.StandardCharsets',
    'java.util.Calendar',
    'java.util.HashMap',
    'java.util.UUID',
  ],

  axioms: [
    {
      name: 'javaExtras',
      buildJavaClass: function(cls) {
        cls.extras.push(foam.java.Code.create({
          data:
`protected ThreadLocal<StringBuilder> sb = new ThreadLocal<StringBuilder>() {
  @Override
  protected StringBuilder initialValue() {
    return new StringBuilder();
  }

  @Override
  public StringBuilder get() {
    StringBuilder b = super.get();
    b.setLength(0);
    return b;
  }
};`
        }))
      }
    }
  ],

  constants: [
    {
      type: 'String',
      name: 'FIREBASE_DYNAMIC_URL',
      value: 'http://n43qr.app.goo.gl',
      swiftType: 'String',
      swiftValue: '"http://n43qr.app.goo.gl"'
    }
  ],

  properties: [
    {
      class: 'String',
      name: 'apn'
    },
    {
      class: 'String',
      name: 'ofl'
    },
    {
      class: 'String',
      name: 'ibi'
    },
    {
      class: 'String',
      name: 'isi'
    }
  ],

  methods: [
    {
      name: 'generateExpiryDate',
      javaCode:
`Calendar calendar = Calendar.getInstance();
calendar.add(Calendar.DAY_OF_MONTH, 30);
return calendar.getTime();`
    },

    {
      name: 'generateTokenWithParameters',
      javaCode:
`HttpURLConnection conn = null;
OutputStreamWriter writer = null;
BufferedReader reader = null;

try {
  AppConfig config = (AppConfig) getAppConfig();
  DAO tokenDAO = (DAO) getTokenDAO();
  DAO userDAO = (DAO) getLocalUserDAO();
  String url = config.getUrl().replaceAll("/$", "");

  // get current user from session
  Session session = x.get(Session.class);
  if (session == null || session.getUserId() == 0) {
    throw new RuntimeException("Error creating invite");
  }

  // set invited and invited by and store user
  user.setInvited(true);
  user.setSpid("nanopay");
  user.setGroup("shopper");
  user.setInvitedBy(session.getUserId());
  User result = (User) userDAO.put(user);

  // generate token
  Token token = (Token) tokenDAO.put(new Token.Builder(getX())
      .setUserId(result.getId())
      .setExpiry(generateExpiryDate())
      .setData(UUID.randomUUID().toString())
      .setParameters(parameters)
      .build());

  // generate dynamic link
  String dynamicLink = sb.get()
      .append("{\\"longDynamicLink\\":\\"")
      .append(FIREBASE_DYNAMIC_URL)
      .append("?link=").append(url).append("/appRedirect")
      .append("?token=").append(token.getData())
      .append("&apn=").append(getApn())
      .append("&ibi=").append(getIbi())
      .append("&isi=").append(getIsi())
      .append("&ofl=").append(getOfl())
      .append("\\",\\"suffix\\":{\\"option\\":\\"SHORT\\"}}")
      .toString();

  // post request to short link endpoint
  conn = (HttpURLConnection) new URL("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAe7vKguMpkERrzme1wepQvTBAv6AAPXu4").openConnection();
  conn.setRequestMethod("POST");
  conn.setReadTimeout(5 * 1000);
  conn.setConnectTimeout(5 * 1000);
  conn.setRequestProperty("Accepts", "application/json");
  conn.setRequestProperty("Content-Type", "application/json");
  conn.setDoInput(true);
  conn.setDoOutput(true);

  // write dynamic link
  writer = new OutputStreamWriter(conn.getOutputStream(), StandardCharsets.UTF_8);
  writer.write(dynamicLink);
  writer.flush();

  // check response code
  int code = conn.getResponseCode();
  boolean success = ( code >= 200 && code <= 299 );

  // get response
  StringBuilder builder = sb.get();
  reader = new BufferedReader(new InputStreamReader(success ?
      conn.getInputStream() : conn.getErrorStream(), StandardCharsets.UTF_8));
  for (String line; (line = reader.readLine()) != null; ) {
    builder.append(line);
  }

  // throw error message
  if ( ! success ) {
    throw new RuntimeException(builder.toString());
  }

  EmailService email = (EmailService) getEmail();
  EmailMessage message = new EmailMessage.Builder(x)
      .setTo(new String[]{user.getEmail()})
      .build();

  HashMap<String, Object> args = new HashMap<>();
  args.put("name", user.getEmail());
  args.put("email", user.getEmail());
  args.put("link", builder.toString());
  if ( parameters != null && parameters.containsKey("amount") ) {
    args.put("amount", parameters.get("amount"));
  }

  email.sendEmailFromTemplate(result, message, "welcome-email", args);
  result.setPortalAdminCreated(false);
  result.setWelcomeEmailSent(true);
  userDAO.put(result);
  return true;
} catch (Throwable t) {
  ((Logger) getLogger()).error(t);
  return false;
} finally {
  IOUtils.closeQuietly(writer);
  IOUtils.closeQuietly(reader);
  if (conn != null) {
    conn.disconnect();
  }
}`
    },

    {
      name: 'processToken',
      javaCode: `return false;`
    }
  ]
});