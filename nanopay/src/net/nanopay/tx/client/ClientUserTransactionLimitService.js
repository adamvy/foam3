foam.CLASS({
  package: 'net.nanopay.tx.client',
  name: 'ClientUserTransactionLimitService',

  properties: [
    {
      class: 'Stub',
      of: 'net.nanopay.tx.UserTransactionLimit',
      name: 'delegate'
    }
  ]
});
