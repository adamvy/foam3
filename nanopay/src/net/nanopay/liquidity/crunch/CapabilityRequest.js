foam.CLASS({
  package: 'net.nanopay.liquidity.crunch',
  name: 'CapabilityRequest', 

  implements: [
    'net.nanopay.liquidity.approvalRequest.ApprovableAware'
  ],

  imports: [
    'capabilityAccountTemplateDAO'
  ],

  javaImports: [
    'net.nanopay.liquidity.crunch.LiquidCapability',
    'foam.nanos.crunch.UserCapabilityJunction',
    'net.nanopay.liquidity.crunch.AccountBasedLiquidCapability',
    'net.nanopay.liquidity.crunch.ApproverLevel',
    'net.nanopay.liquidity.crunch.GlobalLiquidCapability',
  ],

  tableColumns: [
    'id',
    'requestType',
    'users'
  ],

  properties: [  
    {
      name: 'id',
      class: 'Long',
      hidden: true
    },
    {
      name: 'requestType',
      javaType: 'net.nanopay.liquidity.crunch.CapabilityRequestOperations',
      class: 'Enum',
      of: 'net.nanopay.liquidity.crunch.CapabilityRequestOperations'
    },
    {
      name: 'users',
      class: 'List',
      javaType: 'java.util.List<Long>',
      factory: function () {
        return [];
      },
      view: () => {
        return {
          class: 'foam.u2.view.ReferenceArrayView',
          daoKey: 'userDAO'
        };
      }
    },
    {
      class: 'Reference',
      name: 'accountBasedCapability',
      of: 'net.nanopay.liquidity.crunch.AccountBasedLiquidCapability',
      visibilityExpression: function(requestType) {
        if ( 
          requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.ASSIGN_ACCOUNT_BASED ||
          requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.REVOKE_ACCOUNT_BASED
        ) {
          return foam.u2.Visibility.RW;
        }
        return foam.u2.Visibility.HIDDEN;
      }
    },
    {
      class: 'Reference',
      name: 'globalCapability',
      of: 'net.nanopay.liquidity.crunch.GlobalLiquidCapability',
      visibilityExpression: function(requestType) {
        if ( 
          requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.ASSIGN_GLOBAL ||
          requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.REVOKE_GLOBAL
        ) {
          return foam.u2.Visibility.RW;
        }
        return foam.u2.Visibility.HIDDEN;
      }
    },
    {
      name: 'capabilityAccountTemplateChoice',
      flags: ['js'],
      class: 'Reference',
      of: 'net.nanopay.liquidity.crunch.CapabilityAccountTemplate',
      label: 'Choose Capability Account Template',
      visibilityExpression: function(requestType) {
        if ( requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.ASSIGN_ACCOUNT_BASED ) return foam.u2.Visibility.RW;
        return foam.u2.Visibility.HIDDEN;
      },
      postSet: function(_, data) {
        this.capabilityAccountTemplateDAO.find(data).then((template) => {
          this.capabilityAccountTemplate = template;
        });
      }
    },
    {
      name: 'capabilityAccountTemplate',
      class: 'FObjectProperty',
      of: 'net.nanopay.liquidity.crunch.CapabilityAccountTemplate',
      label: 'Create New Template Or Customize Chosen Capability Account Template ', 
      visibilityExpression: function(requestType) {
        if ( requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.ASSIGN_ACCOUNT_BASED ) return foam.u2.Visibility.RW;
        return foam.u2.Visibility.HIDDEN;
      },
      factory: function() {
        return this.capabilityAccountTemplate || net.nanopay.liquidity.crunch.CapabilityAccountTemplate.create();
      }, 
      view: function(_, x) {
        return {  
          class: 'foam.u2.view.FObjectView',
        };
      }
    },
    {
      class: 'Reference',
      name: 'account',
      of : 'net.nanopay.account.Account',
      visibilityExpression: function(requestType) {
        if ( requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.REVOKE_ACCOUNT_BASED ) return foam.u2.Visibility.RW;
        return foam.u2.Visibility.HIDDEN;
      }
    },
    {
      name: 'approverLevel',
      class: 'Int',
      javaType: 'java.lang.Integer',
      visibilityExpression: function(requestType) {
        if ( requestType == net.nanopay.liquidity.crunch.CapabilityRequestOperations.ASSIGN_GLOBAL ) return foam.u2.Visibility.RW;
        return foam.u2.Visibility.HIDDEN;
      }
    },
    {
      class: 'foam.core.Enum',
      of: 'foam.nanos.auth.LifecycleState',
      name: 'lifecycleState',
      value: foam.nanos.auth.LifecycleState.PENDING,
      visibility: foam.u2.Visibility.HIDDEN
    },
  ],

  methods: [
    {
      name: 'getApprovableKey',
      type: 'String',
      javaCode: `
        String id = String.valueOf(getId());
        return id;
      `
    }
  ]
});