foam.CLASS({
  package: 'net.nanopay.flinks.model',
  name: 'FlinksAccount',
  
  properties: [
    {
      class: 'String',
      name: 'accountName'
    },
    {
      class: 'String',
      name: 'accountNo'
    },
    {
      class: 'Double',
      name: 'balance'
    },
    {
      class: 'Boolean',
      name: 'isSelected'
    },
    {
      class: 'String',
      name: 'institution'
    }
  ]
})