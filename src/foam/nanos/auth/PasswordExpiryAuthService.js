foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'PasswordExpiryAuthService',
  extends: 'foam.nanos.auth.ProxyAuthService',

  documentation: 'Checks password expiry',

  imports: [
    'localUserDAO'
  ],

  javaImports: [
    'javax.naming.AuthenticationException',
    'java.util.Calendar',
    'java.util.TimeZone'
  ],

  methods: [
    {
      name: 'login',
      javaCode:
`User user = getDelegate().login(x, userId, password);
 if ( isPasswordExpired(user) ) {
   throw new AuthenticationException("Password expired");
 }
 return user;`
    },
    {
      name: 'loginByEmail',
      javaCode:
`User user = getDelegate().loginByEmail(x, email, password);
if ( isPasswordExpired(user) ) {
  throw new AuthenticationException("Password expired");
}
return user;`
    },
    {
      name: 'isPasswordExpired',
      documentation: 'Checks if password is expired. True if expired, false if not expired',
      javaReturns: 'boolean',
      args: [
        {
          name: 'user',
          javaType: 'foam.nanos.auth.User'
        }
      ],
      javaCode:
`if ( user == null ) return true;
if ( user.getPasswordExpiry() == null ) return false;

// if we are after the expiry date then prevent login
Calendar expiry = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
Calendar now = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
expiry.setTime(user.getPasswordExpiry());
return now.after(expiry);`
    }
  ]
});
