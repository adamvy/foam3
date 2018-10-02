foam.INTERFACE({
  package: 'net.nanopay.security.receipt',
  name: 'ReceiptGenerator',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.security.receipt.ReceiptGenerationPolicy',
      name: 'receiptGenerationPolicy'
    }
  ],

  methods: [
    {
      name: 'add',
      args: [
        { class: 'FObjectProperty', name: 'obj' }
      ]
    },
    {
      name: 'build',
      javaReturns: 'void'
    }
  ]
});
