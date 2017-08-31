
foam.CLASS({
  package: 'net.nanopay.interac.ui.etransfer',
  name: 'TransferWizard',
  extends: 'net.nanopay.interac.ui.shared.wizardView.WizardView',

  documentation: 'Pop up that extends WizardView for e-transfer',

  axioms: [
    foam.u2.CSS.create({code: net.nanopay.interac.ui.shared.wizardView.WizardView.getAxiomsByClass(foam.u2.CSS)[0].code}),
    foam.u2.CSS.create({
      code: function CSS() {/*
      ^ .topRow {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin-bottom: 20px;
      }

      ^ .timer {
        display: inline-block;
        margin-top: 3px;
      }

      ^ .timerText {
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        margin-top: 6px;
        opacity: 1 !important;
      }

      ^ .interacImage {
        width: 90px;
        height: 40px;
        object-fit: contain;
        float: right;
      }

      ^ p {
        margin: 0;
        color: #093649;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0.2px;
        margin-bottom: 8;
      }

      ^ .pDetails {
        opacity: 0.7;
        font-size: 12px;
        line-height: 1.17;
        letter-spacing: 0.2px;
        color: #093649;
      }

      ^ .bold {
        font-weight: bold;
        margin-bottom: 20px;
        letter-spacing: 0.4px;
      }

      ^ .detailsCol {
        display: inline-block;
        vertical-align: top;
        width: 320px;
      }

      ^ .divider {
        display: inline-block;
        vertical-align: top;
        width: 2px;
        height: 520;
        box-sizing: border-box;
        background-color: #a4b3b8;
        opacity: 0.3;
        margin: auto 51px;
      }

      ^ .fromToCol {
        display: inline-block;
        vertical-align: top;
        width: 300px;
      }

      ^ .fromToCard {
        box-sizing: border-box;
        padding: 20px;
        width: 300px;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px rgba(164, 179, 184, 0.5);
        margin-bottom: 20px;
      }

      ^ .pricingCol {
        display: inline-block;
        vertical-align: top;
        width: 160px;
        box-sizing: border-box;
      }

      ^ .pPricing {
        font-size: 12px;
        margin-bottom: 10px;
      }

      ^ .invoiceDetailContainer {
        width: 100%;
        margin-bottom: 20px;
      }

      ^ .invoiceLabel {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 100px;
        margin: 0;
        margin-right: 35px;
      }

      ^ .invoiceLabel:first-child {
        margin-bottom: 10px;
      }

      ^ .invoiceDetail {
        display: inline-block;
        vertical-align: top;

        font-size: 12px;
        letter-spacing: 0.2px;
        color: #093649;
        margin: 0;
      }

      ^ .invoiceLink {
        display: block;
        font-size: 12px;
        line-height: 1.33;
        letter-spacing: 0.2px;
        text-align: left;
        color: #59a5d5;
        margin-bottom: 20px;
      }

      ^ .userContainer {
        box-sizing: border-box;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px rgba(164, 179, 184, 0.5);
        margin-bottom: 20px;

        width: 300px;
        padding: 20px;
      }

      ^ .userRow {
        margin-bottom: 20px;
      }

      ^ .userName {
        display: inline-block;
        margin-bottom: 0 !important;
      }
    */}})
  ],

  messages: [
    { name: 'TimerText', message: 'before exchange rate expires.' }
  ],

  methods: [
    function init() {
      this.title = 'Send e-Transfer';
      this.views = [
        { parent: 'etransfer', id: 'etransfer-transfer-details',     label: 'Account & Payee',      view: { class: 'net.nanopay.interac.ui.etransfer.TransferDetails' } },
        { parent: 'etransfer', id: 'etransfer-transfer-amount',      label: 'Amount',               view: { class: 'net.nanopay.interac.ui.etransfer.TransferAmount'  } },
        { parent: 'etransfer', id: 'etransfer-transfer-review',      label: 'Review',               view: { class: 'net.nanopay.interac.ui.etransfer.TransferReview'  } },
        { parent: 'etransfer', id: 'etransfer-transfer-complete',    label: 'Successful',           view: { class: 'net.nanopay.interac.ui.etransfer.TransferComplete'  } }
      ];
      this.SUPER();
    },

    function initE(){
      var self = this;

      this.addClass(this.myClass())
        .start('div').addClass('row')
          .start('div').addClass('positionColumn')
            .start('p').add(this.title || '').addClass('title').end()
            .tag({ class: 'net.nanopay.interac.ui.shared.wizardView.WizardViewOverview', titles: this.viewTitles, position$: this.position$ })
          .end()
          .start('div').addClass('stackColumn')
            .start('div').addClass('topRow')
              // TODO: 30 minute timer
              .start({class: 'net.nanopay.interac.ui.CountdownView'}).addClass('timer').end()
              .start('p').addClass('pDetails').addClass('timerText').add(this.TimerText).end()
              .start({class: 'foam.u2.tag.Image', data: 'images/interac.png'})
                .attrs({srcset: 'images/interac@2x.png 2x, images/interac@3x.png 3x'})
                .addClass('interacImage')
              .end()
            .end()
            .tag({ class: 'foam.u2.stack.StackView', data: this.subStack, showActions: false }).addClass('stackView')
          .end()
        .end()
        .start('div').addClass('row')
          .start('div').addClass('navigationContainer')
            .add(this.GO_BACK)
            .add(this.GO_NEXT)
          .end()
        .end();
    }
  ],

  actions: [
    {
      name: 'goBack',
      label: 'Back',
      isAvailable: function(position) {
        return position == 3 ? false : true;
      },
      code: function(X) {
        if ( this.position == 0 ) {
          X.stack.back();
          return;
        }
        this.subStack.back();
      }
    },
    {
      name: 'goNext',
      label: 'Next',
      isAvailable: function(position, errors) {
        if ( errors ) return false; // Error present
        if ( position < 3 ) return true; // Valid next
        return false; // Not in dialog
      },
      code: function() {
        var self = this;
        if ( this.position == 2 ) { // On Review Transfer page.
          // TODO: Run the transfer
          this.subStack.push(this.views[this.subStack.pos + 1].view);
          return;
        }

        this.subStack.push(this.views[this.subStack.pos + 1].view); // otherwise
      }
    }
  ]
})
