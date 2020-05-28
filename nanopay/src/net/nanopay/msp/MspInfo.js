foam.CLASS({
  package: 'net.nanopay.msp',
  name: 'MspInfo',
  ids: ['spid'],

  documentation: 'The base model for the Multi Service Provider Setup.',

  tableColumns: [
    'spid',
    'adminUserPassword',
    'adminUserFirstname',
    'adminUserLastname',
    'appName',
    'description'
  ],

  searchColumns: [
    'spid',
    'adminUserFirstname',
    'adminUserLastname',
    'appName'
  ],

  properties: [
    {
      class: 'String',
      name: 'spid',
      validationPredicates: [
        {
          args: ['spid'],
          predicateFactory: function(e) {
            return e.REG_EXP(net.nanopay.msp.MspInfo.ID, /^[a-z0-9]+$/);
          },
          errorString: 'Invalid character(s) in spid.'
        }
      ],
      required: true
    },
    {
      class: 'EMail',
      name: 'adminUserEmail',
      required: true
    },
    {
      class: 'Password',
      name: 'adminUserPassword',
      required: true
    },
    {
      class: 'String',
      name: 'adminUserFirstname',
      required: true
    },
    {
      class: 'String',
      name: 'adminUserLastname',
      required: true
    },
    {
      class: 'List',
      name: 'domain'
    },
    {
      class: 'String',
      name: 'appName',
      required: true
    },
    {
      class: 'String',
      name: 'description'
    }
  ]
});
