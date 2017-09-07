
foam.CLASS({
  package: 'net.nanopay.b2b.ui',
  name: 'Controller',
  extends: 'foam.u2.Element',

  documentation: 'Top-level B2B Controller.',
  arequire: function() { return foam.nanos.client.ClientBuilder.create(); }, 

  implements: [
    'foam.nanos.client.Client',
    'foam.nanos.client.Client2',
    'net.nanopay.b2b.dao.Storage',
    'foam.mlang.Expressions'
  ],

  requires: [
    'foam.u2.stack.Stack',
    'foam.u2.stack.StackView',
    'net.nanopay.b2b.model.Business',
    'net.nanopay.b2b.model.Invoice',
    'net.nanopay.b2b.ui.shared.CurrencyFormatter',
    'foam.nanos.auth.Address'
  ],

  exports: [
    'business',
    'expensesDAO',
    'salesDAO',
    'partnersDAO',
    'stack',
    'user',
    'currencyFormatter',
    'as ctrl'
  ],

  axioms: [
    foam.u2.CSS.create({
      code: function CSS() {/*
        .stack-wrapper{
          min-height: calc(80% - 60px);
          margin-bottom: -10px;
        }
        .stack-wrapper:after{
          content: "";
          display: block;
        }
        .stack-wrapper:after, .net-nanopay-b2b-ui-shared-FooterView{
          height: 10px;
        }
      */}
    })
  ],

  properties: [
    {
      class: 'foam.core.FObjectProperty',
      of: 'foam.nanos.auth.User',
      name: 'user',
      factory: function() { return this.User.create(); }
    },
    {
      class: 'foam.core.FObjectProperty',
      of: 'net.nanopay.b2b.model.Business',
      name: 'business',
      factory: function() { return this.Business.create(); }
    },
    {
      name: 'salesDAO',
      factory: function() { return this.business.sales; }
    },
    {
      name: 'partnersDAO',
      factory: function() { return this.business.partners.dao }
    },
    {
      name: 'expensesDAO',
      factory: function() { return this.business.expenses; }
    },
    {
      name: 'stack',
      factory: function() { return this.Stack.create(); }
    },
    {
      name: 'address',
      factory: function() { return this.Address.create(); }
    },
    {
      name: 'currencyFormatter',
      factory: function() { return this.CurrencyFormatter.create(); }
    },
    {
      class: 'foam.core.FObjectProperty',
      of: 'net.nanopay.b2b.model.Business',
      name: 'partner',
      factory: function() { return this.Business.create(); }
    }
  ],

  methods: [
    function init() {
      /* TODO: remove this method when debugged */
      this.SUPER();

      var self = this;

      // Injecting Sample Business 
      this.businessDAO.limit(1).select().then(function(a) {
        self.business.copyFrom(a.array[0]);
      });

      // Injecting Sample Partner 
      // this.businessDAO.limit(10).select().then(function(a) {
      //   a.array.forEach(function(e){
      //     self.business.partners.add(e);
      //   })
      // });

      // Injecting Sample Partner
      // this.userDAO.limit(1).select().then(function(a) {
      //   self.user.copyFrom(a.array[0]);
      // });

      this.business.sub(function() {
        self.salesDAO.pub('on', 'change');
        self.expensesDAO.pub('on', 'change');
      });

      this.user.sub(this.userChange);

      this.stack.push({ class: 'net.nanopay.b2b.ui.signin.SignInView' });
    },

    function initE() {
      var self = this;

      this
        .addClass(this.myClass())
          .tag({class: 'net.nanopay.b2b.ui.shared.topNavigation.TopNav', data: self.business })
        // .add(this.user$.dot('id').map(function (id) {
        //   return id ?
        //     self.E().tag({class: 'net.nanopay.b2b.ui.shared.topNavigation.TopNav', data: self.business }) :
        //     self.E().tag({class: 'net.nanopay.b2b.ui.shared.topNavigation.NoMenuTopNav' });
        // }))
        .br()
        .start('div').addClass('stack-wrapper')
          .tag({class: 'foam.u2.stack.StackView', data: this.stack, showActions: false})
          // .tag({class: 'net.nanopay.b2b.ui.payables.ExpensesView'})
        .end()
        .br()
        .tag({class: 'net.nanopay.b2b.ui.shared.FooterView'})
    },
  ],

  actions: [
    {
      name: 'logout',
      label: 'Sign Out',
      code: function() {
        console.log('TODO: logout')
      }
    }
  ],

  listeners: [
    function userChange(){
      var self = this;

      this.businessDAO.find(this.user.business).then(function(b) {
        self.business.copyFrom(b); 
      });
    }
  ]
});
  