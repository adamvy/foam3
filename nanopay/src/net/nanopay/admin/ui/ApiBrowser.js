foam.CLASS({
  package: 'foam.doc',
  name: 'ApiBrowser',
  extends: 'foam.u2.Element',
  documentation: 'Show UML & properties for passed in models',

  requires: [
    'foam.doc.ClassList',
    'foam.doc.DocBorder',
    'foam.doc.SimpleClassView',
    'foam.doc.GetRequestView',
    'foam.doc.PutRequestView',
    'foam.doc.ServiceListView',
    'foam.doc.ExampleRequestView',
    'foam.doc.ClientServiceView',
    'foam.doc.ExpandContainer'
  ],

  imports: [
    'appConfig',
    'nSpecDAO',
    'AuthenticatedNSpecDAO'
  ],

  exports: [
    'showOnlyProperties',
    'showInherited',
    'path as browserPath'
  ],

  properties: [
    {
      name: 'models',
      value: []
    },
    {
      name: 'showOnlyProperties',
      value: true
    },
    {
      name: 'showInherited',
      value: false
    },
    {
      name: 'selectedClass',
      expression: function(path) {
        return this.lookup(path, true);
      }
    },
    {
      class: 'String',
      name: 'path',
      width: 80,
      factory: function() {
        var path = 'foam.core.Property';

        this.document.location.search
            .substring(1)
            .split('&')
            .forEach(function(s) {
              s = s.split('=');
              if ( s[0] === 'path' ) path = s[1];
            });

        return path;
      }
    },
  ],

  css: `
    ^ {
      display: flow-root;
      height: auto;
      width: 700px;
      margin: 20px;
    }
    ^ .foam-doc-UMLDiagram{
      width: 700px;
      margin: 0;
      margin-bottom: 20px;
    }
    ^ .foam-doc-UMLDiagram canvas{
      width: 700px;
    }
    ^ .foam-u2-view-TableView-foam-doc-PropertyInfo{
      width: 700px;
      float: left;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    ^ .net-nanopay-ui-ActionView-printPage{
      margin-top: 20px;
    }
    ^ .light-roboto-h2{
      white-space: normal;
      width: 100%;
    }
    ^ .black-box{
      background: #1e1c3a;
      padding: 20px;
    }
    ^ .small-roboto{
      color: white;
      font-size: 14px;
      font-family: Roboto;
      line-height: 1.5;
      font-weight: 300;
    }
    ^ .sml{
      font-size: 14px;
      font-weight: 500;
      color: black;
    }
    @media print{
      .foam-u2-view-TableView-th-editColumns{
        display: none;
      }
      ^ .net-nanopay-ui-ActionView-printPage{
        display: none;
      }
      .net-nanopay-ui-topNavigation-TopNav{
        display: none;
      }
    }
    .selected-model{
      vertical-align: top;
      display: block;
      height: 700px;
      width: 600px;
      overflow: scroll;
      background: white;
      margin-top: 20px;
    }
    ^ .className {
      font-size: 25px;
      margin: 30px 0px;
      font-weight: 500;
    }
    ^ .foam-u2-view-TableView td {
      white-space: normal;
    }
    .selected-model .foam-u2-view-TableView {
      width: 600px;
    }
    .service-list-container{
      width: 350px !important;
      position: fixed;
      right: 600px;
      top: 65px;
      border-right: 1px solid lightblue;
      z-index: 1;
    }
    .selected-model-container{
      width: 600px !important;
      position: fixed;
      right: 0;
      top: 65px;
      z-index: 1;
    }
  `,

  messages: [
    {
      name: 'Title',
      message: 'API Documentation'
    }
  ],

  methods: [
    function initE() {
      this.SUPER();
      var self = this;

      var ServiceContainer = this.ExpandContainer.create({
        title: 'Service Menu'
      });
      var SelectedModelContainer = this.ExpandContainer.create({
        title: 'Model Search'
      });

      this.start()
        .start().addClass(this.myClass())
          .start().addClass('api-browser-container')
            .start('h2')
              .add(this.Title)
            .end()
            .start()
              .add(this.ExampleRequestView.create())
            .end()
            .select(this.AuthenticatedNSpecDAO, function(n) {
              var model = self.parseClientModel(n);
              if ( ! model ) return;
              var dataProps = self.requiredProperties(model);
              this.start().addClass(n.name).addClass('className')
                .add(n.name)
                .attrs({
                  id: n.name
                })
              .end()
              .callIf(n.description, function() {
                this.start()
                  .add('Description: ', n.description)
                .end();
              })
              .callIf(n.boxClass, function() {
                this.tag(self.ClientServiceView.create({
                  data: self.parseInterface(n)
                }));
              })
              .callIf(! n.boxClass, function() {
                this.tag(self.SimpleClassView.create({
                  data: model
                }))
                .tag(self.GetRequestView.create({ data: n.name }))
                .tag(self.PutRequestView.create({
                  data: {
                    n: n,
                    props: dataProps
                  }
                }));
              });
            })
          .end()
        .end();

        this.start().addClass('doc-sub-nav')
          .start(ServiceContainer).addClass('service-list-container')
            .tag(this.ServiceListView)
          .end()
          .start(SelectedModelContainer).addClass('selected-model-container')
            .start().addClass('selected-model')
              .startContext({ data: this })
                .start().add(this.PATH).end()
              .endContext()
                .add(this.slot(function(selectedClass) {
                  if ( ! selectedClass ) return '';
                  return this.SimpleClassView.create({ data: selectedClass });
                }))
              .end()
            .end()
          .end()
        .end();
    },

    function parseInterface(n) {
      var cls = this.parseClientModel(n);
      var clientService = cls.axiomMap_.delegate;
      return foam.lookup(clientService.of, true);
    },

    function parseClientModel(n) {
      var cls = JSON.parse(n.client);
      var clsName = cls.of ? cls.of : cls.class;
      return foam.lookup(clsName, true);
    },

    function requiredProperties(m) {
      var reqProps = [];
      var dataString;
      for ( var key in m.axiomMap_ ) {
        var a  = m.axiomMap_[key];
        if ( a.required ) {
          if(a.cls_.name != "Import") {
            reqProps.push('"', key, '"', ":", '"', a.cls_.name, '"');
          }
        }
      }
      dataString = reqProps.join('');
      return dataString;
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'ClientServiceView',
  extends: 'foam.u2.View',

  requires: [
    'foam.doc.ServiceMethodView'
  ],

  css: `
    ^ .interfaceLabel {
      font-size: 20px;
      font-weight: bold;
      color: grey;
      margin-bottom: 20px;
    }
    ^ .methodCall {
      background: #1e1c3a;
      color: white;
      margin: 20px 0;
      padding: 20px;
    }
    ^ .methodName {
      margin-bottom: 10px;
    }
    ^ .light-roboto-h2{
      margin-bottom: 0;
    }
  `,

  methods: [
    function initE() {
      var cls = this.data.axiomMap_;

      this.start().addClass(this.myClass())
        .start().addClass('interfaceLabel').add('(Interface)').end()
        .start().addClass('light-roboto-h2').add('Methods:').end()
        .call(function() {
          for ( var key in cls ) {
            if ( cls[key].cls_ === foam.core.internal.InterfaceMethod ) {
              this.start().addClass('methodCall')
                .start().addClass('small-roboto').addClass('methodName')
                  .add(cls[key].name)
                .end()
                .start().addClass('methodArguments')
                  .forEach(cls[key].args, function(arg) {
                    this.start().addClass('argumentItems')
                      .add('( name: ', arg.name, ', type: ', arg.javaType, ' )')
                    .end();
                  })
                .end()
              .end();
            }
          }
        })
      .end();
    }
  ],
});

foam.CLASS({
  package: 'foam.doc',
  name: 'ServiceMethodView',
  extends: 'foam.u2.View',

  methods: [
    function initE() {
      this.start()
        .forEach(this.data.args, function(a) {
          console.log('this is the methods args', a);
        })
      .end();
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'ExampleRequestView',
  extends: 'foam.u2.View',

  requires: [
    'foam.doc.GetRequestView',
    'foam.doc.PutRequestView'
  ],

  messages: [
    {
      name: 'Title',
      message: 'Making Requests'
    },
    {
      name: 'IntroMessage',
      message: 'Welcome to the nanopay API documentation. ' +
          'This API will give you the ability to connect your ' +
          'software to banking infrastructure to move money, ' +
          'store funds, and verify bank accounts. '
    },
    {
      name: 'MakingRequests',
      message: 'Request and response bodies are JSON encoded. Requests ' +
          'must contain api credentials (email/password provided by nanopay) ' +
          'on the authorization tag. Data contained in the table views ' +
          'below model details display available properties on the model. ' +
          'Those that are required are added ' +
          'to the examples shown on the service call.'
    },
    {
      name: 'Pacs008ExampleGetLabel',
      message: 'Below is an example GET request ' +
          'to the pacs008ISOPurposeDAO using curl:'
    },
    {
      name: 'Pacs008ExamplePostLabel',
      message: 'Below is an example POST request ' +
          'to the pacs008ISOPurposeDAO using curl ' +
          '(POST requests can create and update objects):'
    }
  ],

  methods: [
    function initE() {
      this.start().addClass('light-roboto-h2')
        .add(this.IntroMessage)
      .end()
      .start('h2')
        .add(this.Title)
      .end()
      .start().addClass('light-roboto-h2')
        .add(this.MakingRequests).br().br()
      .end()
      .start().addClass('light-roboto-h2').addClass('sml')
        .add(this.Pacs008ExampleGetLabel)
      .end()
      .start().addClass('small-roboto')
        .add(this.GetRequestView.create({
          data: 'pacs008ISOPurposeDAO'
        }))
      .end()
      .start().addClass('light-roboto-h2').addClass('sml')
        .br()
        .add(this.Pacs008ExamplePostLabel)
      .end()
      .start().addClass('small-roboto')
        .add(this.PutRequestView.create({
          data: {
            n: {
              name: 'pacs008ISOPurposeDAO'
            },
            props: '"type":"String"'
          }
        }))
      .end();
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'GetRequestView',
  extends: 'foam.u2.View',

  imports: [
    'appConfig'
  ],

  properties: [
    {
      name: 'url',
      expression: function(appConfig) {
        if ( appConfig ) return appConfig.url;
      }
    }
  ],

  methods: [
    function initE() {
      self = this;

      this.addClass(this.myClass())
      .start().addClass('light-roboto-h2').add('GET Request: ').end()
        .start().addClass('black-box')
          .start().addClass('small-roboto')
            .add('curl -X GET').br()
            .add(this.url$.map(function(a) {
              return self.E().start()
                  .add('\'' + a + 'service/dig?dao=' + self.data + '\'');
            }))
            .add('-u \'username/password\'').br()
            .add('-H \'accept: application/json\'').br()
            .add('-H \'cache-control: no-cache\'').br()
            .add('-H \'content-type: application/json\'')
          .end()
        .end()
      .end();
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'PutRequestView',
  extends: 'foam.u2.View',

  imports: [
    'appConfig'
  ],

  properties: [
    {
      name: 'url',
      expression: function(appConfig) {
        if ( appConfig ) return appConfig.url;
      }
    }
  ],

  methods: [
    function initE() {
      var self = this;
      this.addClass(this.myClass())
      .start().addClass('light-roboto-h2')
        .style({ 'margin-top': '25px' })
        .add('POST Request (Create & Update): ')
      .end()
      .start().addClass('black-box')
        .start().addClass('small-roboto')
          .add('curl -X POST').br()
          .add(this.url$.map(function(a) {
            return self.E().start()
                .add('\'' + a + 'service/dig?dao=' + self.data.n.name + '\'');
          }))
          .add('-u \'username/password\'').br()
          .add('-d \'{' + this.data.props + '}' ).br()
          .add('-H \'accept: application/json\'').br()
          .add('-H \'cache-control: no-cache\'').br()
          .add('-H \'content-type: application/json\'')
        .end()
      .end();
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'ServiceListView',
  extends: 'foam.u2.View',

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'nSpecDAO',
    'AuthenticatedNSpecDAO'
  ],

  requires: [
    'foam.nanos.boot.NSpec'
  ],

  css: `
    ^ {
      width: 275px;
      overflow: scroll;
      height: 300px;
      margin-top: 30px;
      font-weight: 300;
    }
    ^ .menu-title{
      font-size: 20px;
      font-weight: 300;
      padding-bottom: 20px;
    }
    ^ .menuItem {
      border-bottom: 1px solid white;
      height: 15px;
      margin-top: 8px;
    }
    ^ .menuItem:hover{
      border-bottom: 1px solid black;
      width: max-content;
      cursor: pointer;
    }
  `,

  methods: [
    function initE() {
      this.SUPER();

      this.start().addClass(this.myClass())
      .select(this.AuthenticatedNSpecDAO.orderBy(this.NSpec.NAME), function(n) {
        var cls = JSON.parse(n.client);
        var clsName = cls.of ? cls.of : cls.class;
        if ( ! foam.lookup(clsName, true) ) return;
        this.start().addClass('menuItem')
          .add(n.name)
          .on('click', function() {
            document.getElementById(n.name).scrollIntoView();
          })
        .end();
      });
    }
  ]
});


foam.CLASS({
  package: 'foam.doc',
  name: 'ExpandContainer',
  extends: 'foam.u2.Element',
  documentation: 'Provide an expandable div' +
      ' which take content to display inside.',

  imports: [
    'stack'
  ],

  properties: [
    {
      name: 'expandBox',
      value: false
    },
    'title',
    'link',
    'linkView'
  ],

  css: `
    ^ {
      width: 962px;
      min-height: 80px;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 2px;
      background-color: white;
      box-sizing: border-box;
      margin: auto;
    }
    ^ .boxTitle {
      opacity: 0.6;
      font-family: 'Roboto';
      font-size: 20px;
      font-weight: 300;
      line-height: 20px;
      letter-spacing: 0.3px;
      text-align: left;
      color: #093649;
      display: inline-block;
      position: relative;
      top: 10px;
    }
    ^ .expand-BTN{
      width: 135px;
      height: 40px;
      border-radous: 2px;
      background-color: #59a5d5;
      border-radius: 2px;
      font-family: Roboto;
      font-size: 14px;
      line-height: 2.86;
      letter-spacing: 0.2px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      display: inline-block;
      float: right;
      position: relative;
    }
    ^ .close-BTN{
      width: 135px;
      height: 40px;
      border-radius: 2px;
      background-color: rgba(164, 179, 184, 0.1);
      box-shadow: 0 0 1px 0 rgba(9, 54, 73, 0.8);
      font-family: 2px;
      font-size: 14px;
      line-height: 2.86;
      letter-spacing: 0.2px;
      text-align: center;
      color: #093649;
      cursor: pointer;
      display: inline-block;
      float: right;
    }
    ^ .expand-Container{
      width: 952px;
      height: auto;
      overflow: hidden;
      transition: max-height 1.6s ease-out;
      max-height: 1725px;
      margin: 0 auto;
      margin-right: 0;
      -webkit-transition: -webkit-transform 1.6s ease-out;
      -moz-transition: -moz-transform 1.6s ease-out;
      -ms-transition: -ms-transform 1.6s ease-out;
    }
    ^ .expandTrue{
      max-height: 0px;
    }
    ^ .link-tag{
      display: inline-block;
      border-bottom: 1px solid #59a5d5;
      color: #59a5d5;
      margin-left: 50px;
      position: relative;
      top: 10px;
      cursor: pointer;
    }
  `,

  methods: [
    function init() {
      var self = this;
      this
      .addClass(this.myClass())
      .start()
        .start().addClass('boxTitle')
          .add(this.title)
        .end()
        .callIf(this.link, function() {
          this.start().addClass('link-tag')
            .add(self.link).on('click', function() {
              self.stack.push({ class: self.linkView });
            })
          .end();
        })
        .start()
          .addClass('expand-BTN')
          .enableClass('close-BTN', this.expandBox$, true)
          .add(this.expandBox$.map(function(e) {
            return e ? 'Expand' : 'Close';
          }))
          .enableClass('', self.expandBox = (self.expandBox ? false : true))
          .on('click', function() {
            self.expandBox = ( self.expandBox ? false : true );
          })
        .end()
        .start()
          .addClass('expand-Container')
          .enableClass('expandTrue', self.expandBox$)
          .start('div', null, this.content$).end()
        .end()
      .end();
    }
  ]
});
