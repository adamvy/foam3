/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.u2.navigation',
  name: 'SignIn',

  documentation: `User Signin model to be used with LoginView.
  `,

  implements: [ 'foam.mlang.Expressions' ],

  imports: [
    'auth',
    'appConfig',
    'ctrl',
    'emailVerificationService',
    'logAnalyticEvent',
    'loginSuccess',
    'loginView?',
    'memento_',
    'menuDAO',
    'routeTo',
    'stack',
    'subject',
    'window',
    'sessionID'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.nanos.auth.DuplicateEmailException',
    'foam.nanos.auth.UnverifiedEmailException',
    'foam.u2.crunch.WizardRunner',
    'foam.u2.dialog.NotificationMessage',
    'foam.u2.stack.StackBlock',
    'foam.u2.wizard.WizardType'
  ],

  messages: [
    { name: 'TITLE',      message: 'Welcome Back' },
    { name: 'FOOTER_TXT', message: 'Not a User Yet?' },
    { name: 'ERROR_MSG',  message: 'There was an issue logging in' },
    { name: 'ERROR_MSG2', message: 'Please enter email or username' },
    { name: 'ERROR_MSG3', message: 'Please enter password' }
  ],

  sections: [
    {
      name: '_defaultSection',
      title: ''
    },
    {
      name: 'footerSection',
      title: '',
      isAvailable: () => false
    }
  ],

  properties: [
    {
      name: 'dao_',
      hidden: true,
      transient: true
    },
    {
      class: 'String',
      name: 'username',
      visibility: function(usernameRequired) {
        return usernameRequired ? foam.u2.DisplayMode.RW : foam.u2.DisplayMode.HIDDEN;
      }
    },
    {
      flags: ['web'],
      name: 'email',
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'usernameRequired',
      hidden: true
    },
    {
      class: 'String',
      name: 'identifier',
      required: true,
      label: 'Email or Username',
      view: {
        class: 'foam.u2.TextField',
        focused: true
      },
      trim: true,
      visibility: function(disableIdentifier_, usernameRequired) {
        return usernameRequired ? foam.u2.DisplayMode.HIDDEN :
          disableIdentifier_ ? foam.u2.DisplayMode.DISABLED : foam.u2.DisplayMode.RW;
      },
      validationTextVisible: false
    },
    {
      class: 'Password',
      name: 'password',
      required: true,
      view: {
        class: 'foam.u2.view.PasswordView',
        passwordIcon: true,
        autocomplete: 'current-password'
      },
      validationTextVisible: false
    },
    {
      class: 'Boolean',
      name: 'disableIdentifier_',
      hidden: true
    },
    {
      class: 'String',
      name: 'token_',
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'showAction',
      visibility: 'HIDDEN',
      value: true,
      documentation: 'Optional boolean used to display this model without login action'
    },
    {
      class: 'Boolean',
      name: 'pureLoginFunction',
      documentation: 'Set to true, if we just want to login without application redirecting.',
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'loginFailed',
      value: true,
      hidden: true,
      documentation: 'Used to control flow in transient wizard signin'
    }
  ],

  methods: [
    {
      name: 'nextStep',
      code: async function() {
        if ( this.subject.realUser.twoFactorEnabled ) {
          this.loginSuccess = false;
          this.window.history.replaceState({}, document.title, '/');
          this.stack.push(this.StackBlock.create({
            view: { class: 'foam.nanos.auth.twofactor.TwoFactorSignInView' }
          }));
        }
      }
    },
    {
      name: 'verifyEmail',
      code: async function(x, email, username) {
      this.ctrl.groupLoadingHandled = true;
        this.onDetach(this.emailVerificationService.sub('emailVerified', this.emailVerifiedListener));
        this.stack.push(this.StackBlock.create({
          view: {
            class: 'foam.u2.borders.StatusPageBorder', showBack: false,
            children: [{
              class: 'foam.nanos.auth.email.VerificationCodeView',
              data: {
                class: 'foam.nanos.auth.email.EmailVerificationCode',
                email: email,
                userName: username
              }
            }]
          }, parent: this
        }, this));
      }
    },
    {
      name: 'notifyUser',
      code: function(err, msg, type) {
        this.ctrl.add(this.NotificationMessage.create({
          err: err,
          message: msg,
          type: type
        }));
      }
    }
  ],

  listeners: [
    {
      name: 'emailVerifiedListener',
      code: function() {
        this.login();
      }
    }
  ],

  actions: [
    {
      name: 'login',
      label: 'Sign In',
      section: 'footerSection',
      buttonStyle: 'PRIMARY',
      // if you use isAvailable or isEnabled - with model error_, then note that auto validate will not
      // work correctly. Chorme for example will not read a field auto populated without a user action
      isAvailable: function(showAction) { return showAction; },
      code: async function(x) {
        if ( this.identifier.length > 0 ) {
          if ( ! this.password ) {
            this.notifyUser(undefined, this.ERROR_MSG3, this.LogLevel.ERROR);
            return;
          }
          try {
            this.logAnalyticEvent({ name: 'USER_CLICKED_SIGN_IN' });
            var loginId = this.usernameRequired ? this.username : this.identifier;
            let logedInUser = await this.auth.login(x, loginId, this.password);
            this.loginFailed = false;
            if ( ! logedInUser ) return;
            this.email = logedInUser.email;
            this.username = logedInUser.userName;
            if ( this.token_ ) {
              logedInUser.signUpToken = this.token_;
              try {
                let updatedUser = await this.dao_.put(logedInUser);
                this.subject.user = updatedUser;
                this.subject.realUser = updatedUser;
                if ( ! this.pureLoginFunction ) await this.nextStep();
              } catch ( err ) {
                this.notifyUser(err.data, this.ERROR_MSG, this.LogLevel.ERROR);
              }
            } else {
              this.subject.user = logedInUser;
              this.subject.realUser = logedInUser;
              if ( ! this.pureLoginFunction ) await this.nextStep();
            }

            // Reload only if it wasn't done by the 'nextStep()' call
            if ( ! this.loginSuccess ) {
              await this.ctrl.reloadClient();
              this.loginSuccess = true;
              // Temp fix to prevent breaking wizard sign in since that also calls this function
              if ( ! this.pureLoginFunction )
                await this.ctrl.onUserAgentAndGroupLoaded();
            }
          } catch (err) {
            this.loginFailed = true;
            let e = err && err.data ? err.data.exception : err;
            if ( this.DuplicateEmailException.isInstance(e) ) {
              this.email = this.identifier;
              if ( this.username ) {
                try {
                  logedInUser = await this.auth.login(x, this.username, this.password);
                  this.loginFailed = false;
                  this.subject.user = logedInUser;
                  this.subject.realUser = logedInUser;
                  if ( ! this.pureLoginFunction ) await this.nextStep();
                  return;
                } catch ( err ) {
                  this.username = '';
                }
              }
              this.usernameRequired = true;
            }
            if ( this.UnverifiedEmailException.isInstance(e) ) {
              // find user
              var email = this.usernameRequired ? this.email : this.identifier;
              this.verifyEmail(x, email, this.userName);
              // do not show error notification for unverified email
              return;
            }
            this.notifyUser(err.data, this.ERROR_MSG, this.LogLevel.ERROR);
          }
        } else {
          // TODO: Add functionality to push to sign up if the user identifier doesnt exist
          this.notifyUser(undefined, this.ERROR_MSG2, this.LogLevel.ERROR);
        }
      }
    },
    {
      name: 'signInWithGoogle',
      label: 'Sign in With Google',
      section: 'footerSection',
      isAvailable: function(showAction) { return showAction },
      code: async function(X) {
        // TODO: Validate nonce
        var nonce = crypto.randomUUID();

        var reqParams = {
          response_type: 'code',
          client_id: this.appConfig.googleSignInClientId,
          scope: 'openid email',
          redirect_uri: location.origin + "/service/oidc",
          nonce: nonce,
          state: this.sessionID,
        }

        var uri = 'https://accounts.google.com/o/oauth2/v2/auth'

        try {
          await new Promise((resolve, reject) => {
            let listener = (e) => {
              if (e.origin == location.origin && e.data && e.data.sessionID == this.sessionID) {
                window.removeEventListener('message', listener);
                if (e.data.msg == "success") {
                  resolve();
                } else {
                  reject(e.data.error)
                }
                authwindow.close();
              }
            }

            window.addEventListener('message', listener);

            let authwindow = window.open(uri + '?' + Object.entries(reqParams).map(v => v.map(p => encodeURIComponent(p)).join('=')).join('&'))
          });
        } catch(e) {
          this.notifyUser(undefined, e, this.LogLevel.ERROR);
        }

        this.subject = await this.auth.getCurrentSubject(x);
        this.username = this.subject.user
        await this.ctrl.reloadClient();
        this.loginSuccess = true;
        await this.ctrl.onUserAgentAndGroupLoaded();
      }
    },
    {
      name: 'footer',
      label: 'Create an Account',
      section: 'footerSection',
      buttonStyle: 'TEXT',
      isAvailable: function(showAction) { return showAction; },
      code: function(X) {
        X.routeTo('sign-up');
      }
    },
    {
      name: 'subFooter',
      label: 'Forgot Password?',
      section: 'footerSection',
      buttonStyle: 'LINK',
      isAvailable: function(showAction) { return showAction; },
      code: function(X) {
        const wizardRunner = this.WizardRunner.create({
          wizardType: this.WizardType.TRANSIENT,
          source: 'foam.nanos.auth.email.ResetPassword',
          options: {inline: false, returnCompletionPromise: true}
        })
        wizardRunner.launch();
      }
    }
  ]
});
