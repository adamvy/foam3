foam.CLASS({
  package: 'net.nanopay.sme.ui',
  name: 'InvoiceDetails',
  extends: 'foam.u2.View',

  documentation: `Reusable invoice details view can show both payables &
                  receivables information`,

  implements: [
    'foam.mlang.Expressions'
  ],

  requires: [
    'foam.core.PromiseSlot',
    'net.nanopay.auth.PublicUserInfo',
    'net.nanopay.invoice.model.Invoice',
    'net.nanopay.invoice.model.InvoiceStatus',
    'net.nanopay.invoice.model.PaymentStatus'
  ],

  imports: [
    'notify',
    'user'
  ],

  css: `
    ^ {
      background: #fff;
      border-radius: 3px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
      border: solid 1px #e2e2e3;
      padding: 24px;
    }
    ^ .invoice-title {
      width: 360px;
      font-size: 18px;
      display: inline-block;
    }
    ^ .invoice-text-left {
      display: inline-block;
      vertical-align: top;
      color: #8e9090;
      width: 50%;
    }
    ^ .invoice-text-right {
      display: inline-block;
      vertical-align: top;
      color: #8e9090;
      width: 50%;
      }
    ^ .bold-label {
      color: #2b2b2b;
      margin-bottom: 5px;
    }
    ^ .invoice-note {
      display: inline-block;
      max-height: 260px;
      overflow-y: scroll;
    }
    ^ .text-fade-out {
      background-image: linear-gradient(90deg, #000000 70%, rgba(0,0,0,0));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      overflow: hidden;
      white-space: nowrap;
    }
    ^ .sme-invoice-status {
      float: right;
    }
    ^ .invoice-content {
      border-top: solid 1px #e2e2e3;
      margin-top: 23px;
      padding-top: 23px;
    }
    ^ .invoice-row {
      margin-bottom: 32px;
    }
    ^ .invoice-status-container {
      float: right;
      margin-top: -35px;
    }
    ^attachment {
      text-decoration: underline;
      color: #604aff;
      cursor: pointer;
    }
    ^issue-date-block {
      display: inline-block;
      margin-left: 45px;
    }
    ^print-wrapper {
      display: inline-block;
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    ^link-icon {
      margin-right: 5px !important;
      display: inline;
    }
  `,

  constants: [
    {
      type: 'String',
      name: 'PRINT_ICON',
      value: 'images/print-resting.svg'
    },
    {
      type: 'String',
      name: 'PRINT_ICON_HOVER',
      value: 'images/print-hover.svg'
    },
    {
      type: 'String',
      name: 'EXPORT_ICON',
      value: 'images/export-icon-resting.svg'
    },
    {
      type: 'String',
      name: 'EXPORT_ICON_HOVER',
      value: 'images/export-icon-hover.svg'
    }
  ],

  properties: [
    'invoice',
    {
      class: 'Boolean',
      name: 'isSingleInvoice',
      value: true,
      documentation: `Only display print & export icons when this class is used
                      in the single payable/receivable overview.`
    },
    {
      class: 'String',
      name: 'formattedAmount',
      documentation: 'formattedAmount contains the currency symbol.',
      expression: function(invoice, invoice$destinationCurrency, invoice$amount) {
        // Format the amount & add the currency symbol
        if ( invoice$destinationCurrency !== undefined ) {
          return invoice.destinationCurrency$find.then((currency) => {
            return currency.format(invoice$amount);
          });
        }
        return Promise.resolve();
      },
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.auth.PublicUserInfo',
      name: 'payer',
      expression: function(invoice$payer, invoice$payerId, user$id, user, invoice$contactId) {
        if ( ! invoice$payer && invoice$payerId ) {
          if ( invoice$payerId === user$id ) {
            return Promise.resolve(this.PublicUserInfo.create(user));
          } else {
            return Promise.resolve(user.contacts.find(invoice$contactId).then(
              (u) => this.PublicUserInfo.create(u)
            ));
          }
        } else {
          return Promise.resolve(invoice$payer);
        }
      },
    },
    {
      class: 'Date',
      name: 'dueDate',
      expression: function(invoice$dueDate) {
        return invoice$dueDate ?
          invoice$dueDate.toISOString().substring(0, 10) : '';
      },
    },
    {
      class: 'Date',
      name: 'issueDate',
      expression: function(invoice$issueDate) {
        return invoice$issueDate ?
          invoice$issueDate.toISOString().substring(0, 10): '';
      },
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.auth.PublicUserInfo',
      name: 'payee',
      expression: function(invoice$payee, invoice$payeeId, user$id, user, invoice$contactId) {
        if ( ! invoice$payee && invoice$payeeId ) {
          if ( invoice$payeeId === user$id ) {
            return Promise.resolve(this.PublicUserInfo.create(user));
          } else {
            return Promise.resolve(user.contacts.find(invoice$contactId).then(
              (u) => this.PublicUserInfo.create(u)));
          }
        } else {
          return Promise.resolve(invoice$payee);
        }
      },
    }
  ],

  messages: [
    { name: 'ATTACHMENT_LABEL', message: 'Attachments' },
    { name: 'BALANCE_LABEL', message: 'Balance due' },
    { name: 'DUE_DATE_LABEL', message: 'Date due' },
    { name: 'INVOICE_NUMBER_LABEL', message: 'Invoice #' },
    { name: 'ISSUE_DATE_LABEL', message: 'Date issued' },
    { name: 'NOTE_LABEL', message: 'Notes' },
    { name: 'PAYEE_LABEL', message: 'Payment to' },
    { name: 'PAYER_LABEL', message: 'Payment from' },
    { name: 'PO_NO_LABEL', message: 'P.O. No. ' },
    { name: 'SAVE_AS_PDF_FAIL', message: 'There was an unexpected error when creating the PDF. Please contact support.' }
  ],

  methods: [
    function initE() {
      var self = this;
      this
        .addClass(this.myClass())
        .start()
          .addClass('medium-header')
          .addClass('inline')
          .add(this.slot(function(invoice$invoiceNumber) {
            return self.INVOICE_NUMBER_LABEL + invoice$invoiceNumber;
          }))
        .end()
        .add(this.slot(function(invoice, invoice$status) {
          var e = self.E();
          invoice.STATUS.tableCellFormatter.format(
            e, invoice$status, invoice, invoice.STATUS);
          return e;
        }))
        .start().addClass('invoice-content')
          .start()
            .addClass('invoice-row')
            .start()
              .addClass('invoice-text-left')
              .start()
                .addClass('bold-label')
                .add(this.PAYER_LABEL)
              .end()
              .add(this.payer$.map(function(payer) {
                return payer.then(function(payer) {
                  if ( payer != null ) {
                    var address = payer.businessAddress;
                    return self.E()
                      .start().add(payer.businessName).end()
                      .start().add(self.formatStreetAddress(address)).end()
                      .start().add(self.formatRegionAddress(address)).end()
                      .start().add(address.postalCode).end();
                  }
                });
              }))
            .end()
            .start()
              .addClass('invoice-text-left')
              .start().addClass('bold-label').add(this.PAYEE_LABEL).end()
              .add(this.payee$.map(function(payee) {
                return payee.then(function(payee) {
                  if ( payee != null ) {
                    return self.E()
                      .start().add(payee.firstName + ' ' + payee.lastName).end()
                      .start().add(payee.businessPhone.number).end()
                      .start().add(payee.email).end();
                  }
                });
              }))
            .end()
          .end()
          .start()
            .addClass('invoice-row')
            .start()
              .addClass('invoice-text-left')
              .start()
                .addClass('bold-label')
                .add(this.BALANCE_LABEL)
              .end()
              .add(this.PromiseSlot.create({
                promise$: this.formattedAmount$,
                initialValue: '...',
              }))
              .add(' ')
              .add(this.invoice$.dot('destinationCurrency'))
            .end()
            .start()
              .addClass('invoice-text-right')
              .start().addClass('inline-block')
                .start()
                  .addClass('bold-label')
                  .add(this.DUE_DATE_LABEL)
                .end()
                .start().add(this.dueDate$).end()
              .end()
              .start().addClass(this.myClass('issue-date-block'))
                .start()
                  .addClass('bold-label')
                  .add(this.ISSUE_DATE_LABEL)
                .end()
                .start().add(this.issueDate$).end()
              .end()
            .end()
          .end()
        .end()
        .start()
          .start()
            .add(this.ATTACHMENT_LABEL)
            .addClass('bold-label')
          .end()
          .start()
            .add(this.slot(function(invoice$invoiceFile) {
              return self.E().forEach(invoice$invoiceFile, function(file) {
                this
                  .start().addClass(self.myClass('attachment'))
                    .add(file.filename)
                    .on('click', () => {
                      window.open(file.address);
                    })
                  .end();
              });
            }))
          .end()
        .end()
        .br()
        .start()
          .addClass('bold-label')
          .add(this.NOTE_LABEL)
        .end()
        .start('span')
          .addClass('invoice-note')
          .add(this.invoice$.dot('note'))
        .end()

        .start().show(this.isSingleInvoice)
          .addClass(this.myClass('print-wrapper'))
          .start()
            .addClass('sme').addClass('link-button')
            .addClass(this.myClass('link-icon'))
            .start('img')
              .addClass('icon')
              .addClass(this.myClass('align-top'))
              .attr('src', this.PRINT_ICON)
            .end()
            .start('img')
              .addClass('icon').addClass('hover')
              .addClass(this.myClass('align-top'))
              .attr('src', this.PRINT_ICON_HOVER)
              .on('click', () => window.print())
            .end()
          .end()

          .start()
            .addClass('sme').addClass('link-button')
            .addClass(this.myClass('link-icon'))
            .start('img')
              .addClass('icon')
              .addClass(this.myClass('align-top'))
              .attr('src', this.EXPORT_ICON)
            .end()
            .start('img')
              .addClass('icon').addClass('hover')
              .addClass(this.myClass('align-top'))
              .attr('src', this.EXPORT_ICON_HOVER)
              .on('click', () => this.exportAsPDF())
            .end()
          .end()
        .end()
      .end();
    },

    function formatStreetAddress(address) {
      var formattedAddress = '';
      if ( ! address ) return '';
      if ( address.structured ) {
        if ( address.streetNumber ) formattedAddress += address.streetNumber;
        if ( address.streetName ) formattedAddress += ' ' + address.streetName;
        if ( address.suite ) formattedAddress += ' #' + address.suite;
      } else {
        if ( address.address1 ) formattedAddress += address.address1;
        if ( address.address2 ) formattedAddress += ' #' + address.address2;
      }
      return formattedAddress;
    },

    function formatRegionAddress(address) {
      var formattedAddress = '';
      if ( ! address ) return '';
      if ( address.city ) formattedAddress += address.city;
      if ( address.regionId ) {
        formattedAddress ? formattedAddress += ', ' + address.regionId
            : formattedAddress += address.regionId;
      }
      if ( address.countryId ) {
        formattedAddress ? formattedAddress += ', ' + address.countryId
            : formattedAddress += address.countryId;
      }
      return formattedAddress;
    }
  ],

  listeners: [
    function exportAsPDF() {
      try {
        var className = '.full-invoice';
        var downloadContent = ctrl.document.querySelector(className);
        var doc = new jsPDF('l', 'mm', ['350', '700']);
        downloadContent.style.backgroundColor = '#fff';
        downloadContent.style.padding = '20px';
        doc.addHTML(downloadContent, () => {
          doc.save(`invoice-${this.invoice.referenceId}.pdf`);
        });
        downloadContent.style.backgroundColor = '#f9fbff';
        downloadContent.style.padding = '0px';
      } catch (e) {
        this.notify(this.SAVE_AS_PDF_FAIL, 'error');
        throw e;
      }
    }
  ]
});
