foam.CLASS({
  package: 'net.nanopay.meter.compliance',
  name: 'NanopayComplianceService',

  documentation: 'Implementation of Compliance Service used for validating user/business/account compliance',

  implements: [
    'net.nanopay.meter.compliance.ComplianceService'
  ],

  javaImports: [
    'foam.nanos.auth.User',
    'foam.nanos.session.Session',
    'net.nanopay.admin.model.ComplianceStatus',
    'net.nanopay.model.Business'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'enabled',
      value: true
    }
  ],

  methods: [
    {
      name: 'checkUserCompliance',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'Boolean',
      javaCode: `
        User agent = (User) x.get("agent");
        if ( agent != null ) {
          return ComplianceStatus.PASSED == agent.getCompliance();
        }

        User user = (User) x.get("user");
        if ( user != null ) {
          return ComplianceStatus.PASSED == user.getCompliance();
        }

        return true;
      `
    },
    {
      name: 'checkBusinessCompliance',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'Boolean',
      javaCode: `
        User user = (User) x.get("user");
        if ( user instanceof Business ) {
          return ComplianceStatus.PASSED == user.getCompliance();
        }
        return true;
      `
    },
    {
      name: 'checkAccountCompliance',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'Boolean',
      javaCode: `
        // return true for now until we design a way to retrieve the active account
        return true;
      `
    }
  ]
});
