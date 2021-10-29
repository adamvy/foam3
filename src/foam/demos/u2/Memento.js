// TODO:
//   name collision support
//   output empty/default names when collision occurs
//   support path vs. param mementos
//   support "sticky" localStorage/config properties
//   feedback elimination?
//   eliminate need for implementing Memorable by having property install!
//     -- maybe a bad idea

foam.CLASS({
  name: 'Memento',

  properties: [
    {
      // Stores all bindings, even those that aren't currently being used.
      // Store as an array of [key, value] pairs.
      // An array is used instead of a map because duplicates are allowed.
      name: 'bindings',
      factory: function() { return []; }
    },
    {
      name: 'frames',
      factory: function() { return []; }
    },
    {
      class: 'String',
      name: 'str',
      displayWidth: 100,
      postSet: function(_, s) {
        // parser & separated string of key=value bindings and store in this.bindings
        var m = [];
        s.split('&').forEach(p => {
          var [k,v] = p.split('=');
          m.push([k, v]);
        });
        this.bindings = m;

        // Map of key->start pos bindings, is updated as bindings are consumed.
        var ps = {};

        // Update frame bindings
        for ( var i = 0 ; i < this.frames.length ; i++ ) {
          var frame = this.frames[i];

          for ( var key in frame ) {
            var slot  = frame[key];
            var value = this.get(key, ps);
            if ( value !== undefined ) slot.set(value);
          }
        }
      }
    }
  ],

  methods: [
    function get(k, ps /* map of key->start pos bindings */) {
      var start = ps[k] || 0;
      for ( var i = start ; i < this.bindings.length ; i++ ) {
        if ( this.bindings[i][0] === k ) {
          ps[k] = start + 1;
          return this.bindings[i][1];
        }
      }
      return undefined;
    },

    function init() {
//      this.str = this.toString();
    },

    function bind(memorable) {
      /** Bind a memorable object to the memento by:
       *    1. setting memorable property values to available bindings
       *    2. listening for property updates
       */
      var bindings = {};

      memorable.cls_.getAxiomsByClass(foam.core.Property).filter(p => p.memorable).forEach(p => {
        console.log('**** MEMORABLE ', p.name);
        var slot = memorable.slot(p.name)
        bindings[p.shortName || p.name] = slot;
        memorable.onDetach(memorable.sub(this.update));
      });

      var l = this.bindings.length;
      memorable.onDetach(() => this.frames.length = l);
      this.frames.push(bindings);
    },

    function toString() {
      var str = '';

      for ( var i = 0 ; i < this.frames.length ; i++ ) {
        var frame = this.frames[i];
        for ( var key in frame) {
          var slot = frame[key];
          if ( slot.get() ) {
            if ( str ) str = str + '&';
            str = str + key + '=' + slot.get();
          }
        }
      }

      return str;
    }
  ],

  listeners: [
    {
      name: 'update',
      isMerged: true,
      mergeDelay: 160,
      code: function() {
        this.str = this.toString();
      }
    }
  ]
});


foam.CLASS({
  name: 'MemorablePropertyRefinement',
  refines: 'foam.core.Property',

  properties: [
    {
      class: 'Boolean',
      name: 'memorable'
    }
  ]
});


foam.CLASS({
  name: 'Memorable',

  properties: [
    {
      name: 'memento_',
      hidden: true,
      factory: function() { return this.__context__.memento_ || Memento.create(); },
      initObject: function(o) {
        o.memento_.bind(o);
      }
    }
  ]
});


foam.CLASS({
  name: 'MementoTest',
  extends: 'foam.u2.Controller',

  mixins: [
    'Memorable'
  ],

  properties: [
    {
      name: 'skip',
      shortName: 's',
      value: 10,
      memorable: true
    },
    {
      class: 'StringArray',
      name: 'columns',
      memorable: true,
      sticky: true
    },
    {
      name: 'limit',
      memorable: true
    },
    {
      name: 'query',
      shortName: 'q',
      memorable: true
    },
    {
      name: 'abc'
    }
  ],

  methods: [
    function render() {
      // this.subMemento.str = 'q=something';
      this.startContext({data: this.memento_}).add(this.memento_.STR).endContext();
      this.br();
      this.add(this.memento_.str$);
      this.br();
      this.add('skip: ', this.SKIP);
      this.br();
      this.add('limit: ', this.LIMIT);
      this.br();
      this.add('query: ', this.QUERY);
      this.br();
    }
  ]
});
