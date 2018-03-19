foam.CLASS({
  package: 'net.nanopay.admin.ui',
  name: 'AddBusinessView',
  extends: 'foam.u2.Controller',

  documentation: 'View for adding a business',

  requires: [
    'foam.nanos.auth.Phone',
    'foam.nanos.auth.User',
    'foam.u2.dialog.NotificationMessage',
  ],

  imports: [
    'showNotification',
    'stack',
    'userDAO',
    'validateEmail',
    'validatePhone',
    'validateTitleNumOrAuth'
  ],

  css: `
    ^ .container {
      width: 540px;
      margin: 0 auto;
    }
    ^ .nameContainer {
      position: relative;
      width: 540px;
      height: 64px;
      overflow: hidden;
      box-sizing: border-box;
    }
    ^ .header {
      font-size: 30px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0.5px;
      text-align: left;
      color: #093649;
    }
    ^ .description {
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: 0.2px;
      text-align: left;
      color: #093649;
    }
    ^ .label {
      font-size: 14px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      text-align: left;
      color: #093649;
      margin-left: 0;
    }
    ^ .nameDisplayContainer {
      position: absolute;
      top: 0;
      left: 0;
      width: 540px;
      height: 64px;
      opacity: 1;
      box-sizing: border-box;
      transition: all 0.15s linear;
      z-index: 10;
    }
    ^ .nameDisplayContainer.hidden {
      left: 540px;
      opacity: 0;
    }
    ^ .nameDisplayContainer p {
      margin: 0;
      margin-bottom: 8px;
    }
    ^ .legalNameDisplayField {
      width: 100%;
      height: 40px;
      background-color: #ffffff;
      border: solid 1px rgba(164, 179, 184, 0.5) !important;
      padding: 12px 13px;
      box-sizing: border-box;
    }
    ^ .nameInputContainer {
      position: absolute;
      top: 0;
      left: 0;
      width: 540px;
      height: 64px;
      opacity: 1;
      box-sizing: border-box;
      z-index: 9;
    }
    ^ .nameInputContainer.hidden {
      pointer-events: none;
      opacity: 0;
    }
    ^ .phoneFieldsCol {
      display: inline-block;
      vertical-align: middle;
      height: 64px;
      opacity: 1;
      box-sizing: border-box;
      margin-right: 20px;
      transition: all 0.15s linear;
    }
    ^ .nameFieldsCol {
      display: inline-block;
      vertical-align: middle;
      /* 100% minus 2x 20px padding equally divided by 3 fields */
      width: calc((100% - 40px) / 3);
      height: 64px;
      opacity: 1;
      box-sizing: border-box;
      margin-right: 20px;
      transition: all 0.15s linear;
    }
    ^ .nameFieldsCol:last-child {
      margin-right: 0;
    }
    ^ .nameFieldsCol p {
      margin: 0;
      margin-bottom: 8px;
    }
    ^ .nameFieldsCol.firstName {
      opacity: 0;
      // transform: translateX(64px);//translateX(-166.66px);
    }
    ^ .nameFieldsCol.middleName {
      opacity: 0;
      transform: translateX(-166.66px);//translateX(64px);
    }
    ^ .nameFieldsCol.lastName {
      opacity: 0;
      transform: translateX(-166.66px);//translateY(64px);//translateX(166.66px);
    }
    ^ .nameFields {
      background-color: #ffffff;
      border: solid 1px rgba(164, 179, 184, 0.5);
      padding: 12px 13px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      outline: none;
    }
    ^ .largeInput {
      width: 540px;
      height: 40px;
      background-color: #ffffff;
      border: solid 1px rgba(164, 179, 184, 0.5);
      padding: 12px;
      font-size: 12px;
      color: #093649;
      outline: none;
    }
    ^ .marginLeft {
      margin-left: 20px;
    }
    ^ .countryCodeInput {
      width: 105px;
      height: 40px;
      border: solid 1px rgba(164, 179, 184, 0.5);
      padding: 12px;
      font-size: 12px;
      color: #093649;
      outline: none;
    }
    ^ .phoneNumberInput {
      width: 415px;
      height: 40px;
      border: solid 1px rgba(164, 179, 184, 0.5);
      padding: 12px;
      font-size: 12px;
      color: #093649;
      outline: none;
    }
    ^ .buttonDiv {
      width: 100%;
      height: 60px;
      background-color: #edf0f5;
      position: relative;
      bottom: 0;
      z-index: 200;
    }
    ^ .net-nanopay-ui-ActionView-closeButton {
      border-radius: 2px;
      background-color: rgba(164, 179, 184, 0.1);
      box-shadow: 0 0 1px 0 rgba(9, 54, 73, 0.8);
      margin-top: 30px;
    }
    ^ .net-nanopay-ui-ActionView-closeButton:hover {
      background: lightgray;
    }
    ^ .net-nanopay-ui-ActionView-addButton {
      float: right;
      border-radius: 2px;
      background-color: %SECONDARYCOLOR%;
      color: white;
      margin-top: 30px;
    }
    ^ .net-nanopay-ui-ActionView-addButton:hover {
      background: %SECONDARYCOLOR%;
      opacity: 0.9;
    }
    ^ .property-confirmEmailAddress {
      margin-bottom: 10px;
    }
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'isEditingName',
      value: false,
      postSet: function (oldValue, newValue) {
        this.displayedLegalName = '';
        if ( this.firstNameField ) this.displayedLegalName += this.firstNameField;
        if ( this.middleNameField ) this.displayedLegalName += ' ' + this.middleNameField;
        if ( this.lastNameField ) this.displayedLegalName += ' ' + this.lastNameField;
      }
    },
    {
      class: 'Boolean',
      name: 'isEditingPhone',
      value: false,
      postSet: function (oldValue, newValue) {
        this.displayedPhoneNumber = '';
        if ( this.countryCode ) this.displayedPhoneNumber += this.countryCode;
        if ( this.phoneNumber ) this.displayedPhoneNumber += ' ' + this.phoneNumber;
      }
    },
    {
      class: 'String',
      name: 'displayedLegalName',
      value: ''
    },
    {
      class: 'String',
      name: 'firstNameField',
      value: ''
    },
    {
      class: 'String',
      name: 'middleNameField',
      value: ''
    },
    {
      class: 'String',
      name: 'lastNameField',
      value: ''
    },
    {
      name: 'jobTitle',
      class: 'String'
    },
    {
      name: 'emailAddress',
      class: 'String'
    },
    {
      name: 'confirmEmailAddress',
      class: 'String'
    },
    {
      name: 'displayedPhoneNumber',
      class: 'String',
      value: '+1'
    },
    {
      name: 'countryCode',
      class: 'String',
      value: '+1'
    },
    {
      name: 'phoneNumber',
      class: 'String'
    }
  ],

  messages: [
    { name: 'Title', message: 'Add Business' },
    { name: 'Description', message: 'Fill in the details for the admin user of this business, the user will receive an email with login credentials after.' },
    { name: 'LegalNameLabel', message: 'Legal Name' },
    { name: 'FirstNameLabel', message: 'First Name' },
    { name: 'MiddleNameLabel', message: 'Middle Initials(optional)' },
    { name: 'LastNameLabel', message: 'Last Name' },
    { name: 'JobTitleLabel', message: 'Job Title' },
    { name: 'EmailLabel', message: 'Email Address' },
    { name: 'ConfirmEmailLabel', message: 'Confirm Email Address' },
    { name: 'CountryCodeLabel', message: 'Country Code' },
    { name: 'PhoneNumberLabel', message: 'Phone Number' }
  ],

  methods: [
    function initE() {
      this.SUPER();
      var self = this;
      this
        .addClass(this.myClass())
        .start()
          .start().addClass('container')
            .start('p').add(this.Title).addClass('header').end()
            .start('p').add(this.Description).addClass('description').end()
            .start('div').addClass('nameContainer')
            .start('div')
              .addClass('nameDisplayContainer')
              .enableClass('hidden', this.isEditingName$)
                .start('p').add(this.LegalNameLabel).addClass('infoLabel').end()
                .start(this.DISPLAYED_LEGAL_NAME, { tabIndex: 1 })
                  .addClass('legalNameDisplayField')
                  .on('focus', function() {
                    this.blur();
                    self.isEditingName = true;
                    self.isEditingPhone = false;
                  })
                .end()
            .end()
            .start('div')
              .addClass('nameInputContainer')
              .enableClass('hidden', this.isEditingName$, true)
                .start('div')
                  .addClass('nameFieldsCol')
                  .enableClass('firstName', this.isEditingName$, true)
                    .start('p').add(this.FirstNameLabel).addClass('infoLabel').end()
                    .start(this.FIRST_NAME_FIELD, { tabIndex: 2 })
                      .addClass('nameFields')
                      .on('click', function() { 
                        self.isEditingName = true;
                      })
                    .end()
                .end()
                .start('div')
                  .addClass('nameFieldsCol')
                  .enableClass('middleName', this.isEditingName$, true)
                    .start('p').add(this.MiddleNameLabel).addClass('infoLabel').end()
                    .start(this.MIDDLE_NAME_FIELD, { tabIndex: 3 })
                      .addClass('nameFields')
                      .on('click', function() {
                        self.isEditingName = true;
                      })
                    .end()
                .end()
                .start('div')
                  .addClass('nameFieldsCol')
                  .enableClass('lastName', this.isEditingName$, true)
                    .start('p').add(this.LastNameLabel).addClass('infoLabel').end()
                    .start(this.LAST_NAME_FIELD, { tabIndex: 4 })
                      .addClass('nameFields')
                      .on('click', function() {
                        self.isEditingName = true;
                      })
                    .end()
                .end()
            .end()
          .end()
          .start('div')
            .on('click', function() {
              self.notEditingName();
              self.notEditingPhone();
            })
            .start()
              .start('p').add(this.JobTitleLabel).addClass('label').end()
              .start(this.JOB_TITLE).addClass('largeInput')
                .on('focus', function() {
                  self.isEditingPhone = false;
                  self.isEditingName = false;
                })
              .end()
            .end()
            .start()
              .start('p').add(this.EmailLabel).addClass('label').end()
              .start(this.EMAIL_ADDRESS).addClass('largeInput')
                .on('focus', function() {
                  self.isEditingPhone = false;
                  self.isEditingName = false;
                })
              .end()
            .end()
            .start()
              .start('p').add(this.ConfirmEmailLabel).addClass('label').end()
              .start(this.CONFIRM_EMAIL_ADDRESS).addClass('largeInput')
                .on('focus', function() {
                  self.isEditingPhone = false;
                  self.isEditingName = false;
                })
              .end()
            .end()
          .end()
          .start()
            .addClass('nameContainer')
            .start()
              .addClass('nameDisplayContainer')
              .enableClass('hidden', this.isEditingPhone$)
              .start('p').add(this.PhoneNumberLabel).addClass('label').end()
              .start(this.DISPLAYED_PHONE_NUMBER)
                .addClass('legalNameDisplayField')
                .on('focus', function() {
                  this.blur();
                  self.isEditingPhone = true;
                  self.isEditingName = false;
                })
              .end()
            .end()
            .start('div')
              .addClass('nameInputContainer')
              .enableClass('hidden', this.isEditingPhone$, true)
              .start('div')
                .addClass('phoneFieldsCol')
                .enableClass('firstName', this.isEditingPhone$, true)
                .start().add(this.CountryCodeLabel).addClass('label').style({ 'margin-bottom': '8px' }).end()
                .start(this.COUNTRY_CODE)
                  .addClass('countryCodeInput')
                  .on('click', function() {
                    self.isEditingPhone = true;
                  })
                .end()
              .end()
              .start('div')
                .addClass('nameFieldsCol')
                .enableClass('middleName', this.isEditingPhone$, true)
                .start('p').add(this.PhoneNumberLabel).addClass('label').end()
                .start(this.PHONE_NUMBER)
                  .addClass('phoneNumberInput')
                  .on('click', function() {
                    self.isEditingPhone = true;
                  })
                .end()
              .end()
            .end()
          .end()
          .start().addClass('buttonDiv')
            .start(this.CLOSE_BUTTON).end()
            .start(this.ADD_BUTTON).end()
          .end()
        .end();
    },

    function validations() {
      if ( this.firstNameField.length > 70 ) {
        this.add(this.NotificationMessage.create({ message: 'First name cannot exceed 70 characters.', type: 'error' }));
        return false;
      }
      if ( this.middleNameField.length > 70 ) {
        this.add(this.NotificationMessage.create({ message: 'Middle initials cannot exceed 70 characters.', type: 'error' }));
        return false;
      }
      if ( this.lastNameField.length > 70 ) {
        this.add(this.NotificationMessage.create({ message: 'Last name cannot exceed 70 characters.', type: 'error' }));
        return false;
      }
      if ( ! this.validateTitleNumOrAuth(this.jobTitle) ) {
        this.add(this.NotificationMessage.create({ message: 'Invalid job title.', type: 'error' }));
        return false;
      }
      if ( ! this.validateEmail(this.emailAddress) ) {
        this.add(this.NotificationMessage.create({ message: 'Invalid email address.', type: 'error' }));
        return false;
      }
      if ( this.emailAddress != this.confirmEmailAddress ) {
        this.add(this.NotificationMessage.create({ message: 'Confirmation email does not match.', type: 'error' }));
        return false;
      }
      if ( ! this.validatePhone(this.countryCode + ' ' + this.phoneNumber) ) {
        this.add(this.NotificationMessage.create({ message: 'Invalid phone number.', type: 'error' }));
        return false;
      }

      return true;
    },

    function addBusiness() {
      var self = this;

      if ( ( this.firstNameField == null || this.firstNameField.trim() == '' ) ||
      ( this.lastNameField == null || this.lastNameField.trim() == '' ) || 
      ( this.jobTitle == null || this.jobTitle.trim() == '' ) ||
      ( this.emailAddress == null || this.emailAddress.trim() == '' ) ||
      ( this.confirmEmailAddress == null || this.confirmEmailAddress.trim() == '' ) ||
      ( this.countryCode == null || this.countryCode.trim() == '' ) ||
      ( this.phoneNumber == null || this.phoneNumber.trim() == '' ) ) {
        this.add(this.NotificationMessage.create({ message: 'Please fill out all fields before proceeding.', type: 'error' }));
        return;
      }

      if ( ! this.validations() ) {
        return;
      }

      var businessPhone = this.Phone.create({
        number: this.countryCode + this.phoneNumber
      });

      var newBusiness = this.User.create({
        firstName: this.firstNameField,
        middleName: this.middleNameField,
        lastName: this.lastNameField,
        businessName: '-',
        jobTitle: this.jobTitle,
        email: this.emailAddress,
        type: 'Business',
        status: 'Pending',
        phone: businessPhone,
        invited: true,
        invitedBy: this.user.id
      });

      if ( newBusiness.errors_ ) {
        this.add(this.NotificationMessage.create({ message: newBusiness.errors_[0][1], type: 'error' }));
        return;
      }
      if ( businessPhone.errors_ ) {
        this.add(this.NotificationMessage.create({ message: businessPhone.errors_[0][1], type: 'error' }));
        return;
      }

      this.userDAO.put(newBusiness).then(function(response) {
        self.stack.back();
      }).catch(function (error) {
        self.add(self.NotificationMessage.create({ message: error.message, type: 'error' }));
      });
    },
    function notEditingName() {
      this.isEditingName = false;
    },
    function notEditingPhone() {
      this.isEditingPhone = false;
    }
  ],

  actions: [
    {
      name: 'closeButton',
      label: 'Close',
      code: function (X) {
        this.stack.back();
      }
    },
    {
      name: 'addButton',
      label: 'Add',
      code: function (X) {
        this.addBusiness();
      }
    }
  ]
});