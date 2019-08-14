foam.CLASS({
  package: 'net.nanopay.account.ui',
  name: 'AccountTreeView',
  extends: 'foam.u2.Element',

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'accountDAO'
  ],

  requires: [
    'net.nanopay.account.ui.AccountTreeGraph'
  ],

  documentation: `
    A customized Tree View for accounts based on the Liquid design
  `,

  css: `
    ^header {
      border-bottom: solid 1px #e7eaec;
      height: 39px;
      width: 100%;
      text-align: center;
      padding-top: 12px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.5;
      color: #1e1f21;
    }
  `,

  messages: [
    {
      name: 'VIEW_HEADER',
      message: 'ACCOUNT HIERARCHY VIEW',
    },
  ],

  properties: [ 'cview' ],
  actions: [
    {
      name: 'zoomIn',
      // isEnabled: function(cview$scaleX, cview$scaleY) {
      //   return cview$scaleX <= 5 && cview$scaleY <= 5;
      // },
      code: function() {
        this.cview.scaleX += 0.25;
        this.cview.scaleY += 0.25; 
      }
    },
    {
      name: 'zoomOut',
      isEnabled: function(cview$scaleX, cview$scaleY) {
        return (cview$scaleX || 0) >= 0.25 && (cview$scaleY || 0) >= 0.25;
      },
      code: function() {
        debugger;
        this.cview.scaleX -= 0.25;
        this.cview.scaleY -= 0.25;
      }
    },
    {
      name: 'home',
      code: function() {
        window.scroll({
          left: this.cview.width * 0.50,
          behaviour: 'smooth'
        })
      }
    }
  ],

  methods: [
      function initE(){
        var self = this;

        this.addClass(this.myClass());
        this
          .start().addClass(this.myClass('header'))
            .add(this.VIEW_HEADER)
          .end()
          .startContext({data: this})
            .start().add(this.ZOOM_IN).end()
            .start().add(this.ZOOM_OUT).end()
            .start().add(this.HOME).end()
          .endContext()
          .start().style({overflow: 'scroll'})
            .add(self.accountDAO.where(this.AND(this.INSTANCE_OF(net.nanopay.account.AggregateAccount), this.EQ(net.nanopay.account.Account.PARENT, 0))).limit(1).select().then((a) => {
              self.cview = self.AccountTreeGraph.create({ data: a.array[0] });
              return self.cview;
            }))      
          .end()
      }
  ],
});
