foam.CLASS({
  package: 'net.nanopay.contacts.ui.modal',
  name: 'ContactInformation',
  extends: 'net.nanopay.ui.wizardModal.WizardModalSubView',

  requires: [
    'foam.nanos.auth.Address',
    'foam.u2.dialog.NotificationMessage',
    'net.nanopay.bank.BankAccountStatus',
    'net.nanopay.bank.CABankAccount',
    'net.nanopay.bank.USBankAccount',
    'net.nanopay.contacts.Contact',
    'net.nanopay.ui.LoadingSpinner'
  ],

  exports: [
    'as information'
  ],

  imports: [
    'addBusiness',
    'accountDAO as bankAccountDAO',
    'user',
    'validateAddress',
    'validateCity',
    'validatePostalCode',
    'validateStreetNumber',
  ],

  css: `
    ^ {
      max-height: 80vh;
      overflow-y: scroll;
    }
    ^title {
      padding: 25px;
    }
    ^title p {
      font-size: 24px;
      font-weight: 900;
      color: #2b2b2b;
      margin: 0;
    }
    ^disclaimer {
      width: 100%;
      height: 56px;

      box-sizing: border-box;
      padding: 18px;
      padding-left: 56px;

      background-color: #ffe2b3;
      border: 1px solid #e49921;
      border-radius: 3px;

      background-repeat: no-repeat;
      background-position-x: 18px;
      background-position-y: 18px;
      background-image: url(images/ic-disclaimer.svg);
    }
    ^disclaimer p {
      margin: 0;
    }
    ^content {
      padding: 0 25px;
      padding-bottom: 25px;
    }
    ^half-field-container {
      width: 220px;
      margin-left: 16px;
      display: inline-block;
    }
    ^field-margin {
      margin-top: 16px;
    }
    ^check-margin {
      margin-top: 4px;
    }
    ^half-field-container:first-child {
      margin-left: 0;
    }
    ^field-label {
      font-size: 12px;
      font-weight: 600;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    ^field-label:first-child {
      margin-top: 0;
    }
    ^ .foam-u2-tag-Input {
      width: 100%;

      -webkit-transition: all .15s ease-in-out;
      -moz-transition: all .15s ease-in-out;
      -ms-transition: all .15s ease-in-out;
      -o-transition: all .15s ease-in-out;
      transition: all .15s ease-in-out;
    }
    ^check-box-container {
      margin-top: 16px;
    }
    ^divider {
      width: 100%;
      height: 1px;

      margin: 24px 0;
      background-color: #e2e2e3;
    }
    ^header {
      margin: 0;

      font-size: 16px;
      font-weight: 900;
    }
    ^instructions {
      margin: 0;
      margin-top: 8px;
      line-height: 1.5;
      font-size: 16px;
      color: #8e9090;
    }
    ^bank-option-container {
      margin-top: 24px;
    }
    ^bankAction {
      height: 44px;
      box-sizing: border-box;

      background-color: white;
      color: #2b2b2b;

      padding: 10px;
      padding-left: 42px;

      text-align: left;

      cursor: pointer;

      border-radius: 4px;
      border: 1px solid #8e9090;
      box-shadow: none;

      background-repeat: no-repeat;
      background-position-x: 18px;
      background-position-y: 13px;

      background-image: url(images/ablii/radio-resting.svg);

      -webkit-transition: all .15s ease-in-out;
      -moz-transition: all .15s ease-in-out;
      -ms-transition: all .15s ease-in-out;
      -o-transition: all .15s ease-in-out;
      transition: all .15s ease-in-out;
    }
    ^bankAction.selected {
      background-image: url(images/ablii/radio-active.svg);
      border: 1px solid %SECONDARYCOLOR%;
    }
    ^bankAction:first-child {
      margin-left: 0;
    }
    ^bankAction p {
      margin: 0;
      height: 24px;
      line-height: 1.5;
      font-size: 14px;
      color: #2b2b2b;
    }
    ^check-image {
      width: 100%;
      height: auto;
      margin-top: 24px;
    }
    ^field-container {
      display: inline-block;
      vertical-align: top;
    }
    ^transit-container {
      width: 133px;
      margin-right: 16px;
    }
    ^institution-container {
      width: 71px;
      margin-right: 16px;
    }
    ^account-container {
      width: 220px;
    }
    ^spinner-container {
      background-color: #ffffff;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
    ^spinner-container-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 100%;
    }
    ^spinner-container .net-nanopay-ui-LoadingSpinner img {
      width: 50px;
      height: 50px;
    }
    ^spinner-text {
      font-weight: normal;
      font-size: 12px;
      color: rgba(9, 54, 73, 0.7);
    }

    /*Address View overrides*/
    ^ .label {
      font-size: 12px !important;
      font-weight: 600 !important;
      margin-top: 16px !important;
      margin-bottom: 8px !important;
      line-height: 1.5 !important;
      padding-bottom: 0 !important;
      font-family: 'Lato';
    }
    ^ .left-of-container {
      margin-right: 16px;
    }
    ^ .half-container {
      width: 220px;
    }
    ^ .foam-u2-tag-Select,
    ^ .foam-u2-TextField {
      margin-bottom: 0 !important;
      border: solid 1px #8e9090 !important;
      -webkit-transition: all .15s ease-in-out;
      -moz-transition: all .15s ease-in-out;
      -ms-transition: all .15s ease-in-out;
      -o-transition: all .15s ease-in-out;
      transition: all .15s ease-in-out;
    }

    ^ .foam-u2-tag-Select:focus,
    ^ .foam-u2-TextField:focus {
      border: solid 1px %SECONDARYCOLOR% !important;
    }
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'isEdit',
      factory: function() {
        return this.wizard.data;
      }
    },
    {
      class: 'Boolean',
      name: 'isEditBank',
      documentation: `When Contact has a bankAccount that can not be changed.
      Has an invoice associated with this Account`,
      factory: function() {
        return ! (this.wizard.data && this.viewData.contactAccount);
      }
    },
    {
      name: 'loadingSpinner',
      factory: function() {
        var spinner = this.LoadingSpinner.create();
        return spinner;
      }
    },
    {
      class: 'Boolean',
      name: 'isConnecting',
      value: false
    },
    {
      class: 'String',
      name: 'companyName',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: 'Enter company name',
        onKey: true
      },
      factory: function() {
        return this.isEdit ? this.wizard.data.organization : '';
      }
    },
    {
      class: 'String',
      name: 'firstName',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: 'Jane',
        onKey: true
      },
      factory: function() {
        return this.isEdit ? this.wizard.data.firstName : '';
      }
    },
    {
      class: 'String',
      name: 'lastName',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: 'Doe',
        onKey: true
      },
      factory: function() {
        return this.isEdit ? this.wizard.data.lastName : '';
      }
    },
    {
      class: 'String',
      name: 'email',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: 'example@email.com',
        onKey: true
      },
      factory: function() {
        return this.isEdit ? this.wizard.data.email : '';
      }
    },
    {
      class: 'Boolean',
      name: 'invite',
      value: false,
      view: {
        class: 'foam.u2.CheckBox',
        label: 'Send an email invitation to this client'
      }
    },
    {
      class: 'String',
      name: 'transitNumber',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: '12345',
        maxLength: 5,
        onKey: true
      },
      preSet: function(o, n) {
        if ( n === '' ) return n;
        var reg = /^\d+$/;
        return reg.test(n) ? n : o;
      },
      factory: function() {
        return this.isEdit && foam.util.equals(this.viewData.accountType, 'CAD') ? this.viewData.contactAccount.transitNumber : '';
      }
    },
    {
      class: 'String',
      name: 'routingNumber',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: '123456789',
        maxLength: 9,
        onKey: true
      },
      preSet: function(o, n) {
        if ( n === '' ) return n;
        var reg = /^\d+$/;
        return reg.test(n) ? n : o;
      },
      factory: function() {
        return this.isEdit && foam.util.equals(this.viewData.accountType, 'USD') ? this.viewData.contactAccount.branchId : '';
      }
    },
    {
      class: 'String',
      name: 'institutionNumber',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: '123',
        maxLength: 3,
        onKey: true
      },
      preSet: function(o, n) {
        if ( n === '' ) return n;
        var reg = /^\d+$/;
        return reg.test(n) ? n : o;
      },
      factory: function() {
        return this.isEdit && foam.util.equals(this.viewData.accountType, 'CAD') ? this.viewData.contactAccount.institutionNumber: '';
      }
    },
    {
      class: 'String',
      name: 'accountNumber',
      view: {
        class: 'foam.u2.tag.Input',
        placeholder: '1234567',
        onKey: true
      },
      preSet: function(o, n) {
        if ( n === '' ) return n;
        var reg = /^\d+$/;
        return reg.test(n) ? n : o;
      },
      factory: function() {
        return this.isEdit && this.viewData.accountType && ! foam.util.equals(this.viewData.accountType, '') ? this.viewData.contactAccount.accountNumber : '';
      }
    },
    {
      class: 'Boolean',
      name: 'isCADBank',
      factory: function() {
        return this.isEdit && foam.util.equals(this.viewData.accountType, 'USD') ? false : true;
      }
    },
    {
      class: 'String',
      name: 'voidCheckPath',
      expression: function(isCADBank) {
        return isCADBank ? 'images/Canada-Check@2x.png' : 'images/USA-Check@2x.png';
      }
    },
    {
      class: 'Boolean',
      name: 'notNewContact',
      factory: function() {
        return ! this.viewData.selectedContact;
      }
    },
    {
      class: 'FObjectProperty',
      of: 'foam.nanos.auth.Address',
      name: 'address',
      documentation: `Business account address.`,
      factory: function() {
        return this.isEdit ? this.wizard.data.businessAddress : this.Address.create();
      },
      view: { class: 'net.nanopay.sme.ui.AddressView' }
    },
  ],

  messages: [
    { name: 'TITLE', message: 'Add a Contact' },
    { name: 'TITLE_2', message: 'Edit Contact' },
    { name: 'CONNECTING', message: 'Connecting... This may take a few minutes.' },
    { name: 'DISCLAIMER', message: 'Added contacts must be businesses, not personal accounts.' },
    { name: 'PLACE_COMPANY', message: 'Enter company name' },
    { name: 'FIELD_COMPANY', message: 'Company name' },
    { name: 'FIELD_FIRST_NAME', message: 'First name' },
    { name: 'FIELD_LAST_NAME', message: 'Last name' },
    { name: 'FIELD_EMAIL', message: 'Email' },
    { name: 'HEADER_BANKING', message: 'Banking information' },
    { name: 'INSTRUCTIONS_BANKING', message: 'When adding banking information for a contact, please be sure to double check it, as all future payments will be sent directly to this account.' },
    { name: 'LABEL_CA', message: 'Canada' },
    { name: 'LABEL_US', message: 'US' },
    { name: 'TRANSIT', message: 'Transit #' },
    { name: 'ROUTING', message: 'Routing #' },
    { name: 'INSTITUTION', message: 'Institution #' },
    { name: 'ACCOUNT', message: 'Account #' },
    { name: 'BANK_ADDRESS_TITLE', message: 'Contact Business address' }
  ],

  methods: [
    function initE() {
      var self = this;
      this.addClass(this.myClass())
        .start().addClass(this.myClass('title'))
          .callIf(this.notNewContact, function() {
            this.start('p').add(self.TITLE).end()
          })
          .callIf(!this.notNewContact, function() {
            this.start('p').add(self.TITLE_2).end()
          })
        .end()
        .start().addClass(this.myClass('content'))
          .start().addClass(this.myClass('spinner-container')).show(this.isConnecting$)
            .start().addClass(this.myClass('spinner-container-center'))
              .add(this.loadingSpinner)
              .start('p').add(this.CONNECTING).addClass(this.myClass('spinner-text')).end()
            .end()
          .end()
          .start().addClass(this.myClass('disclaimer'))
            .start('p').add(this.DISCLAIMER).end()
          .end()
          .start('p').addClass(this.myClass('field-label')).add(this.FIELD_COMPANY).end()
          .add(this.COMPANY_NAME)
          .start().addClass(this.myClass('field-margin'))
            .start().addClass(this.myClass('half-field-container'))
              .start('p').addClass(this.myClass('field-label')).add(this.FIELD_FIRST_NAME).end()
              .add(this.FIRST_NAME)
            .end()
            .start().addClass(this.myClass('half-field-container'))
              .start('p').addClass(this.myClass('field-label')).add(this.FIELD_LAST_NAME).end()
              .add(this.LAST_NAME)
            .end()
          .end()
          .start('p').addClass(this.myClass('field-label')).add(this.FIELD_EMAIL).end()
          .add(this.EMAIL)
          .start().addClass(this.myClass('check-box-container'))
            .add(this.INVITE)
          .end()
          .callIf(this.notNewContact, function() {
            this.start().addClass(self.myClass('divider')).end()
              .start('p').addClass(self.myClass('header')).add(self.BANK_ADDRESS_TITLE).end()
              .start(self.ADDRESS).end()
            .end()
          })
          .callIf(this.viewData.isBankingProvided, function() {
            this.start().addClass(self.myClass('divider')).end()
              .start('p').addClass(self.myClass('header')).add(self.HEADER_BANKING).end()
              .start('p').addClass(self.myClass('instructions')).add(self.INSTRUCTIONS_BANKING).end()
              .start().addClass(self.myClass('bank-option-container'))
                .start()
                  .addClass(self.myClass('half-field-container'))
                  .addClass(self.myClass('bankAction'))
                  .enableClass('selected', self.isCADBank$)
                  .start('p').add(self.LABEL_CA).end()
                  .on('click', function() {
                    self.selectBank('CA');
                  })
                .end()
                .start()
                  .addClass(self.myClass('half-field-container'))
                  .addClass(self.myClass('bankAction'))
                  .enableClass('selected', self.isCADBank$, true)
                  .start('p').add(self.LABEL_US).end()
                  .on('click', function() {
                    self.selectBank('US');
                  })
                .end()
              .end()
              .add(self.slot(function(isCADBank) {
                if ( isCADBank ) {
                  return this.E()
                  .start({ class: 'foam.u2.tag.Image', data: self.voidCheckPath }).addClass(self.myClass('check-image')).end()
                  .start().addClass(self.myClass('check-margin'))
                    .start().addClass(self.myClass('field-container')).addClass(self.myClass('transit-container'))
                      .start('p').addClass(self.myClass('field-label')).add(self.TRANSIT).end()
                      .tag(self.TRANSIT_NUMBER)
                    .end()
                    .start().addClass(self.myClass('field-container')).addClass(self.myClass('institution-container'))
                      .start('p').addClass(self.myClass('field-label')).add(self.INSTITUTION).end()
                      .tag(self.INSTITUTION_NUMBER)
                    .end()
                    .start().addClass(self.myClass('field-container')).addClass(self.myClass('account-container')).show(self.isEditBank)
                      .start('p').addClass(self.myClass('field-label')).add(self.ACCOUNT).end()
                      .tag(self.ACCOUNT_NUMBER)
                    .end()
                    .start().addClass(self.myClass('field-container')).addClass(self.myClass('account-container')).show(! self.isEditBank)
                      .start('p').addClass(self.myClass('field-label')).add(self.ACCOUNT).end()
                      .start(self.ACCOUNT_NUMBER, {
                        mode: foam.u2.DisplayMode.DISABLED
                      })
                      .end()
                    .end()
                  .end();
                } else {
                  return this.E().start({ class: 'foam.u2.tag.Image', data: self.voidCheckPath }).addClass(self.myClass('check-image')).end()
                  .start().addClass(self.myClass('check-margin'))
                    .start().addClass(self.myClass('half-field-container'))
                      .start('p').addClass(self.myClass('field-label')).add(self.ROUTING).end()
                      .tag(self.ROUTING_NUMBER)
                    .end()
                    .start().addClass(self.myClass('half-field-container'))
                      .start('p').addClass(self.myClass('field-label')).add(self.ACCOUNT).end()
                      .tag(self.ACCOUNT_NUMBER)
                    .end()
                  .end();
                }
              }));
          })
        .end()
        .start({ class: 'net.nanopay.sme.ui.wizardModal.WizardModalNavigationBar', back: this.BACK, next: this.NEXT }).end();
    },

    function validateInputs() {
      var address = this.address;

      if ( ! this.validateStreetNumber(address.streetNumber) ) {
        this.notify('Invalid street number.', 'error');
        return false;
      }
      if ( ! this.validateAddress(address.streetName) ) {
        this.notify('Invalid street number.', 'error');
        return false;
      }
      if ( ! this.validateCity(address.city) ) {
        this.notify('Invalid city name.', 'error');
        return false;
      }
      if ( ! this.validatePostalCode(address.postalCode) ) {
        this.notify('Invalid postal code.', 'error');
        return false;
      }
      return true;
    },

    function notify(message, type) {
      this.add(this.NotificationMessage.create({
        message,
        type
      }));
    },

    function selectBank(bank) {
      if ( bank === 'CA' ) {
        this.isCADBank = true;
      } else if ( bank === 'US' ) {
        this.isCADBank = false;
      }
    },

    async function createContact() {
      this.isConnecting = true;
      if ( this.viewData.selectedContact ) {
        // Add Bank to newContact
        this.createBankAccount(this.viewData.selectedContact);
      } else {
        if ( ! this.validateInputs() ) return;
        // Create Contact
        newContact = this.Contact.create({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          emailVerified: true,
          businessName: this.companyName,
          organization: this.companyName,
          businessAddress: this.address,
          type: 'Contact',
          group: 'sme'
        });
        if ( this.isEdit ) newContact.id = this.wizard.data.id;
        // Note: this.viewData.selectedContact property will be reused
          // without any overlapping logic. Since check on whether this
          // property is set is done prior to this codes execution.
        await this.addBusiness(newContact);
        // Contact was saved previously, add bank if necessary
        if ( this.viewData.isBankingProvided ) {
          this.createBankAccount(this.viewData.selectedContact);
        }
      }
      this.isConnecting = false;
    },

    async function createBankAccount(createdContact) {
      if ( this.isCADBank ) {
        // create canadaBankAccount
        var bankAccount = this.CABankAccount.create({
          institutionNumber: this.institutionNumber,
          branchId: this.transitNumber,
          accountNumber: this.accountNumber,
          name: createdContact.firstName + '_ContactCABankAccount',
          status: this.BankAccountStatus.VERIFIED
        });
      } else {
        // create usBankAccount
        var bankAccount = this.USBankAccount.create({
          branchId: this.routingNumber,
          accountNumber: this.accountNumber,
          name: createdContact.firstName + '_ContactUSBankAccount',
          status: this.BankAccountStatus.VERIFIED,
          denomination: 'USD'
        });
      }
      try {
        result = await this.user.accounts.put(bankAccount);
        this.updateContactBankInfo(createdContact.id, result);
      } catch (error) {
        this.notify(error.message || this.ACCOUNT_CREATION_ERROR, 'error');
      }
      return;
    },

    async function updateContactBankInfo(contactId, bankAccount) {
      // adds a bankAccountId to the bankAccount property of a contact
      try {
        var contactObject = await this.user.contacts.find(contactId);
        contactObject.bankAccount = bankAccount;
        await this.user.contacts.put(contactObject);
      } catch (error) {
        this.notify( error.message, 'error');
      }
    },
  ],

  actions: [
    {
      name: 'back',
      label: 'Back',
      code: function(X) {
        X.subStack.back();
      }
    },
    {
      name: 'next',
      label: 'Connect',
      code: function(X) {
        var model = X.information;
        if ( model.isConnecting ) return;
        model.createContact();
        X.closeDialog();
      }
    }
  ]
});
