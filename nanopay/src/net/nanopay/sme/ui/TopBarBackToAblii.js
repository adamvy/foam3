foam.CLASS({
  package: 'net.nanopay.sme.ui',
  name: 'TopBarBackToAblii',
  extends: 'foam.u2.Controller',

  documentation: 'Top bar view for redirecting to ablii.com',

  imports: [
    'auth',
    'stack'
  ],

  css: `
    ^ .net-nanopay-sme-ui-TopBarBackToAblii-button{
      position: relative;
      top: 22px;
      cursor: pointer;
    }
  `,

  messages: [
    { name: 'GO_BACK', message: 'Back to ablii.com' },
  ],

  methods: [
    function initE() {
      var self = this;
      this.addClass(this.myClass())
      .start().addClass('top-bar')
        .start().addClass('top-bar-inner')
          .start().addClass(this.myClass('button'))
            .start()
              .addClass('horizontal-flip')
              .addClass('inline-block')
              .add('➔')
            .end()
            .add(this.GO_BACK)
            .on('click', () => {
              self.auth.logout();
              self.stack.push({ class: 'net.nanopay.sme.ui.SignInView' })
            })
          .end()
        .end()
      .end();
    }
  ]
});
