foam.CLASS({
  package: 'net.nanopay.sme.ui',
  name: 'InvoiceOverview',
  extends: 'foam.u2.View',

  documentation: `
    Invoice detail view of Payable/Receivable for Ablii.
    Displays invoice information, transaction details and
    invoice changes (Invoice history).
  `,

  implements: [
    'foam.mlang.Expressions',
  ],

  requires: [
    'foam.u2.dialog.NotificationMessage',
    'net.nanopay.invoice.model.InvoiceStatus',
    'net.nanopay.invoice.model.PaymentStatus'
  ],

  imports: [
    'ctrl',
    'publicUserDAO',
    'stack',
    'user'
  ],

  messages: [
    {
      name: 'BACK',
      message: 'Back'
    }
  ],

  css: `
    ^ {
      margin-left: 50px;
      margin-right: 50px;
    }
    ^ .left-block {
      vertical-align: top;
      display: inline-block;
      width: calc(50% - 25px);
      height: 650px;
      margin-right: 5px;
    }
    ^ .right-block {
      vertical-align: top;
      display: inline-block;
      width: calc(50% - 25px);
      height: 650px;
      margin-left: 5px;
    }
    ^back-area {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    ^ .parent {
      margin-left: 15px;
    }
    ^ .subtitle {
      width: 360px;
      font-size: 18px;
      display: inline-block;
    }
    ^ .print {
      margin-right: 15px;
    }
    ^ .invoice-content {
      background-color: white;
      padding: 14px;
      border-radius: 8px;
    }
    ^ .payment-content {
      background-color: white;
      padding: 14px;
      border-radius: 4px;
      height: 40%;
      margin-bottom: 10px;
    }
    ^ .invoice-history-content {
      background-color: white;
      padding: 14px;
      border-radius: 4px;
      height: calc(650px - 40% - 28px - 10px);
    }
    ^back-arrow {
      font-size: 20pt;
    }
    ^top-bar {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'isPayable',
      documentation: `Denotes whether this view is for a payable
          or a receivable.`
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.invoice.model.Invoice',
      name: 'invoice',
      documentation: 'The invoice object passed from Payables/Receivables view.'
    },
  ],

  methods: [
    function initE() {
      // Dynamic create top button based on 'isPayable'
      this.generateTop(this.isPayable);


      this
        .addClass(this.myClass())
        .start()
          .start('h1')
            .add('Invoice #' + this.invoice.invoiceNumber)
          .end()
        .end()
        .start()
          .style({ 'margin-bottom': '20px' })
          .start(this.PRINT)
            .addClass('print')
          .end()
          .start(this.DOWNLOAD_AS_PDF)
            .addClass('print')
          .end()
        .end()

        .start()
          .start()
            .addClass('left-block')
            .addClass('invoice-content')
            .tag({ class: 'net.nanopay.sme.ui.InvoiceDetails', invoice: this.invoice })
          .end()
          .start()
            .addClass('right-block')
            .start()
              .addClass('payment-content')
              .addClass('invoice-text-label')
              .add('Payment Details')
            .end()
            .start()
              .addClass('invoice-history-content')
              .start()
                .addClass('invoice-text-label')
                .add('Invoice History')
              .end()
              .start({
                class: 'net.nanopay.invoice.ui.history.InvoiceHistoryView',
                id: this.invoice.id
              }).style({ 'height': '270px', 'overflow-y': 'scroll' }).end()
            .end()
          .end()
        .end()
      .end();
    },

    function generateTop(isPayable) {
      if ( isPayable ) {
        var action = this.PAY_NOW;
      } else {
        var action = this.RECORD_PAYMENT;
      }
      // 'startContext' is required to pass the context to the button
      this
        .startContext({ data: this })
          .start()
            .addClass(this.myClass('top-bar'))
            .start()
              .addClass(this.myClass('back-area'))
              .start('span')
                .addClass(this.myClass('back-arrow'))
                .add('←')
              .end()
              .start('span')
                .addClass('parent')
                .add(this.BACK)
              .end()
              .on('click', this.goBack)
            .end()
            .tag(action)
          .end()
        .endContext();
    }
  ],

  listeners: [
    function goBack(X) {
      this.stack.back();
    }
  ],

  actions: [
    {
      name: 'payNow',
      label: 'Pay now',
      isAvailable: function() {
        return this.invoice.paymentMethod === this.PaymentStatus.NONE ||
          this.invoice.draft ||
          this.invoice.paymentMethod === this.PaymentStatus.PENDING_APPROVAL;
        // TODO: auth.check(this.user, 'invoice.pay');
      },
      code: function(X) {
        this.stack.push({
          class: 'net.nanopay.sme.ui.SendRequestMoney',
          isPayable: this.isPayable,
          isForm: false,
          isDetailView: true,
          hasSaveOption: false,
          invoice: this.invoice
        });
      }
    },
    {
      name: 'recordPayment',
      label: 'Record Payment',
      isAvailable: function() {
        return this.invoice.paymentMethod === this.PaymentStatus.NONE;
      },
      code: function(X) {
        // TODO: Update the redirection to record payment popup
        ctrl.add(foam.u2.dialog.Popup.create(undefined, X).tag({
          class: 'net.nanopay.invoice.ui.modal.RecordPaymentModal',
          invoice: this.invoice
        }));
      }
    },
    {
      name: 'print',
      label: 'Print',
      code: function(X) {
        window.print();
      }
    },
    {
      name: 'downloadAsPDF',
      label: 'Download as PDF',
      code: function(X) {
        // TODO: add download as PDF feature
        alert('Not implemented yet!');
      }
    }
  ]
});
