/**
* @license
* Copyright 2022 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.css',
  name: 'TokenExpr',

  documentation: `
    Mlang expr for getting the value of the token from current context
    WARNING: Unlike most Mlang exprs, this expr is async and can only be used with other exprs that support async
  `,

  properties: [
    { name: 'arg1' }
  ],
  methods: [
    async function f(o) {
      return await foam.CSS.returnTokenValue(this.arg1, o.cls_, o.__subContext__);
    }
  ]
});

foam.CLASS({
  package: 'foam.css',
  name: 'LightenExpr',
  requires: [ 'foam.mlang.Constant'],
  properties: [
    {
      name: 'arg1',
      adapt: function(_, n) {
        if ( typeof n === 'string' ) {
          return this.Constant.create({ value: n });
        }
        return n;
      }
    },
    {
      name: 'arg2',
      adapt: function(_, n) {
        if ( typeof n === 'number' ) {
          return this.Constant.create({ value: n });
        }
        return n;
      }
    }
  ],
  methods: [
    async function f(o) {
      const color = await this.arg1.f(o);
      const amount = await this.arg2.f(o);
      return foam.Color.lighten(color, amount);
    }
  ]
});

foam.CLASS({
  package: 'foam.css',
  name: 'FindForegroundExpr',

  requires: [ 'foam.mlang.Constant'],
  properties: [
    {
      name: 'baseColor',
      adapt: function(_, n) {
        if ( typeof n === 'string' ) {
          return this.Constant.create({ value: n });
        }
        return n;
      }
    },
    {
      name: 'darkColor',
      adapt: function(_, n) {
        if ( typeof n === 'string' ) {
          return this.Constant.create({ value: n });
        }
        return n;
      }
    },
    {
      name: 'lightColor',
      adapt: function(_, n) {
        if ( typeof n === 'string' ) {
          return this.Constant.create({ value: n });
        }
        return n;
      }
    }
  ],
  methods: [
    async function f(o) {
      const color = await this.baseColor.f(o);
      const dark = await this.darkColor.f(o);
      const light = await this.lightColor.f(o);
      return foam.Color.getBestForeground(color, dark, light);
    }
  ]
});


foam.CLASS({
  package: 'foam.css',
  name: 'ColorExprBuilder',
  requires: [
    'foam.css.LightenExpr',
    'foam.css.TokenExpr',
    'foam.css.FindForegroundExpr'
  ],
  methods: [
    function TOKEN(name) { return this.TokenExpr.create({ arg1: name }); },
    function LIGHTEN(a, b) { return this.LightenExpr.create({ arg1: a, arg2: b }); },
    function FOREGROUND(a, b, c) { return this.FindForegroundExpr.create({ baseColor: a, darkColor: b, lightColor: c }); },
  ]
});
