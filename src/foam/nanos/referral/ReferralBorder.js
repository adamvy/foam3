
/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.nanos.referral',
  name: 'ReferralBorder',
  extends: 'foam.u2.View',
  documentation: `Wraps ReferUserView in a border so it can be used around DAO views`,
  requires: ['foam.nanos.referral.ReferUserView'],
  css: `
    ^ {
      container: outer / inline-size;
    }
    ^wrapper {
      padding: 1em;
      display: flex;
      gap: 2rem;
      height: 100%;
      overflow: auto;
    }
    ^wrapper > *:last-child {
      flex: 1;
      //Width needed as a start point for flex to prevent overflow;
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1em;
    }
    ^wrapper > *:first-child {
      flex: 0 0 30%;
    }
    @container outer (width < 768px) {
      ^wrapper {
        flex-direction: column;
      }
      ^wrapper > *:first-child, ^wrapper > *:last-child {
        width: 100%;
        align-self: center;
      }
    }
  `,
  methods: [
    function init() {
      this
        .addClass()
        .start()
          .addClass(this.myClass('wrapper'))
          .tag(this.ReferUserView)
          .start()
            .start().addClass('h500').add('Rewards History').end()
            .start(foam.u2.borders.CardBorder).style({ width: '100%' }).tag('', {}, this.content$).end()
          .end()
        .end()
    }
  ]
});