foam.CLASS({
  package:  'net.nanopay.integration.quick.model',
  name:  'QuickInvoices',
  properties:  [
    {
      class:  'FObjectArray',
      of: 'net.nanopay.integration.quick.model.QuickInvoice',
      name:  'Invoice'
    }
  ]
});