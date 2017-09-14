
foam.CLASS({
  package: 'net.nanopay.ui.style',
  name: 'appStyling',
  extends: 'foam.u2.View',

  documentation: 'Generic App CSS that is used through out the Nanopay platform.',

  axioms: [
    foam.u2.CSS.create({
      code: function CSS() {/*
        .input-box{
          width: 90%;
          height: 60px;
          margin-left: 5%;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.2px;
          color: #093649;
          text-align: left;
        }
        .blue-button{
          width: 135px;
          height: 40px;
          border-radius: 2px;
          background-color: #59aadd;
          cursor: pointer;
          text-align: center;
          color: #ffffff;
          font-size: 14px;
          line-height: 2.86;
          letter-spacing: 0.2px;
          margin: 20px 20px;
          float: right;
        }
        .full-width-button{
          width: 90%;
          height: 40px;
          border-radius: 2px;
          border: solid 1px #59a5d5;
          margin-left: 20px;
          background-color: #59aadd;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          color: #ffffff;
          margin-top: 10px;
        }
        .full-width-input{
          width: 90%;
          height: 40px;
          margin-left: 5%;
          margin-bottom: 15px;
        }
        .label{
          height: 16px;
          font-family: Roboto;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.2px;
          text-align: left;
          color: #093649;
          margin-bottom: 8px;
          margin-left: 20px;
        }
        .link{
          color: #59a5d5;
          cursor: pointer;
        }
        .light-roboto-h2 {
          font-size: 20px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: 0.3px;
          color: #093649;
          opacity: 0.6;
          margin-bottom: 35px;
          display: inline-block;
          width: 200px;
        }
        .green-border-container{
          display: inline-block;
          border-radius: 4px;
          border: solid 1px #1cc2b7;
        }
        .inline{
          display: inline-block;
        }
        .hide{
          display: none;
        }
        .thin-align{
          font-weight: 100;
          margin: 10px 0 0 0;
        }
        .blue-card-title{
          display: block;
          width: 135px;
          height: 70px;
          padding-top: 30px;
          border-radius: 2px;
          background-color: #59aadd;
          text-align: center;
          color: white;
          font-weight: 16px;
          display: inline-block;
        }
        .foam-u2-ActionView-create{
          background: #59aadd !important;
          border: none !important;
          box-shadow: none !important;
          color: white !important;
          font-weight: 100 !important;
          width: 135px;
          height: 39px;
          position: relative;
          top: -40;
        }
        .foam-u2-ActionView-back{
          position: absolute;
          top: -2px;
          width: 135px;
          height: 40px;
          border-radius: 2px;
          background-color: rgba(164, 179, 184, 0.1) !important;
          box-shadow: 0 0 1px 0 rgba(9, 54, 73, 0.8);
          color: black;
        }
      */}
    })
  ]
});