foam.CLASS({
  package: 'net.nanopay.sme.ui',
  name: 'BalanceView',
  extends: 'foam.u2.View',

  documentation: `
    The purpose of this view is to show a user's balance in each currency
    across all of their accounts.

    Several cards are shown in a row, one for each currency. Each card contains
    the sum of all accounts the user has for that currency.
  `,

  imports: [
    'balanceDAO', // This is required by the call to `account.findBalance()`.
    'user'
  ],

  requires: [
    'foam.dao.ArraySink',
    'foam.mlang.sink.GroupBy',
    'net.nanopay.account.Account',
    'net.nanopay.sme.ui.BalanceCard'
  ],

  methods: [
    function initE() {
      this
        .addClass(this.myClass())
        .start('div', null, this.content$)
          .addClass(this.myClass('content'))
        .end();
      this.generateBalanceCards();
    },
    function generateBalanceCards() {
      /**
       * Add balance cards to the view for each currency denomination that the
       * user has accounts in.
       */
      return this.user.accounts.select(this.GroupBy.create({
        arg1: this.Account.DENOMINATION,
        arg2: this.ArraySink.create()
      })).then((result) => {
        result.groupKeys.forEach((denomination) => {
          var group = result.groups[denomination];
          Promise
            .all(group.array.map((account) => account.findBalance(this)))
            .then((values) => values.reduce((acc, c) => acc + c))
            .then((balance) => {
              this.add(this.BalanceCard.create({
                balance: balance,
                denomination: denomination
              }));
            });
        });
      });
    }
  ]
});
