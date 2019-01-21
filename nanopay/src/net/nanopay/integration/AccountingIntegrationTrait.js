foam.CLASS({
  package: 'net.nanopay.integration',
  name: 'AccountingIntegrationTrait',

  documentation: 'Manages the buttons for Accounting Integrations',

  requires: [
    'foam.u2.dialog.NotificationMessage',
    'net.nanopay.integration.IntegrationCode'
  ],

  imports: [
    'ctrl',
    'xeroSignIn',
    'quickSignIn',
    'userDAO'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'isSignedIn',
      documentation: 'True if signed in to Accounting.'
    }
  ],

  methods: [
    function init() {
      this.SUPER();
      var self = this;
      /*
      Retrieves the updated user as session user is only image of user at login.
      Determines which integration is being used at the moment as both integrations can not be simultaneously used.
      */
      this.userDAO.find(this.user.id).then(function(nUser) {
        if ( nUser.integrationCode == self.IntegrationCode.XERO ) {
          self.xeroSignIn.isSignedIn(null, nUser).then((result) => {
            self.isSignedIn = ! ! result.result;
          })
          .catch((err) => {
            self.ctrl.add(this.NotificationMessage.create({
              message: err.message,
              type: 'error'
            }));
          });
        } else if ( nUser.integrationCode == self.IntegrationCode.QUICKBOOKS ) {
          self.quickSignIn.isSignedIn(null, nUser).then((result) => {
            self.isSignedIn = ! ! result.result;
          })
          .catch((err) => {
            self.ctrl.add(this.NotificationMessage.create({
              message: err.message,
              type: 'error'
            }));
          });
        }
      });
    }
  ],

  actions: [
    {
      name: 'sync',
      label: 'Sync',
      icon: 'images/ablii/sync-resting.svg',
      isAvailable: function(isSignedIn) {
        return ! isSignedIn;
      },
      code: function(X) {
        X.controllerView.add(this.Popup.create().tag({
          class: 'net.invoice.ui.modal.IntegrationModal'
        }));
      }
    },
    {
      name: 'syncBtn',
      label: 'Sync with Accounting',
      isAvailable: function(isSignedIn) {
        return isSignedIn;
      },
      code: function(X) {
        if ( this.user.integrationCode == this.IntegrationCode.XERO ) {
          this.xeroSignIn.syncSys(null, X.user).then((result) => {
            this.ctrl.add(this.NotificationMessage.create({
              message: result.reason,
              type: ( ! result.result ) ? 'error' : ''
            }));
            this.isSignedIn = result.result;
          })
          .catch((err) => {
            this.ctrl.add(this.NotificationMessage.create({
              message: err.message,
              type: 'error'
            }));
          });
        } else if ( this.user.integrationCode == this.IntegrationCode.QUICKBOOKS ) {
          this.quickSignIn.syncSys(null, X.user).then((result) => {
            this.ctrl.add(this.NotificationMessage.create({
              message: result.reason,
              type: ( ! result.result ) ? 'error' : ''
            }));
            this.isSignedIn = result.result;
          })
          .catch((err) => {
            this.ctrl.add(this.NotificationMessage.create({
              message: err.message,
              type: 'error'
            }));
          });
        }
      }
    },
  ]
});
