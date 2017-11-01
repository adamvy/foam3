foam.CLASS({
  package: 'net.nanopay.ui',
  name: 'NotificationMessage',
  extends: 'foam.u2.View',

  documentation: 'error message handler for merchant app.',

  properties: [
    {
      class: 'String',
      name: 'type',
      expression: function(type){
        return type == 'error' ? true : false;
      }
    },
    'message',
    'data'
  ],

  axioms: [
    foam.u2.CSS.create({
      code: function CSS() { /*
        ^ {
          width: 250px;
          padding: 20px 60px;
          background: #cff0e1;
          position: absolute;
          top: 100px;
          right: 100px;
          border: 1px solid #2cab70;
          animation-name: fade;
          animation-duration: 4s;
          font-size: 12px;
          line-height: 1.33;
          letter-spacing: 0.2px;
          text-align: center;
          z-index: 100;
        }
        @keyframes fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        ^error-background{
          background: #f4cccc;
          border: 1px solid #f33d3d;
        }
        ^ .close-x{
          right: 5px;
          top: 10px;
        }
        ^ .net-nanopay-ui-ActionView-close{
          width: 30px;
          height: 30px;
          position: absolute;
          left: -14px;
          top: -5px;
          z-index: 101;
          opacity: 0.01;
        }
      */
      }
    })
  ],

  methods: [
    function initE(){
      var self = this;

      this
        .addClass(this.myClass()).enableClass(this.myClass('error-background'), this.type$)
        .start()
          .add(this.message)
        .end()
        .startContext({ data: this })
          .start().addClass('close-x').add(this.CLOSE).end()
        .endContext()

        setTimeout(function(){ self.remove() }, 3900);
    }
  ],

  actions: [
    {
      name: 'close',
      label: '',
      code: function(X){
        X.data.remove();
      }
    }
  ]
});