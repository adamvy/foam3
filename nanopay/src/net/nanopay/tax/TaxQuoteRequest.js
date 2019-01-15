foam.CLASS({
    package: 'net.nanopay.tax',
    name: 'TaxQuoteRequest',

    javaImports: [
      'foam.nanos.auth.User',
      'net.nanopay.tx.TransactionLineItem'
    ],

    documentation: 'Represents tax quote request for a set of taxable items in a transaction.',

    properties: [
        {
          class: 'FObjectArray',
          of: 'net.nanopay.tax.TaxItem',
          name: 'lines',
          javaFactory: 'return new TaxItem[0];',
          documentation: 'TransactionLineItem to be quoted.'
        },
        {
          class: 'String',
          name: 'type'
        },
        {
          class: 'Reference',
          of: 'foam.nanos.auth.User',
          name: 'fromUser'
        },
        {
          class: 'Reference',
          of: 'foam.nanos.auth.User',
          name: 'toUser'
        },
    ]
});
