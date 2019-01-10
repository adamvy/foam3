foam.CLASS({
  package: 'net.nanopay.tx',
  name: 'SummaryTransaction',
  extends: 'net.nanopay.tx.model.Transaction',

  javaImports: [
    'net.nanopay.tx.model.Transaction'
  ],

  documentation: 'Used solely to present a summary of LineItems for chained Transactions',

  methods: [
     {
      documentation: `return true when status change is such that normal (forward) Transfers should be executed (applied)`,
      name: 'canTransfer',
      args: [
        {
          name: 'x',
          javaType: 'foam.core.X'
        },
        {
          name: 'oldTxn',
          javaType: 'Transaction'
        }
      ],
      javaType: 'Boolean',
      javaCode: `
        return false;
      `
    },
    {
      documentation: `return true when status change is such that reveral Transfers should be executed (applied)`,
      name: 'canReverseTransfer',
      args: [
        {
          name: 'x',
          javaType: 'foam.core.X'
        },
        {
          name: 'oldTxn',
          javaType: 'Transaction'
        }
      ],
      javaType: 'Boolean',
      javaCode: `
        return false;
      `
    }
  ]
});
