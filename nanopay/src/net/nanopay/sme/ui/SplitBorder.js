foam.CLASS({
    package: 'net.nanopay.sme.ui',
    name: 'SplitBorder',
    extends: 'foam.u2.Element',

    css: `
      ^ {
        heightL 100%;
        width: 100%;
      }
      ^ .left-block {
        float: left;
        height: 100%;
        width: calc(100% - 600px);
        display: inline-block;
        background: #f9f9f9;
        margin-top: 10px;
      }
      ^ .right-block {
        float: right;
        width: 600px;
        display: inline-block;
        background: #fff;
        height: 100%;
        overflow-y: scroll;
        margin-top: 10px;
      }
      ^content {
        width: 100%;
        width: -moz-available;
        width: -webkit-fill-available;
        width: fill-available;
        position: relative;
        padding-bottom: 40px;
      }
      ^ .top-bar {
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid #d9d9d9;
        background: #fff;
        margin-top: 10px;
      }
      ^ .back-link {

      }
    `,

    properties: [
      'leftPanel',
      'rightPanel'
    ],

    methods: [
      function init() {
        this.addClass(this.myClass())
        // .start().addClass('top-bar')
        //   .start().addClass('back-link').add('Go back').end()
        // .end()
          .start().addClass('left-block')
            .start('div', null, this.leftPanel$)
                .addClass(this.myClass('content'))
            .end()
          .end()
          .start().addClass('right-block')
            .start('div', null, this.rightPanel$)
              .addClass(this.myClass('content'))
            .end()
          .end();
        
      }
    ]
});
