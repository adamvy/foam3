foam.CLASS({
  package: 'net.nanopay.sps.model',
  name: 'GeneralRequestPacket',
  extends: 'net.nanopay.sps.model.RequestPacket',

  properties: [
    {
      class: 'Int',
      name: 'msgNum',
    },
    {
      class: 'Int',
      name: 'packetNum'
    },
    {
      class: 'Int',
      name: 'messageModifierCode'
    },
    {
      class: 'String',
      name: 'localTransactionTime'
    },
    {
      class: 'String',
      name: 'textMsg'
    },
    {
      class: 'String',
      name: 'TID'
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.sps.model.UserInfo',
      name: 'userInfo'
    },
    {
      class: 'String',
      name: 'MICR'
    },
    {
      class: 'String',
      name: 'routeCode'
    },
    {
      class: 'String',
      name: 'account'
    },
    {
      class: 'String',
      name: 'checkNum'
    },
    {
      class: 'Long',
      name: 'amount'
    },
    {
      class: 'String',
      name: 'invoice'
    },
    {
      class: 'String',
      name: 'clerkID'
    },
    {
      class: 'String',
      name: 'maxDetailItemsPerTransmission'
    },
    {
      class: 'Int',
      name: 'socialSecurityNum'
    },
    {
      class: 'String',
      name: 'itemID'
    },
    {
      class: 'String',
      name: 'optionsSelected'
    },
    {
      class: 'String',
      name: 'driversLicense'
    },
    {
      class: 'String',
      name: 'DLStateCode'
    },
    {
      class: 'String',
      name: 'dateOfBirth'
    },
    {
      class: 'String',
      name: 'phoneNumber'
    }
  ],

  javaImports: [
    'java.util.*',
    'foam.core.*'
  ],

  axioms: [
    {
      name: 'javaExtras',
      buildJavaClass: function (cls) {
        cls.extras.push(`
{
list = new ArrayList<>();
list.add(MSG_NUM);
list.add(PACKET_NUM);
list.add(MESSAGE_MODIFIER_CODE);
list.add(LOCAL_TRANSACTION_TIME);
list.add(TEXT_MSG);
list.add(TID);
list.add(USER_INFO);
list.add(MICR);
list.add(ROUTE_CODE);
list.add(ACCOUNT);
list.add(CHECK_NUM);
list.add(AMOUNT);
list.add(INVOICE);
list.add(CLERK_ID);
list.add(MAX_DETAIL_ITEMS_PER_TRANSMISSION);
list.add(SOCIAL_SECURITY_NUM);
list.add(ITEM_ID);
list.add(OPTIONS_SELECTED);
list.add(DRIVERS_LICENSE);
list.add(DLSTATE_CODE);
list.add(DATE_OF_BIRTH);
list.add(PHONE_NUMBER);
}
        `);
      }
    }
  ]

});
