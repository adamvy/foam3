foam.CLASS({
  package: 'net.nanopay.tx.tp.alterna.client',
  name: 'ClientAlternaSFTPService',

  properties: [
    {
      class: 'Stub',
      of: 'net.nanopay.tx.tp.alterna.SFTPService',
      name: 'delegate'
    }
  ]
});
