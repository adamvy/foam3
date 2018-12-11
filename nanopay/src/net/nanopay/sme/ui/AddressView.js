foam.CLASS({
  package: 'net.nanopay.sme.ui',
  name: 'AddressView',
  extends: 'foam.u2.View',

  documentation: 'SME specific address view used in forms.',

  implements: [
    'foam.mlang.Expressions',
  ],

  requires: [
    'foam.nanos.auth.Address',
    'foam.nanos.auth.Region',
    'foam.nanos.auth.Country'
  ],

  imports: [
    'countryDAO',
    'regionDAO'
  ],

  properties: [
    {
      name: 'countryId',
      factory: function() {
        return this.data.countryId ? this.data.countryId : this.Country.create({});
      },
      postSet: function(o, n) {
        this.data.countryId = n;
      }
    },
    {
      name: 'regionId',
      factory: function() {
        return this.data.regionId ? this.data.regionId : this.Region.create({});
      },
      postSet: function(o, n) {
        this.data.regionId = n;
      }
    }
  ],

  css: `
    ^ .foam-u2-tag-Select {
      width: 100%;
      height: 35px;
      margin-bottom: 10px;
    }
    ^ .label {
      margin-left: 0px;
    }
    ^ .foam-u2-TextField {
      width: 100%;
      height: 35px;
      margin-bottom: 10px;
    }
  `,

  messages: [
    { name: 'COUNTRY_LABEL', message: 'Country' },
    { name: 'STREET_NUMBER_LABEL', message: 'Street Number' },
    { name: 'STREET_NAME_LABEL', message: 'Street Name' },
    { name: 'ADDRESS_LABEL', message: 'Address Line 2' },
    { name: 'ADDRESS_HINT', message: 'Apartment, suite, unit, building, floor, etc.' },
    { name: 'PROVINCE_LABEL', message: 'State/Province' },
    { name: 'CITY_LABEL', message: 'City' },
    { name: 'POSTAL_CODE_LABEL', message: 'Postal Code/Zip Code' }
  ],

  methods: [
    function initE() {
      this.SUPER();
      var self = this;

      var choices = this.data$.dot('countryId').map(function(countryId) {
        if ( countryId == 'US' ) {
          return self.regionDAO.where(
            self.AND(
              self.EQ(self.Region.COUNTRY_ID, countryId || ''),
              self.NEQ(self.Region.NAME, 'Alaska'),
              self.NEQ(self.Region.NAME, 'Hawaii'),
              self.NEQ(self.Region.NAME, 'Utah'),
              self.NEQ(self.Region.NAME, 'South Dakota'),
              self.NEQ(self.Region.NAME, 'Iowa'),
              self.NEQ(self.Region.NAME, 'Arkansas'),
              self.NEQ(self.Region.NAME, 'Louisiana'),
              self.NEQ(self.Region.NAME, 'Mississippi'),
              self.NEQ(self.Region.NAME, 'South Carolina'),
              self.NEQ(self.Region.NAME, 'West Virginia'),
              self.NEQ(self.Region.NAME, 'Ohio'),
              self.NEQ(self.Region.NAME, 'Michigan'),
              self.NEQ(self.Region.NAME, 'Rhode Island'),
              self.NEQ(self.Region.NAME, 'Vermont')
            )
          );
        } else {
          return self.regionDAO.where(self.EQ(self.Region.COUNTRY_ID, countryId || ''));
        }
      });

      this
        .addClass(this.myClass())
        .start().addClass('label-input').addClass('half-container').addClass('left-of-container')
          .start().addClass('label').add(this.COUNTRY_LABEL).end()
          .start(this.COUNTRY_ID.clone().copyFrom({
            view: {
              class: 'foam.u2.view.ChoiceView',
              placeholder: '- Please select -',
              dao: self.countryDAO.where(self.OR(
                self.EQ(self.Country.NAME, 'Canada'),
                self.EQ(self.Country.NAME, 'USA')
              )),
              objToChoice: function(a) {
                return [a.id, a.name];
              }
            }
          })).end()
        .end()
        .start().addClass('label-input').addClass('half-container')
          .start().addClass('label').add(this.PROVINCE_LABEL).end()
          .start(this.REGION_ID.clone().copyFrom({
            view: {
              class: 'foam.u2.view.ChoiceView',
              objToChoice: function(region) {
                return [region.id, region.name];
              },
              dao$: choices
            }
          })).end()
        .end()
        .start().addClass('label-input').addClass('half-container').addClass('left-of-container')
          .start().addClass('label').add(this.STREET_NUMBER_LABEL).end()
          .start(this.Address.STREET_NUMBER).addClass('input-field').end()
        .end()
        .start().addClass('label-input').addClass('half-container')
          .start().addClass('label').add(this.STREET_NAME_LABEL).end()
          .start(this.Address.STREET_NAME).addClass('input-field').end()
        .end()
        .start().addClass('label-input')
          .start().addClass('label').add(this.ADDRESS_LABEL).end()
          .start(this.Address.SUITE).addClass('input-field').end()
        .end()
        .start().addClass('label-input').addClass('half-container').addClass('left-of-container')
          .start().addClass('label').add(this.CITY_LABEL).end()
          .start(this.Address.CITY).addClass('input-field').end()
        .end()
        .start().addClass('label-input').addClass('half-container')
          .start().addClass('label').add(this.POSTAL_CODE_LABEL).end()
          .start(this.Address.POSTAL_CODE).addClass('input-field').end()
        .end();
    }
  ]
});
