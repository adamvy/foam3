foam.CLASS({
  package: 'net.nanopay.liquidity',
  name: 'Liquidity',

  requires: [
    'foam.core.Currency',
    'foam.u2.TextField',
    'foam.u2.view.ValueView',
    'net.nanopay.account.Account',
    'net.nanopay.account.DigitalAccount'
  ],

  implements: [
    'foam.mlang.Expressions',
    'foam.nanos.auth.EnabledAware'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'enabled',
      documentation: 'Determines whether Liquidity is active, and notifications and/or re-balancing is to occur',
      value: true
    },
    {
      class: 'Boolean',
      name: 'rebalancingEnabled',
      label: 'Automate Sweep',
      visibilityExpression: function(enabled) {
        return enabled ? foam.u2.Visibility.RW : foam.u2.Visibility.HIDDEN;
      },
      documentation: 'Triggeres automatic transaction on accounts.'
    },
    {
      visibility: 'hidden',
      class: 'Reference',
      of: 'foam.core.Unit',
      name: 'denomination',
      targetDAOKey: 'currencyDAO',
      storageTransient: true
    },
    {
      class: 'UnitValue',
      unitPropName: 'denomination',
      name: 'threshold',
      documentation: 'The balance when liquidity should be triggered.',
      visibilityExpression: function(enabled) {
        return enabled ? foam.u2.Visibility.RW : foam.u2.Visibility.HIDDEN;
      },
      view: { class: 'net.nanopay.liquidity.ui.LiquidCurrencyView' }
    },
    {
      class: 'UnitValue',
      unitPropName: 'denomination',
      name: 'resetBalance',
      label: 'Reset balance to',
      visibilityExpression: function(rebalancingEnabled) {
        return rebalancingEnabled ? foam.u2.Visibility.RW : foam.u2.Visibility.HIDDEN;
      },
      documentation: 'Account balance must match reset amount after liquidity transaction was generated.',
      view: { class: 'net.nanopay.liquidity.ui.LiquidCurrencyView' }
    },
    {
      class: 'Reference',
      of: 'net.nanopay.account.Account',
      name: 'pushPullAccount',
      label: 'Rebalancing Account',
      visibilityExpression: function(rebalancingEnabled) {
        return rebalancingEnabled ? foam.u2.Visibility.RW : foam.u2.Visibility.HIDDEN;
      },
      documentation: 'Account associated to setting.',
      view: function(_, X) {
        const Account = net.nanopay.account.Account;
        const LifecycleState = foam.nanos.auth.LifecycleState;
        var dao = foam.dao.ProxyDAO.create({
          delegate: X.accountDAO.where(
            X.data.AND(
              X.data.EQ(
                net.nanopay.account.Account.DENOMINATION,
                X.denominationToFilterBySlot.get()
              ),
              X.data.NOT(X.data.INSTANCE_OF(net.nanopay.account.AggregateAccount)),
              X.data.EQ(Account.LIFECYCLE_STATE, LifecycleState.ACTIVE)
            )
          )
        });

        if ( foam.core.Slot.isInstance(X.denominationToFilterBySlot) ) {
          this.onDetach(X.denominationToFilterBySlot.sub(function() {
            dao.delegate = X.accountDAO.where(
              X.data.AND(
                X.data.EQ(
                  net.nanopay.account.Account.DENOMINATION,
                  X.denominationToFilterBySlot.get()
                ),
                X.data.NOT(X.data.INSTANCE_OF(net.nanopay.account.AggregateAccount)),
                X.data.NOT(X.data.INSTANCE_OF(net.nanopay.account.SecuritiesAccount))
              )
            );
          }));
        }

        return foam.u2.view.RichChoiceView.create({
          search: true,
          choosePlaceholder: 'Select a denomination then choose from accounts...',
          sections: [
            { dao: dao }
          ]
        }, X);
      }
    }
  ]
});
