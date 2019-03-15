foam.CLASS({
  package: 'net.nanopay.tx.model',
  name: 'LiquiditySettings',

  implements: [
    'foam.mlang.Expressions',
  ],

  requires: [
    'net.nanopay.account.Account',
    'net.nanopay.account.DigitalAccount'
  ],
  imports: [
  'liquiditySettingsDAO'
  ],

  //relationship: 1:* LiquiditySettings : DigitalAccount

  //ids: ['account'],

  plural: 'Liquidity Settings',

  css: `
  .foam-u2-view-RichChoiceView-container {
    z-index:1;
  }
  `,
  properties: [
    /*{
      class: 'Reference',
      of: 'net.nanopay.account.DigitalAccount',
      targetDAOKey: 'accountDAO',
      name: 'account',
      view: function(_, X) {
        return foam.u2.view.RichChoiceView.create({
          search: true,
          selectionView: { class: 'net.nanopay.ui.AccountSelectionView', accountDAO: X.accountDAO },
          rowView: { class: 'net.nanopay.ui.AccountRowView' },
          sections: [
            {
              dao: X.accountDAO
            }
          ],
        });
      },
      postSet: function(oldValue, newValue) {
        this.account$find.then(function(account) {
          this.highLiquidity.pushPullOwner = this.lowLiquidity.pushPullOwner = account.owner;
        }.bind(this));
      },
      documentation: 'Primary key and reference to account that liquidity settings are executed on. Can be instanceof DigitalAccount only.'
    },*/
    {
      class: 'Long',
      name: 'id',
      label: 'ID',
      visibility: 'RO',
      value: 0
    },
      {
        class: 'String',
        name: 'name',
        value: 'name'
      }
    {
      class: 'Enum',
      of: 'net.nanopay.tx.model.Frequency',
      name: 'cashOutFrequency',
      documentation: 'Determines how often a automatic cash out can occur.'
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.tx.Liquidity',
      name: 'highLiquidity',
      factory: function() {
        return net.nanopay.tx.Liquidity.create({
          resetBalance: 0,
          threshold: 0,
          enable: false,
        });
      }
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.tx.Liquidity',
      name: 'lowLiquidity',
      factory: function() {
        return net.nanopay.tx.Liquidity.create({});
      }
    }
  ]
});

foam.CLASS({
  package: 'net.nanopay.tx.model',
  name: 'GroupRefine',
  refines: 'foam.nanos.auth.Group',

  properties: [
    {
      name: 'liquiditySettings',
      class: 'FObjectProperty',
      of: 'net.nanopay.tx.model.LiquiditySettings',
      factory: function() {return net.nanopay.tx.model.LiquiditySettings.create();}
    }
  ]
});
