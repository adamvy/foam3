
foam.CLASS({
  package: 'net.nanopay.invoice.ui.modal',
  name: 'PayNowModal',
  extends: 'foam.u2.View',

  documentation: 'Pay Now Modal',

  requires: [
    'net.nanopay.ui.modal.ModalHeader'
  ],

  implements: [
    'net.nanopay.ui.modal.ModalStyling'
  ],

  axioms: [
    foam.u2.CSS.create({
      code: function CSS() {/*    
      ^{
        width: 448px;
        margin: auto;
        font-family: Roboto;
      }
    */}
    })
  ],
  
  methods: [
    function initE(){
      this.SUPER();
      var self = this;

      this
      .tag(this.ModalHeader.create({
        title: 'Pay Now'
      }))
      .addClass(this.myClass())
        .start()
          .start().addClass('key-value-container')
            .start()
              .start().addClass('key').add("Company").end()
              .start().addClass('value').add(this.__context__.data.payeeName).end()
            .end()
            .start()
              .start().addClass('key').add("Amount").end()
              .start().addClass('value').add('$', this.__context__.data.amount.toFixed(2)).end()
            .end()
          .end()
          .start().addClass('label').add("Payment Method").end()
          .start('select').addClass('full-width-input').end()
          .start().addClass('label').add("Note").end()
          .start('input').addClass('input-box').end()
          .start().addClass('blue-button').add('Pay Now').end()
        .end()
      .end()
    } 
  ]
})