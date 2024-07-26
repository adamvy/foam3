/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.analytics.mixpanel',
  name: 'MixpanelAnalyticEventAction',
  implements: [ 'foam.nanos.ruler.RuleAction' ],
  documentation: 'Rule to send analyticEvent data to Mixpanel',

  javaImports: [
    'com.mixpanel.mixpanelapi.ClientDelivery',
    'com.mixpanel.mixpanelapi.MessageBuilder',
    'com.mixpanel.mixpanelapi.MixpanelAPI',

    'foam.core.ContextAgent',
    'foam.core.X',
    'foam.dao.DAO',
    'foam.nanos.analytics.AnalyticEvent',
    'foam.nanos.auth.AuthService',
    'foam.nanos.auth.User',
    'foam.nanos.logger.Loggers',
    'foam.util.SafetyUtil',

    'java.io.IOException',

    'org.json.JSONObject'
  ],

  constants: [
    {
      type: 'String',
      name: 'PROJECT_TOKEN',
      value: '2cf01d4604ecf0ba8038c7034fe7851d'
    }
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            AnalyticEvent event = (AnalyticEvent) obj;
            String trackingId = event.getSessionId();

            MessageBuilder messageBuilder = new MessageBuilder(PROJECT_TOKEN);
            MixpanelAPI mixpanel = new MixpanelAPI();

            // build message
            JSONObject props = new JSONObject(event.toJSON());
            JSONObject sentEvent = messageBuilder.event(trackingId, event.getName(), props);

            ClientDelivery delivery = new ClientDelivery();
            delivery.addMessage(sentEvent);

            try {
              mixpanel.deliver(delivery);
            } catch (IOException e) {
              Loggers.logger(x, this).error("Failed sending analyticEvent:", event.getId(), "Can't communicate with Mixpanel");
            }
          }
        }, "Send message to mixpanel");
      `
    }
  ]
});