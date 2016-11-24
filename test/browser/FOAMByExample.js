/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Foam By Example */
var FBE = [
  {
    name: 'Test Class',
    description: 'Define a new class with foam.CLASS',
    code: function() {
      foam.CLASS({
        name: 'Test',
        properties: [
          // short-form
          'a',
          // long-form
          {
            name: 'b'
          }
        ],
        methods: [
          // short-form
          function f1() { return 1; },
          // long-form
          {
            name: 'f2',
            code: function() { return 2; }
          }
        ]
      });
    },
    postTestCode: function() {
      expect(Test).not.toBeUndefined();
    }
  },
  {
    name: 'Test describe',
    description: 'Use class.describe() to learn about the class',
    dependencies: [ 'Test Class' ],
    code: function() {
      Test.describe();
    },
    postTestCode: function() {
    }
  },
  {
    name: 'Test create',
    description: 'Create an instance of Test',
    dependencies: [ 'Test Class' ],
    code: function() {
      var o = Test.create();
      console.log("Class: ", o);
      console.log('a: ' + o.a + ', b: ' + o.b);
    },
    postTestCode: function() {
      expect(o.a).toBeUndefined();
      expect(o.b).toBeUndefined();
    }
  },
  {
    name: 'Test create with values',
    description: 'Create an instance with a map argument to initialize properties',
    dependencies: [ 'Test Class' ],
    code: function() {
      var o = Test.create({ a: 3, b: 'hello' });
      console.log("Class: ", o);
      console.log('a: ' + o.a + ', b: ' + o.b);
    },
    postTestCode: function() {
      expect(o.a).toEqual(3);
      expect(o.b).toEqual('hello');
    }
  },
  {
    name: 'Class reference',
    description: 'Objects have a reference to their class in .cls_',
    dependencies: [ 'Test create with values' ],
    code: function() {
      console.log("Class object:", o.cls_);
    },
    postTestCode: function() {
      expect(o.cls_.name).toEqual('Test');
    }
  },
  {
    name: 'Test isInstance',
    description: 'Test Class membership with Class.isInstance()',
    dependencies: [ 'Test create with values' ],
    code: function() {
      console.log('Test.isInstance(o)?', Test.isInstance(o));
      console.log('Test.isInstance("foo")?', Test.isInstance("Test"));
    },
    postTestCode: function() {
      expect(Test.isInstance(o)).toBe(true);
      expect(Test.isInstance("Test")).toBe(false);
    }
  },
  {
    name: 'Test Methods',
    description: 'Call Methods on the Test instance',
    dependencies: [ 'Test create with values' ],
    code: function() {
      console.log("Methods return: ", o.f1(), o.f2());
    },
    postTestCode: function() {
      expect(o.f1()).toEqual(1);
      expect(o.f2()).toEqual(2);
    }
  },
  {
    name: 'Update Properties',
    description: 'Properties accept value changes as normal',
    dependencies: [ 'Test create with values' ],
    code: function() {
      o.a++;
      o.b = 'bye';
      console.log('New values: a: ' + o.a + ', b: ' + o.b);
    },
    postTestCode: function() {
      expect(o.a).toEqual(4);
      expect(o.b).toEqual('bye');
    }
  },
  {
    name: 'Test copyFrom',
    description: 'Multiple properties can be updated at once using copyFrom()',
    dependencies: [ 'Test create' ],
    code: function() {
      o.copyFrom({a: 42, b: 'rosebud'});
      console.log('New values: a: ' + o.a + ', b: ' + o.b);
    },
    postTestCode: function() {
      expect(o.a).toEqual(42);
      expect(o.b).toEqual('rosebud');
    }
  },
  {
    name: 'Test toString',
    description: 'Call toString on an object',
    dependencies: [ 'Test create with values' ],
    code: function() {
      console.log("toString:", o.toString());
    },
    postTestCode: function() {
      expect(o.toString()).toEqual('Test');
    }
  },
  {
    name: 'Describe instance',
    description: 'Call describe() on an object to see its Property values',
    dependencies: [ 'Test create with values' ],
    code: function() {
      o.describe();
    },
    postTestCode: function() {
    }
  },
  {
    name: 'Properties and Methods are types of Axioms',
    description: 'Get an array of all Axioms belonging to a Class by calling getAxioms',
    dependencies: [ 'Test Class' ],
    code: function() {
      Test.getAxioms().forEach(function(a) {
        console.log(a.cls_ && a.cls_.name, a.name);
      });
    },
    postTestCode: function() {
      // TODO: improve this, maybe search for some that should be present
      expect(Test.getAxioms().length).toBeGreaterThan(4);
    }
  },
  {
    name: 'Test getAxiomByName',
    description: 'Find an Axiom for a class using getAxiomByName',
    dependencies: [ 'Test Class' ],
    code: function() {
      var a = Test.getAxiomByName('a');
      console.log(a.cls_.name, a.name);
    },
    postTestCode: function() {
    }
  },
  {
    name: 'Test getAxiomsByClass',
    description: 'Find all Axioms of a particular class using getAxiomsByClass',
    dependencies: [ 'Test Class' ],
    code: function() {
      Test.getAxiomsByClass(foam.core.Method).forEach(function(a) {
        console.log(a.cls_ && a.cls_.name, a.name);
      });
    },
    postTestCode: function() {
    }
  },
  {
    name: 'Test Property constants',
    description: 'Properties are defined on the class as constants',
    dependencies: [ ],
    code: function() {
      console.log("Method CODE property constant:", foam.core.Method.CODE);
      foam.core.Method.CODE.describe();
    },
    postTestCode: function() {
      expect(foam.core.Method.CODE.name).toEqual("code");
    }
  },
  {
    name: 'Property mapping',
    description: 'Property constants contain map functions',
    dependencies: [ 'Test Class' ],
    code: function() {
      // foam.core.Method.NAME.f(obj) returns obj.name
      console.log("Method names in Test:",
        Test
          .getAxiomsByClass(foam.core.Method)
          .map(foam.core.Method.NAME.f)
          .join(', ')
      );
    },
    postTestCode: function() {
      expect(foam.core.Method.NAME.f).not.toBeUndefined();
    }
  },
  {
    name: 'Property comparators',
    description: 'Property constants contain comparators',
    dependencies: [ 'Test Class' ],
    code: function() {
      // foam.core.Method.NAME.compare is a compare function
      // that properly compares values of NAME.
      console.log("Method names in Test, sorted:",
        Test
          .getAxiomsByClass(foam.core.Method)
          .sort(foam.core.Method.NAME.compare)
          .map(foam.core.Method.NAME.f)
          .join(', ')
      );
    },
    postTestCode: function() {
    }
  },
  {
    name: 'Test init',
    description: 'If a Class defineds an init() method, it\'s called when an object is created.',
    dependencies: [  ],
    code: function() {
      foam.CLASS({
        name: 'InitTest',
        properties: [ 'a' ],
        methods: [ function init() { this.a = 'just born!'; } ]
      });
      var o = InitTest.create();
      console.log("Initialized value:", o.a);
    },
    postTestCode: function() {
      expect(o.a).toEqual('just born!');
    }
  },

  {
    name: '',
    description: '',
    dependencies: [  ],
    code: function() {
    },
    postTestCode: function() {
    }
  },

];

var reg = test.helpers.ExemplarRegistry.create(undefined, foam.__context__);
var FBE = FBE.map(function(def) {
  return test.helpers.Exemplar.create(def, reg);
});


// // Default Values can be defined for Properties
// foam.CLASS({
//   name: 'DefaultValueTest',
//   properties: [
//     { name: 'a', value: 42 },
//     { name: 'b', value: 'foo' },
//     { name: 'c' }
//   ]
// });
// var o = DefaultValueTest.create();
// log(o.a, o.b, o.c);

// // .hasOwnProperty() tells you if a Property has been set
// log(o.hasOwnProperty('a'), o.hasOwnProperty('b'), o.hasOwnProperty('c'));
// o.a = 99;
// o.b = 'bar';
// o.c = 'test';
// log(o.hasOwnProperty('a'), o.hasOwnProperty('b'), o.hasOwnProperty('c'));

// // .clearProperty() reverts a value back to its value
// log(o.hasOwnProperty('a'), o.a);
// o.clearProperty('a');
// log(o.hasOwnProperty('a'), o.a);

// // factories
// // Properties can have factory methods which create their initial value
// // when they are first accessed.
// foam.CLASS({
//   name: 'FactoryTest',
//   properties: [
//     {
//       name: 'a',
//       factory: function() { log('creating value'); return 42; }
//     }
//   ]
// });
// var o = FactoryTest.create();
// log(o.a);
// // Factory not called value accessed second time:
// log(o.a);

// // Factory not called if value supplied in constructor
// var o = FactoryTest.create({a: 42});
// log(o.a);

// // Factory not called if value set before first access
// var o = FactoryTest.create();
// o.a = 42;
// log(o.a);

// // Factory called again if clearProperty() called:
// var o = FactoryTest.create();
// log(o.a);
// o.clearProperty('a');
// log(o.a);

// // getters and setters
// // Properties can define their own getter and setter functions.
// foam.CLASS({
//   name: 'GetterSetter',
//   properties: [
//     'radius',
//     {
//       name: 'diameter',
//       getter: function() { return this.radius * 2; },
//       setter: function(diameter) { this.radius = diameter / 2; }
//     }
//   ]
// });
// var o = GetterSetter.create();
// o.diameter = 10;
// log(o.radius, o.diameter);
// o.radius = 10;
// log(o.radius, o.diameter);

// // Properties can specify an 'adapt' function which is called whenever
// // the properties' value is updated. It's the adapt function's responsibility
// // to convert or coerce the type if necessary.
// // Both the previous value of the property and the proposed new value are
// // passed to adapt.  Adapt returns the desired new value, which may be different
// // from the newValue it's provided.
// foam.CLASS({
//   name: 'AdaptTest',
//   properties: [
//     {
//       name: 'flag',
//       adapt: function(oldValue, newValue) {
//         log('adapt ', oldValue, newValue);
//         // adapt to a boolean
//         return !! newValue;
//       }
//     }
//   ]
// });
// var o = AdaptTest.create({flag:true});
// o.flag = null;
// log(o.flag);

// // Properties can specify a 'preSet' function which is called whenever
// // the properties' value is updated, just after 'adpat', if present.
// // Both the previous value of the property and the proposed new value are
// // passed to preSet.  PreSet returns the desired new value, which may be different
// // from the newValue it's provided.
// foam.CLASS({
//   name: 'PreSetTest',
//   properties: [
//     {
//       name: 'a',
//       preSet: function(oldValue, newValue) {
//         log('preSet p1');
//         return 'Mr. ' + newValue;
//       }
//     }
//   ]
// });
// var o = PreSetTest.create({a: 'Smith'});
// o.a = 'Jones';
// log(o.a);

// // Properties can specify a 'postSet' function which is called after
// // the properties' value is updated.  PostSet has no return value.
// foam.CLASS({
//   name: 'PostSetTest',
//   properties: [
//     {
//       name: 'a',
//       postSet: function(oldValue, newValue) {
//         log('postSet', oldValue, newValue);
//       }
//     }
//   ]
// });
// var o = PostSetTest.create({a: 'Smith'});
// o.a = 'Jones';
// o.a = 'Green';

// // Properties can define 'adapt', 'preSet', and 'postSet' all at once.
// foam.CLASS({
//   name: 'AdaptPrePostTest',
//   properties: [
//     {
//       name: 'a',
//       adapt: function(oldValue, newValue) {
//         log('adapt: ', oldValue, newValue);
//         return newValue + 1;
//       },
//       preSet: function(oldValue, newValue) {
//         log('preSet: ', oldValue, newValue);
//         return newValue + 1;
//       },
//       postSet: function(oldValue, newValue) {
//         log('postSet: ', oldValue, newValue);
//       }
//     }
//   ]
// });
// var o = AdaptPrePostTest.create();
// o.a = 1;
// o.a = 10;

// // Classes can also define Constnts.
// foam.CLASS({
//   name: 'ConstantTest',
//   constants: {
//     MEANING_OF_LIFE: 42,
//     FAVOURITE_COLOR: 'green'
//   }
// });
// var o = ConstantTest.create();
// log(o.MEANING_OF_LIFE, o.FAVOURITE_COLOR);

// // Constants can also be accessed from the Class
// log(ConstantTest.MEANING_OF_LIFE, ConstantTest.FAVOURITE_COLOR);
// log(o.cls_.MEANING_OF_LIFE, o.cls_.FAVOURITE_COLOR);

// // Constants are constant
// o.MEANING_OF_LIFE = 43;
// log(o.MEANING_OF_LIFE);

// // Classes can be subclassed with 'extends:'.
// // Methods in subclasses can override methods from ancestor classes, as is
// // done below with toString().  Employee.toString() calls its parent classes
// // toString() method by calling 'this.SUPER()'.
// foam.CLASS({
//   name: 'Person',
//   properties: [ 'name', 'sex' ],
//   methods: [
//     function toString() { return this.name + ' ' + this.sex; }
//   ]
// });
// foam.CLASS({
//   name: 'Employee',
//   extends: 'Person',
//   properties: [ 'salary' ],
//   methods: [
//     function toString() { return this.SUPER() + ' ' + this.salary; }
//   ]
// });
// var p = Person.create({name: 'John', sex: 'M'});
// log(p.toString());
// var e = Employee.create({name: 'Jane', sex: 'F', salary: 50000});
// log(e.toString());

// // Test if one class is a sub-class of another:
// log(Person.isSubClass(Employee), Employee.isSubClass(Person));

// // A Class is considered a sub-class of itself:
// log(Person.isSubClass(Person));

// // FObject is the root class of all other classes:
// log(foam.core.FObject.isSubClass(Employee), foam.core.FObject.isSubClass(Person));

// // isSubClass() isn't confused by classes with the same name in different packages
// foam.CLASS({
//   package: 'com.acme.package',
//   name: 'Person'
// });
// log(com.acme.package.Person.isSubClass(Person));
// log(Person.isSubClass(com.acme.package.Person));

// // isSubClass() works for interfaces
// foam.CLASS({
//   package: 'test',
//   name: 'ThingI',
//   methods: [ function foo() { log('foo'); } ]
// });
// foam.CLASS({
//   package: 'test',
//   name: 'C1',
//   implements: [ 'test.ThingI' ]
// });
// log(test.ThingI.isSubClass(test.C1));

// // isSubClass() works for sub-interfaces
// foam.CLASS({
//   package: 'test',
//   name: 'Thing2I',
//   implements: [ 'test.ThingI' ]
// });
// foam.CLASS({
//   package: 'test',
//   name: 'Thing3I',
//   implements: [ 'test.ThingI' ]
// });
// foam.CLASS({
//   package: 'test',
//   name: 'C2',
//   implements: [ 'test.Thing2I' ]
// });
// var o = test.C2.create();
// o.foo();
// log(test.ThingI.isSubClass(test.C2));
// log(test.Thing2I.isSubClass(test.C2));
// log(test.Thing3I.isSubClass(test.C2));

// // Larger package and imports/exports demo.
// foam.CLASS({
//   package: 'demo.bank',
//   name: 'Account',
//   imports: [ 'reportDeposit' ],
//   properties: [
//     { name: 'id'      },
//     { name: 'status'  },
//     { name: 'balance', value: 0 }
//   ],
//   methods: [
//     {
//       name: "setStatus",
//       code: function (status) {
//         this.status = status;
//       }
//     },
//     {
//       name: "deposit",
//       code: function (amount) {
//         this.balance += amount;
//         this.reportDeposit(this.id, amount, this.balance);
//         console.log('Bank: ', this.__context__.Bank);
//         return this.balance;
//       }
//     },
//     {
//       name: "withdraw",
//       code: function (amount) {
//         this.balance -= amount;
//         return this.balance;
//       }
//     }
//   ]
// });
// foam.CLASS({
//   package: 'demo.bank',
//   name: 'SavingsAccount',
//   extends: 'demo.bank.Account',
//   methods: [
//     {
//       name: "withdraw",
//       code: function (amount) {
//         // charge a fee
//         this.balance -= 0.05;
//         return this.SUPER(amount);
//       }
//     }
//   ]
// });
// foam.CLASS({
//   package: 'demo.bank',
//   name: 'AccountTester',
//   requires: [
//     'demo.bank.Account as A',
//     'demo.bank.SavingsAccount'
//   ],
//   imports: [ 'log as l' ],
//   exports: [
//     'reportDeposit',
//     'as Bank' // exports 'this'
//   ],
//   methods: [
//     function reportDeposit(id, amount, bal) {
//       this.l('Deposit: ', id, amount, bal);
//     },
//     function test() {
//       var a = this.A.create({id: 42});
//       a.setStatus(true);
//       a.deposit(100);
//       a.withdraw(10);
//       a.describe();
//       var s = this.SavingsAccount.create({id: 43});
//       s.setStatus(true);
//       s.deposit(100);
//       s.withdraw(10);
//       s.describe();
//     }
//   ]
// });
// var a = demo.bank.AccountTester.create(null);
// a.test();

// // In addition to being extended, a Class can also be refined.
// // Refinement upgrades the existing class rather than create a
// // new sub-class. In the following example we add 'salary' to
// // the person class, rather than creating a new Employee sub-class.
// foam.CLASS({
//   name: 'Person',
//   properties: [ 'name', 'sex' ],
//   methods: [
//     function toString() { return this.name + ' ' + this.sex; }
//   ]
// });
// var oldPerson = Person.create({name: 'John', sex: 'M'});
// log(oldPerson.toString());
// foam.CLASS({
//   refines: 'Person',
//   properties: [ { class: 'Float', name: 'salary', value: 0 } ],
//   methods: [
//     function toString() { return this.name + ' ' + this.sex + ' ' + this.salary; }
//   ]
// });
// Person.describe();
// var e = Person.create({name: 'Jane', sex: 'F', salary: 50000});
// log(e.toString());
// log(oldPerson.toString());

// // Refine a Property
// log(Person.SALARY.cls_.name);
// foam.CLASS({
//   refines: 'Person',
//   properties: [ { name: 'salary', value: 30000 } ]
// });
// log(Person.SALARY.cls_.name);
// var o = Person.create({name:'John'});
// log(o.salary);

// // Currently unsupported and unlikely to be supported.
// // Refine a Property Class
// foam.CLASS({ name: 'Salary', extends: 'Float' });
// foam.CLASS({ name: 'Emp', properties: [ { class: 'Salary', name: 'salary' } ] });
// foam.CLASS({ refines: 'Salary', properties: [ {name: 'value', value: 30000} ]});
// log(Emp.create().salary);

// // Refine foam.core Property Class
// foam.CLASS({ name: 'Emp2', properties: [ { class: 'Float', name: 'salary' } ] });
// foam.CLASS({ refines: 'Float', properties: [ [ 'javaClass', 'Float' ] ]});
// log(Emp2.SALARY.javaClass);

// // Currently unsupported and unlikely to be supported.
// // Refine a SuperProperty Class
// foam.CLASS({ name: 'SuperClass', properties: [ 'p1' ]});
// foam.CLASS({ name: 'SubClass', extends: 'SuperClass', properties: [ 'p1' ]});
// foam.CLASS({ refines: 'SuperClass', properties: [ { name: 'p1', value: 42 } ]});
// log('super: ', SuperClass.create().p1, 'sub: ', SubClass.create().p1);

// // Currently unsupported and unlikely to be supported.
// // Refine a SuperProperty Class
// foam.CLASS({ name: 'SuperClass', properties: [ 'p1' ]});
// foam.CLASS({ name: 'MidClass', extends: 'SuperClass' });
// foam.CLASS({ name: 'SubClass', extends: 'MidClass', properties: [ 'p1' ]});
// foam.CLASS({ refines: 'SuperClass', properties: [ { name: 'p1', value: 42 } ]});
// log('super: ', SuperClass.create().p1, 'mid: ', MidClass.create().p1, 'sub: ', SubClass.create().p1);

// // TODO: BooleanProperty

// // TODO: IntProperty

// // TODO: StringProperty

// // TODO: ArrayProperty

// // Listeners are pre-bound Methods, suitable for use as callbacks (DOM, or otherwise).
// foam.CLASS({
//   name: 'ListenerTest',
//   properties: [ 'name' ],
//   methods: [ function m1() { console.log('m1', this.name); } ],
//   listeners: [ function l1() { console.log('l1', this.name); } ]
// });
// var o = ListenerTest.create({name: 'Steve'});
// // When called as methods, the same as Methods.
// log(o.m1(), o.l1());

// // But when called as functions, the method forgets its 'self' and doesn't work,
// // but the listener does.
// var m = o.m1, l = o.l1;
// log(m(), l());

// // It's an error to make a listener both isMerged and isFramed.
// foam.CLASS({
//   name: 'MergedAndFramedTest',
//   listeners: [
//     {
//       name: 'l',
//       isMerged: true,
//       isFramed: true,
//       code: function() { log('listener'); }
//     }
//   ]
// });

// //:NOTEST
// // If a listener has isMerged: true, it will merge multiple
// // events received withing 'mergeDelay' milliseconds into
// // a single event. 'mergeDelay' is optional and defaults to
// // 16ms.
// foam.CLASS({
//   name: 'MergedListenerTest',
//   listeners: [
//     {
//       name: 'notMerged',
//       isMerged: false, // the default
//       code: function() { log('not merged listener'); }
//     },
//     {
//       name: 'merged',
//       isMerged: true,
//       mergeDelay: 1, // 1ms
//       code: function() { log('merged listener'); }
//     }
//   ]
// });
// var o = MergedListenerTest.create();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();
// o.merged(); o.notMerged();

// //:NOTEST
// // If a listener has isFramed: true, it will merge multiple
// // events received withing one animation frame to a single
// // event delivered at the next animationFrame.
// foam.CLASS({
//   name: 'FramedListenerTest',
//   listeners: [
//     {
//       name: 'framed',
//       isFramed: true,
//       code: function() { log('framed listener'); }
//     }
//   ]
// });
// var o = FramedListenerTest.create();
// o.framed();
// o.framed();
// o.framed();
// o.framed();

// //:NOTEST
// // You can decorate a listener with delayed() to delay the
// // execution of the listener. Unlike merged(), which also delays
// // results, delayed() does not merge results.
// var l1 = foam.__context__.delayed(function() { console.log('l1'); }, 10);
// var l2 = foam.__context__.delayed(function() { console.log('l2'); }, 5);
// l1();
// l2();
// l1();
// l2();

// //:NOTEST
// // async(l) is the same as delayed(l, 0)
// var d1 = foam.__context__.async(function() { console.log('d1'); });
// var d2 = function() { console.log('d2'); };
// d1();
// d2();
// d1();
// d2();

// // Listeners, like Methods, have SUPER support.
// foam.CLASS({
//   name: 'Alarm',
//   listeners: [
//     function alarm() { console.log('alarm'); }
//   ]
// });
// foam.CLASS({
//   name: 'LongAlarm',
//   extends: 'Alarm',
//   listeners: [
//     function alarm() { console.log('LongAlarm:'); this.SUPER(); this.SUPER(); this.SUPER(); }
//   ]
// });
// Alarm.create().alarm();
// LongAlarm.create().alarm();

// // Actions are methods which have extra information to make it easier
// // to call them from GUI's. Extra information includes things like:
// // a label, speech label, functions to determine if the action is currently
// // available and enabled, user help text, etc.
// foam.CLASS({
//   name: 'ActionTest',
//   properties: [ 'enabled', 'available' ],
//   actions: [
//     function shortForm() { log('short action'); },
//     {
//       name: 'longForm',
//       isAvailable: function() { return this.available; },
//       isEnabled: function() { return this.enabled; },
//       code: function() { log('long action'); }
//     }
//   ]
// });
// var o = ActionTest.create();
// o.shortForm();
// o.longForm(); // Won't be called because is not enabled or available yet
// log(o.enabled = true);
// o.longForm(); // Won't be called because is not available yet
// log(o.available = true);
// o.longForm();

// // In addition to class-inheritance, FOAM also supports
// // interfaces, which are a form of multiple-inheritance which
// // copy Axioms from another model.
// foam.CLASS({
//   name: 'SampleI',
//   properties: [ 't1', 't2', 't3' ],
//   methods: [
//     function tfoo() { console.log('ffoo'); },
//     function tbar() { console.log('tbar'); }
//   ]
// });
// foam.CLASS({
//   name: 'ImplementsTest',
//   implements: ['SampleI'],
//   properties: [ 'p1', 'p2', 'p3' ],
//   methods: [
//     function foo() { console.log('foo'); },
//     function bar() { console.log('bar'); }
//   ]
// });
// ImplementsTest.describe();
// var tt = ImplementsTest.create({p1:1, t1:2});
// tt.describe();
// tt.tfoo(); // From SampleI
// tt.foo();

// // Unlike regular inheritance with extends:, classes
// // can implement: from multiple sources.
// foam.CLASS({
//   name: 'Sample2I',
//   properties: [ 'tb1', 'tb2', 'tb3' ],
//   methods: [
//     function tbfoo() { console.log('ffoo'); },
//     function tbbar() { console.log('tbar'); }
//   ]
// });
// foam.CLASS({
//   name: 'ImplementsTest2',
//   implements: ['SampleI', 'Sample2I']
// });
// ImplementsTest2.describe();

// // FOAM also has Property-Inheritance.
// // Test that a sub-class Property inherits its parent Property's class
// foam.CLASS({
//   name: 'PropertyInheritA',
//   properties: [ {class: 'Boolean', name: 'sameName'} ]
// });
// foam.CLASS({
//   name: 'PropertyInheritB',
//   extends: 'PropertyInheritA',
//   properties: [ 'sameName' ]
// });
// log(PropertyInheritA.SAME_NAME.cls_.id, PropertyInheritB.SAME_NAME.cls_.id);

// // Classes can have inner-Classes.
// foam.CLASS({
//   name: 'InnerClassTest',
//   classes: [
//     { name: 'InnerClass1', properties: ['a', 'b'] },
//     { name: 'InnerClass2', properties: ['x', 'y'] }
//   ],
//   methods: [
//     function init() {
//       var ic1 = this.InnerClass1.create({a:1, b:2});
//       var ic2 = this.InnerClass2.create({x:5, y:10});
//       log(ic1.a, ic1.b, ic2.x, ic2.y);
//     }
//   ]
// });
// InnerClassTest.create();

// // Inner-classes can also be accessed from the outer-class
// InnerClassTest.InnerClass1.describe();

// // Inner-classes do not appear in the global namespace
// log(! global.InnerClass1);

// // Similar to Inner-classes, there's also Inner-enums
// foam.CLASS({
//   name: 'InnerEnumTest',
//   enums: [
//     { name: 'InnerEnum', values: [
//     { name: 'OPEN',   label: 'Open'   },
//     { name: 'CLOSED', label: 'Closed' }
//     ] }
//   ],
//   methods: [
//     function init() {
//       log(this.InnerEnum.OPEN, this.InnerEnum.CLOSED)
//     }
//   ]
// });
// InnerEnumTest.create();

// // Inner-enums can also be accessed from the outer-class
// InnerEnumTest.InnerEnum.describe();

// // Inner-enums do not appear in the global namespace
// log(! global.InnerEnum);

// // Objects support pub() for pubing events,
// // and sub() for listening for pubed events.
// foam.CLASS({
//   name: 'PubSubTest'
// });
// var o = PubSubTest.create();
// // Install a listener that listens to all events
// o.sub(function() { console.log('global listener: ', [].join.call(arguments, ' ')); });
// o.sub('alarm', function() { console.log('alarm: ', [].join.call(arguments, ' ')); });
// o.pub('alarm', 'on');
// o.pub('lifecycle', 'loaded');

// // Test publishing with many args
// o.pub(1);
// o.pub(1,2);
// o.pub(1,2,3);
// o.pub(1,2,3,4);
// o.pub(1,2,3,4,5);
// o.pub(1,2,3,4,5,6);
// o.pub(1,2,3,4,5,6,7);
// o.pub(1,2,3,4,5,6,7,8);
// o.pub(1,2,3,4,5,6,7,8,9);
// o.pub(1,2,3,4,5,6,7,8,9,10);
// o.pub(1,2,3,4,5,6,7,8,9,10,11);

// // A Class can declare 'Topics' that it publishes events for.
// foam.CLASS({
//   name: 'TopicTest',
//   topics: [ 'alarm' ]
// });
// var o = TopicTest.create();
// o.sub('alarm', function(_, __, state) { console.log('alarm: ', state); });
// // The next line uses the Topic and is slightly shorter than the equivalent above.
// o.alarm.sub(function(_, __, state) { console.log('alarm (topic): ', state); });
// o.alarm.pub('on');
// o.pub('alarm', 'off');

// // Objects implicitly pub events on the 'propertyChange' topic when
// // property values change.
// foam.CLASS({
//   name: 'PropertyChangeTest',
//   properties: [ 'a', 'b' ]
// });
// o = PropertyChangeTest.create();
// // Listen for all propertyChange events:
// o.propertyChange.sub(function(sub, p, name, dyn) { console.log('propertyChange: ', p, name, dyn.getPrev(), dyn.get()); });
// // Listen for only changes to the 'a' Property:
// o.propertyChange.sub('a', function(sub, p, name, dyn) { console.log('propertyChange.a: ', p, name, dyn.getPrev(), dyn.get()); });
// o.a = 42;
// o.b = 'bar';
// o.a++;

// // There are three ways to unsubscribe a listener
// // 1. Call .destroy() on the Destroyable that sub() returns
// var sub = o.sub(l);
// o.pub('fire');
// sub.destroy();
// o.pub("fire again, but nobody's listenering");

// // 2. Destroy the subscription, which is supplied to the listener
// var l = function(sub) {
//   sub.destroy();
//   console.log.apply(console.log, arguments);
// };
// o.sub(l);
// o.pub('fire');
// o.pub("fire again, but nobody's listenering");

// // 3. If you only want to receive the first event, decorate your
// // listener with foam.events.oneTime() and it will cancel the subscription
// // when it receives the first event.
// o.sub(foam.events.oneTime(function() { console.log.apply(console.log, arguments); }));
// o.pub('fire');
// o.pub("fire again, but nobody's listenering");

// // Slots are like Object-Oriented pointers.
// // A property's slot is accessed as 'name'$.
// // get() is used to dereference the value of a slot
// var p = Person.create({name: 'Bob'});
// var dyn = p.name$;
// log(dyn.get());

// // set() is used to set a Slot's value:
// dyn.set('John');
// log(p.name, dyn.get());

// // Calling obj.slot('name') is the same as obj.name$.
// var p = Person.create({name: 'Bob'});
// var dyn = p.slot('name');
// log(dyn.get());
// dyn.set('John');
// log(dyn.get());

// // Nested slots
// foam.CLASS({ name: 'Holder', properties: [ 'data' ] });
// var p1 = Person.create({name: 'John'});
// var p2 = Person.create({name: 'Paul'});
// var h = Holder.create({data: p1});
// var s = h.data$.dot('name');
// s.sub(function() { console.log('change: ', arguments, h.data.name); });
// log(s.get());
// s.set('George');
// log(p1.name);
// p1.name = 'Ringo';
// log('Setting to p2');
// h.data = p2;
// log(s.get());
// s.set('George');
// log(p2.name);
// p2.name = 'Ringo';

// // Nested subscription
// // Subscribe to the value of the slot data$, removing the
// // subscription and resubscribing to the new value of data$
// // if it changes.
// foam.CLASS({ name: 'Holder', properties: [ 'data' ] });
// var p1 = Person.create({name: 'John'});
// var p2 = Person.create({name: 'Paul'});
// var h = Holder.create({data: p1});
// h.data$.valueSub(function(e) { console.log('sub change: ', e.src.name, Array.from(arguments).join(' ')); });
// p1.name = 'Peter';
// p2.name = 'Mary';
// h.data = p2;
// p1.name = 'James';
// p2.name = 'Ringo';
// p2.pub('test','event');

// // Two-Way Data-Binding
// // Slots can be assigned, causing two values to be
// // bound to the same value.
// var p1 = Person.create(), p2 = Person.create();
// p1.name$ = p2.name$;
// p1.name = 'John';
// log(p1.name, p2.name);
// p2.name = 'Steve';
// log(p1.name, p2.name);

// // Another way to link two Slots is to call .linkFrom() on one of them.
// var p1 = Person.create({name:'p1'}), p2 = Person.create({name:'p2'});
// var d = p1.name$.linkFrom(p2.name$);
// p1.name = 'John';
// log(p1.name, p2.name);

// // But this style of link can be broken by calling .destroy()
// // on the object return from .linkFrom/To().
// d.destroy();
// p2.name = 'Steve';
// log(p1.name, p2.name);

// // linkTo() is the same as linkFrom(), except that the initial value
// // is taken from 'this' instead of the other object.
// var p1 = Person.create({name:'p1'}), p2 = Person.create({name:'p2'});
// var d = p1.name$.linkTo(p2.name$);
// p1.name = 'John';
// log(p1.name, p2.name);

// // Two values can be linked through a relationship,
// // which provides functions to adapt between the two values.
// foam.CLASS({
//   name: 'Temperature',
//   properties: [
//     { class: 'Float', name: 'f' },
//     { class: 'Float', name: 'c' }
//   ],
//   methods: [
//     function init() {
//       this.f$.relateTo(
//         this.c$,
//         function c2f(f) { log('f', f); return 9/5 * f + 32; },
//         function f2c(c) { log('fp', c); return 5/9 * ( c - 32 ); });
//     }
//   ]
// });
// var t = Temperature.create();
// log(t.stringify());
// t.f = 100;
// log(t.stringify());
// t.c = 100;
// log(t.stringify());

// // One-Way Data-Binding
// // Calling .linkFrom()/.linkTo() creates a two-way data-binding, meaning a change in either
// // value is reflected in the other.  But FOAM supports one-way data-binding as well.
// // To do this, use the .follow() method.
// var d = p1.name$.follow(p2.name$);
// p2.name = 'Ringo'; // Will update p1 and p2
// p2.name = 'Paul'; // Will update p1 and p2
// log(p1.name, p2.name);
// p1.name = 'George'; // Will only update p1
// log(p1.name, p2.name);
// d.destroy();

// // Follow copies the initial value.
// p1 = Person.create();
// p2 = Person.create({name:'John'});
// p1.name$.follow(p2.name$);
// log(p1.name, p2.name);

// // One-Way Data-Binding, with Map function (mapFrom)
// var d = p1.name$.mapFrom(p2.name$, function(n) {
//   return "Mr. " + n;
// });
// p1.name$.clear();
// p2.name$.clear();
// p2.name = 'Ringo'; // Will update p1 and p2
// log(p1.name, p2.name);
// p1.name = 'George'; // Will only update p1
// log(p1.name, p2.name);
// d.destroy();

// // One-Way Data-Binding, with Map function (mapTo)
// var d = p2.name$.mapTo(p1.name$, function(n) {
//   return "Mr. " + n;
// });
// p1.name$.clear();
// p2.name$.clear();
// p2.name = 'Ringo'; // Will update p1 and p2
// log(p1.name, p2.name);
// p1.name = 'George'; // Will only update p1
// log(p1.name, p2.name);
// d.destroy();

// // Slots also let you check if the value is defined by calling isDefined().
// // Calling obj.name$.isDefined() is equivalent to obj.hasOwnProperty('name');
// foam.CLASS({name: 'IsDefinedTest', properties: [ { name: 'a', value: 42 } ]});
// var o = IsDefinedTest.create();
// var dv = o.a$;
// log(dv.isDefined());
// dv.set(99);
// log(dv.isDefined());

// // You can reset a Slot to its default value by calling .clear().
// // Calling obj.name$.clear() is equivalent to obj.clearProperty('name');
// dv.clear();
// log(dv.get(), dv.isDefined());

// // ConstantSlot creates an immutable slot.
// var s = foam.core.ConstantSlot.create({value: 42});
// log(s.get());
// s.value = 66;
// s.set(66);
// log(s.get());

// // ExpressionSlot creates a Slot from a list of Slots
// // and a function which combines them into a new value.
// foam.CLASS({name: 'Person', properties: ['fname', 'lname']});
// var p = Person.create({fname: 'John', lname: 'Smith'});
// var e = foam.core.ExpressionSlot.create({
//   args: [ p.fname$, p.lname$],
//   code: function(f, l) { return f + ' ' + l; }
// });
// log(e.get());
// e.sub(log);
// p.fname = 'Steve';
// p.lname = 'Jones';
// log(e.get());

// // ExpressionSlot can also be supplied an object to work with, and then takes slots from function argument names.
// var p = foam.CLASS({name: 'Person', properties: [ 'f', 'l' ]}).create({f:'John', l: 'Smith'});
// var e = foam.core.ExpressionSlot.create({
//   obj: p,
//   code: function(f, l) { return f + ' ' + l; }
// });
// log(e.get());
// e.sub(log);
// p.f = 'Steve';
// p.l = 'Jones';
// log(e.get());

// // Destroy the ExpressionSlot to prevent further updates.
// e.destroy();
// p.fname = 'Steve';
// p.lname = 'Jones';

// // The same functionality of ExpressionSlot is built into Properties
// // with the 'expression' feature. Expression properties are invalidated
// // whenever of their listed source values change, but are only recalculated
// // when their value is accessed.
// foam.CLASS({
//   name: 'Person',
//   properties: [
//     'fname',
//     'lname',
//     {
//       name: 'name',
//       expression: function(fname, lname) { return fname + ' ' + lname; }
//     }
//   ]
// });
// var p = Person.create({fname: 'John', lname: 'Smith'});
// p.describe();
// p.sub(log);
// p.fname = 'Steve';
// log(p.fname, p.lname, ' = ', p.name);
// p.lname = 'Jones';
// log(p.fname, p.lname, ' = ', p.name);

// // Expression properties can also be explicitly set, at which point the
// // dynamic expression no longer holds.
// log(p.name, p.hasOwnProperty('name'));
// p.name = 'Kevin Greer';
// log(p.name, p.hasOwnProperty('name'));
// p.fname = 'Sebastian';
// log(p.fname, p.lname, ':', p.name);

// // Clearing a set expression property has it revert to its expression value.
// log(p.name, p.hasOwnProperty('name'));
// p.clearProperty('name');
// log(p.name, p.hasOwnProperty('name'));

// // Destroyables (objects with a destroy() method) or functions
// // can be registered to be called when an object is destroyed.
// var o = foam.core.FObject.create();
// var o2 = foam.core.FObject.create();
// o.onDestroy(function() { log('destroy 1'); });
// o2.onDestroy(function() { log('destroy 2'); });
// o.onDestroy(o2);
// o.destroy();

// // It doesn't hurt to try and destroy an object more than once.
// o.destroy();
// o.destroy();

// // If an Object is destroyed, it will unsubscribe from any
// // subscriptions which subsequently try to deliver events.
// var source = foam.core.FObject.create();
// var sink = foam.CLASS({
//   name: 'Sink',
//   listeners: [
//     function l() {
//       log('ping');
//     }
//   ]
// }).create();
// source.sub(sink.l);
// source.pub('ping');
// source.pub('ping');
// sink.destroy();
// source.pub('ping');

// // Model validation, extends and refines are mutually-exclusive
// foam.CLASS({
//   name: 'EandRTest',
//   extends: 'FObject',
//   refines: 'Model'
// });
// EandRTest.model_.validate();

// // Model validation, properties must have names
// foam.CLASS({
//   name: 'ValidationTest',
//   properties: [
//     { name: '' }
//   ]
// });
// ValidationTest.model_.validate();

// // Action validation, actions must have names
// foam.CLASS({
//   name: 'ActionNameValidation',
//   actions: [
//     { name: '', code: function() {} }
//   ]
// });
// ActionNameValidation.model_.validate();

// // Action validation, actions must have code
// foam.CLASS({
//   name: 'ActionCodeValidation',
//   actions: [
//     { name: 'test' }
//   ]
// });
// ActionCodeValidation.model_.validate();

// // Model validation, properties names must not end with '$'
// foam.CLASS({
//   name: 'DollarValidationTest',
//   properties: [
//     { name: 'name$' }
//   ]
// });
// DollarValidationTest.model_.validate();

// // Property constants musn't conflict
// foam.CLASS({
//   name: 'ConstantConflictTest',
//   properties: [ 'firstName', 'FirstName' ]
// });

// // Properties must not have the same name
// foam.CLASS({
//   name: 'AxiomConflict1',
//   properties: [ 'sameName', 'sameName' ]
// });
// AxiomConflict1.create();

// // Methods must not have the same name
// foam.CLASS({
//   name: 'AxiomConflict2',
//   methods: [ function sameName() {}, function sameName() {} ]
// });
// AxiomConflict2.create();

// // Axioms must not have the same name
// foam.CLASS({
//   name: 'AxiomConflict3',
//   properties: [ 'sameName' ],
//   methods: [ function sameName() {} ]
// });
// AxiomConflict3.create();

// // Error if attempt to change a Property to a non-Property
// foam.CLASS({
//   name: 'AxiomChangeSuper',
//   properties: [ 'sameName' ]
// });
// foam.CLASS({
//   name: 'AxiomChangeSub',
//   extends: 'AxiomChangeSuper',
//   methods: [ function sameName() {} ]
// });
// AxiomChangeSub.create();

// // Warn if an Axiom changes its class
// foam.CLASS({
//   name: 'AxiomChangeSuper2',
//   methods: [ function sameName() {} ]
// });
// foam.CLASS({
//   name: 'AxiomChangeSub2',
//   extends: 'AxiomChangeSuper2',
//   properties: [ 'sameName' ]
// });
// AxiomChangeSub2.create();

// // Property validation, factory and value
// foam.CLASS({
//   name: 'PropertyValidationTest',
//   properties: [
//     {
//       name: 't1',
//       setter: function() {},
//       adapt: function(_,v) { return v; },
//       preSet: function(_,v) { return v; },
//       postSet: function() {}
//     },
//     {
//       name: 't2',
//       getter: function() { return 42; },
//       factory: function() { return 42; },
//       expression: function() { return 42; },
//       value: 42
//     }
//   ]
// });
// PropertyValidationTest.model_.validate();

// // Required
// foam.CLASS({
//   name: 'ValidationTest',
//   properties: [
//     { name: 'test', required: true }
//   ]
// });
// var o = ValidationTest.create({test: '42'});
// o.validate();
// log('-');
// var o = ValidationTest.create();
// o.validate();

// // Unknown Properties, detect unknown Model and Property properties
// foam.CLASS({
//   name: 'ValidationTest',
//   unknown: 'foobar',
//   properties: [
//     { name: 'test', unknown: 'foobar' }
//   ]
// });

// // Contexts can be explicitly created with foam.createSubContext()
// // The second argument of createSubContext() is an optional name for the Context
// var Y1 = foam.createSubContext({key: 'value', fn: function() { console.log('here'); }}, 'SubContext');
// console.log(Y1.key, Y1.fn());

// // Sub-Contexts can be created from other Contexts.
// var Y2 = Y1.createSubContext({key: 'value2'});
// console.log(Y2.key, Y2.fn());

// //:NOTEST
// // A Context's contents can be inspected with .describe();
// Y1.describe();
// Y2.describe();

// // Classes can import values from the Context so that they can be accessed from 'this'.
// var Y = foam.createSubContext({ myLogger: function(msg) { console.log('log:', msg); }});
// foam.CLASS({
//   name: 'ImportsTest',
//   imports: [ 'myLogger' ],
//   methods: [ function foo() {
//     this.myLogger('log foo from ImportTest');
//   } ]
// });
// try {
//   var o = ImportsTest.create(); // should fail here, on object creation
//   log('test created');
//   o.foo();
// } catch(e) {
//   log('Could not import "myLogger" since nobody provided it.');
// }
// Y.myLogger('test');
// var o = ImportsTest.create(null, Y);
// o.foo();

// foam.CLASS({
//   name: 'OptionalImportsTest',
//   imports: [ 'myLogger?' ],
//   methods: [ function foo() {
//     this.myLogger('log foo from ImportTest');
//   } ]
// });
// try {
//   var o = OptionalImportsTest.create();
//   log('test created');
//   o.foo(); // should fail here, on import use
// } catch(e) {
//   log('Could not import "myLogger" since nobody provided it.');
// }

// // Classes can export values for use by objects they create.
// foam.CLASS({
//   name: 'ExportsTest',
//   requires: [ 'ImportsTest' ],
//   exports: [ 'myLogger' ],
//   methods: [
//     function init() {
//       this.ImportsTest.create().foo();
//     },
//     function myLogger(msg) {
//       console.log('log from ExportsTest:', msg);
//     }
//   ]
// });
// ExportsTest.create();

// // Packages
// // Classes can specify a 'package'.
// foam.CLASS({
//   package: 'com.acme',
//   name: 'Test',
//   methods: [ function foo() { console.log('foo from com.acme.Test'); } ]
// });
// com.acme.Test.create().foo();

// // Classes can requires: other Classes to avoid having to reference them
// // by their fully-qualified names.
// foam.CLASS({
//   name: 'RequiresTest',
//   requires: ['com.acme.Test' ],
//   methods: [ function foo() { this.Test.create().foo(); } ]
// });
// RequiresTest.create().foo();

// // Requires can use 'as' to alias required Classes so that they are named something different.
// foam.CLASS({
//   name: 'RequiresAliasTest',
//   requires: ['com.acme.Test as NotTest' ],
//   methods: [ function foo() { this.NotTest.create().foo(); } ]
// });
// RequiresAliasTest.create().foo();

// // Classes can have a unique-id or primary-key.
// // By default, this is simply the field named 'id'.
// foam.CLASS({
//   name: 'Invoice',
//   properties: [ 'id', 'desc', 'amount' ]
// });
// var o = Invoice.create({id: 1, desc: 'Duct Cleaning', amount: 99.99});
// log(o.id);

// // But you can also use the 'ids' property to specify that
// // the primary key be something other than 'id'.
// // In this case, 'id' will become an psedo-property for
// // accessing the real 'invoiceId' property.
// foam.CLASS({
//   name: 'Invoice2',
//   ids: [ 'invoiceId' ],
//   properties: [ 'invoiceId', 'desc', 'amount' ]
// });
// var o = Invoice2.create({invoiceId: 1, desc: 'Duct Cleaning', amount: 99.99});
// log(o.id, o.invoiceId);

// // Multi-part unique identifiers are also supported.
// foam.CLASS({
//   name: 'Invoice3',
//   ids: [ 'customerId', 'invoiceId' ],
//   properties: [ 'customerId', 'invoiceId', 'desc', 'amount' ]
// });
// var o = Invoice3.create({customerId: 1, invoiceId: 1, desc: 'Duct Cleaning', amount: 99.99});
// log(o.id, o.customerId, o.invoiceId);
// o.id = [2, 3];
// log(o.id, o.customerId, o.invoiceId);

// // Multi-part ids are comparable
// log(Invoice3.ID.compare(
//   Invoice3.create({customerId: 1, invoiceId: 2}),
//   Invoice3.create({customerId: 1, invoiceId: 1})));
// log(Invoice3.ID.compare(
//   Invoice3.create({customerId: 1, invoiceId: 1}),
//   Invoice3.create({customerId: 1, invoiceId: 2})));
// log(Invoice3.ID.compare(
//   Invoice3.create({customerId: 1, invoiceId: 1}),
//   Invoice3.create({customerId: 1, invoiceId: 1})));
// log(Invoice3.ID.compare(
//   Invoice3.create({customerId: 2, invoiceId: 1}),
//   Invoice3.create({customerId: 1, invoiceId: 1})));
// log(Invoice3.ID.compare(
//   Invoice3.create({customerId: 1, invoiceId: 1}),
//   Invoice3.create({customerId: 2, invoiceId: 1})));

// // A Classes 'id' is a combination of its package and name.
// log(com.acme.Test.id);

// // In addition the the built-in Axiom types, you can also
// // specify arbitrary Axioms with axioms:
// foam.CLASS({
//   name: 'AxiomTest',
//   axioms: [ foam.pattern.Singleton.create() ],
//   methods: [ function init() { log('Creating AxiomTest'); } ]
// });
// AxiomTest.create();
// AxiomTest.create();
// log(AxiomTest.create() === AxiomTest.create());

// //
// foam.CLASS({
//   name: 'AxiomSubTest',
//   extends: 'AxiomTest',
//   methods: [ function init() { log('Creating AxiomSubTest'); } ]
// });
// AxiomSubTest.create();
// AxiomSubTest.create();
// log(AxiomSubTest.create() === AxiomSubTest.create());
// log(AxiomSubTest.create() === AxiomTest.create());

// // Stdlib

// //:NOTEST
// // All Objects have a unique identifier, accessible with the .$UID property.
// var a = {}, b = [], c = Person.create();
// log(a.$UID, b.$UID, c.$UID);
// log(a.$UID, b.$UID, c.$UID);

// // foam.events.consoleLog
// foam.CLASS({name: 'ConsoleLogTest'});
// var o = ConsoleLogTest.create();
// o.sub(foam.events.consoleLog());
// o.pub();
// o.pub('foo');
// o.pub('foo','bar');

// // foam.Function.memoize1() memozies a one-argument function so that if called again
// // with the same argument, the previously generated value will be returned
// // rather than calling the function again.
// var f = foam.Function.memoize1(function(x) { log('calculating ', x); return x*x; });
// log(f(2));
// log(f(2));
// log(f(4));

// // A call to memoize1() with no arguments will trigger a failed assertion.
// log(f());

// // A call to memoize1() with more than one argument will trigger a failed assertion.
// log(f(1,2));

// // foam.Function.argsStr() returns a function's arguments an a string.
// log(foam.Function.argsStr(function(a,b,fooBar) { }));
// log(typeof foam.Function.argsStr(function() { }));

// // foam.Function.formalArgs() returns a function's arguments an an array.
// log(foam.Function.formalArgs(function(a,b,fooBar) { }));
// log(Array.isArray(foam.Function.formalArgs(function() { })));

// // foam.String.constantize converts strings from camelCase to CONSTANT_FORMAT
// log(foam.String.constantize('foo'));
// log(foam.String.constantize('fooBar'));
// log(foam.String.constantize('fooBar12'));

// // foam.String.capitalize capitalizes strings
// log(foam.String.capitalize('Abc def'));
// log(foam.String.capitalize('abc def'));

// // foam.String.labelize converts from camelCase to labels
// log(foam.String.labelize('camelCase'));
// log(foam.String.labelize('firstName'));
// log(foam.String.labelize('someLongName'));

// // foam.String.multiline lets you build multi-line strings
// // from function comments.
// log(foam.String.multiline(function(){/*This is
// a
// multi-line
// string*/}));

// // foam.String.pad() pads a string to the specified length.
// var s = foam.String.pad('foobar', 10);
// log(s, s.length);

// // foam.String.pad() pads a string to the specified length, right justifying if given a negative number.
// var s = foam.String.pad('foobar', -10);
// log(s, s.length);

// // Basic templates
// foam.CLASS({
//   name: 'TemplateTest',
//   properties: [
//     'name'
//   ],
//   templates: [
//     {
//       name: 'hello',
//       template: 'Hello, my name is <%= this.name %>.'
//     }
//   ]
// });
// var o = TemplateTest.create({ name: 'Adam' });
// log(o.hello());

// foam.CLASS({
//   name: 'TemplateTest',
//   properties: [
//     'name'
//   ],
//   templates: [
//     {
//       name: 'greet',
//       args: [
//         'stranger'
//       ],
//       template: 'Hello <%= stranger %>, my name is <%= this.name %>.'
//     }
//   ]
// });
// var o = TemplateTest.create({ name: 'Adam' });
// log(o.greet("Bob"));

// foam.CLASS({
//   name: 'TemplateTest',
//   properties: [ 'name' ],
//   templates: [
//     {
//       name: 'greeter',
//       args: [ 'stranger' ],
//       template: 'Hello <%= stranger %>'
//     },
//     {
//       name: 'greet',
//       args: ['stranger'],
//       template: '<% this.greeter(output, stranger); %>, my name is <%= this.name %>'
//     }
//   ]
// });
// var o = TemplateTest.create({ name: 'Adam' });
// log(o.greet("Alice"));

// // More
// foam.CLASS({
//   name: 'TemplateTest',
//   properties: [ 'name' ],
//   templates: [
//     {
//       name: 'complexTemplate',
//       template: 'Use raw JS code for loops and control structures' +
//         '<% for ( var i = 0 ; i < 10; i++ ) { %>\n' +
//         'i is: "<%= i %>" <% if ( i % 2 == 0 ) { %> which is even!<% } '+
//         '} %>' +
//         '\n\n' +
//         'Use percent signs to shortcut access to local properties\n' +
//         'For instance, my name is %%name\n'
//     }
//   ]
// });
// log(TemplateTest.create({ name: 'Adam' }).complexTemplate());

// // Multi-line templates can be defined as function comments.
// foam.CLASS({
//   name: 'MultiLineTemplateTest',
//   properties: [ 'name' ],
//   templates: [
//     {
//       name: 'complexTemplate',
//       template: function() {/*
//         Use raw JS code for loops and control structures
//         <% for ( var i = 0 ; i < 10; i++ ) { %>
//         i is: "<%= i %>" <% if ( i % 2 == 0 ) { %> which is even!<% }
//         } %>
//         Use percent signs to shortcut access to local properties
//         For instance, my name is %%name
//       */}
//     }
//   ]
// });
// log(MultiLineTemplateTest.create({ name: 'Adam' }).complexTemplate());

// // JSON Support
// foam.CLASS({
//   name: 'JSONTest',
//   properties: [
//     { name: 'name', shortName: 'n' },
//     { class: 'Int', name: 'age', shortName: 'a' },
//     { class: 'StringArray', name: 'children', shortName: 'cs' },
//     { name: 'name That Needs Quoting' },
//     { name: 'undefined' },
//     { name: 'defined' },
//     { class: 'String', name: 'undefinedString' },
//     { class: 'String', name: 'definedString' },
//     { class: 'String', name: 'defaultString', value: 'default' },
//     { class: 'Int', name: 'undefinedInt' },
//     { class: 'Int', name: 'definedInt' },
//     { class: 'Int', name: 'defaultInt', value: 3 },
//     { class: 'Float', name: 'undefinedFloat' },
//     { class: 'Float', name: 'definedFloat' },
//     { class: 'Float', name: 'defaultFloat', value: 3.14 },
//     { class: 'Boolean', name: 'undefinedBoolean' },
//     { class: 'Boolean', name: 'trueBoolean' },
//     { class: 'Boolean', name: 'falseBoolean' },
//     { class: 'Boolean', name: 'defaultBoolean', value: true },
//     { class: 'Function', name: 'undefinedFunction' },
//     { class: 'Function', name: 'definedFunction' },
//     { name: 'undefinedFObject' },
//     { name: 'definedFObject' },
//     { name: 'transient', transient: true },
//     { name: 'networkTransient', networkTransient: true },
//     { name: 'storageTransient', storageTransient: true },
// //    { name: '' },
//   ]
// });
// var o = foam.json.parse({
//   class: 'JSONTest',
//   name: 'John',
//   age: 42,
//   children: ['Peter', 'Paul']});
// o.describe();

// //
// o = JSONTest.create({
//   name: 'John',
//   age: 42,
//   children: ['Peter', 'Paul'],
//   "name That Needs Quoting": 42,
//   defined: 'value',
//   definedString: 'stringValue',
//   definedInt: 42,
//   defaultInt: 3,
//   definedFloat: 42.42,
//   defaultFloat: 3.14,
//   trueBoolean: true,
//   falseBoolean: false,
//   defaultBoolean: true,
//   definedFunction: function plus(a, b) { return a + b; },
//   definedFObject: JSONTest.create({
//     name: 'Janet',
//     age: 32,
//     children: [ 'Kim', 'Kathy' ]
//   }),
//   transient: 'transient value',
//   networkTransient: 'network transient value',
//   storageTransient: 'storage transient value'
// });
// // Default JSON formatting
// log(foam.json.stringify(o));

// // Convert to a JSON object (instead of a String)
// log(foam.json.stringify(JSONTest.create(foam.json.objectify(o))));

// // Or as a method on Objects
// log(o.stringify());

// //
// log(foam.json.Pretty.stringify(o));

// //
// log(foam.json.Pretty.clone().copyFrom({outputClassNames: false}).stringify(o));

// //
// log(foam.json.Strict.stringify(o));

// //
// log(foam.json.PrettyStrict.stringify(o));

// //
// log(foam.json.Compact.stringify(o));

// //
// log(foam.json.Short.stringify(o));

// //
// log(foam.json.Network.stringify(o));

// //
// log(foam.json.Storage.stringify(o));

// //:NOTEST
// // Graphics Support
// foam.CLASS({
//   name: 'GraphicsDemo',
//   extends: 'foam.graphics.CView',
//   requires: [
//     'foam.graphics.Arc',
//     'foam.graphics.Box',
//     'foam.graphics.Circle',
//     'foam.graphics.CView',
//     'foam.graphics.Gradient'
//   ],
//   properties: [
//     [ 'width', 500 ],
//     [ 'height', 500 ],
//     {
//       name: 'children',
//       factory: function() {
//         var objects = [
//           this.Arc.create({
//             start: 0,
//             end: 1.5*Math.PI,
//             radius: 40
//           }),
//           this.Circle.create({
//             color: this.Gradient.create({
//               radial: true,
//               x0: 0, y0: 0, r0: 10,
//               x1: 0, y1: 0, r1: 100,
//               colors: [
//                 [0, 'green'],
//                 [0.4, 'blue'],
//                 [0.6, 'red'],
//                 [1, 'white']
//               ]
//             }),
//             border: '',
//             radius: 100,
//             x: 300,
//             y: 300
//           }),
//           this.Box.create({
//             color: this.Gradient.create({
//               radial: false,
//               x0: 0, y0: 0,
//               x1: 100, y1: 100,
//               colors: [
//                 [0, 'black'],
//                 [1, 'white']
//               ]
//             }),
//             width: 100,
//             height: 100,
//             originX: 50,
//             originY: 50,
//             x: 100,
//             y: 400,
//             children: [
//               this.Circle.create({
//                 color: 'red',
//                 x: 30,
//                 y: 30,
//                 radius: 10
//               }),
//               this.Circle.create({
//                 color: 'red',
//                 x: 70,
//                 y: 30,
//                 radius: 10
//               }),
//               this.Circle.create({
//                 color: 'red',
//                 x: 30,
//                 y: 70,
//                 radius: 10
//               }),
//               this.Circle.create({
//                 color: 'red',
//                 x: 70,
//                 y: 70,
//                 radius: 10
//               }),
//               this.Circle.create({
//                 color: 'red',
//                 x: 50,
//                 y: 50,
//                 radius: 10
//               })
//             ]
//           })
//         ];
//         return objects;
//       }
//     },
//     {
//       name: 'counter',
//       value: 0
//     }
//   ],
//   listeners: [
//     {
//       name: 'step',
//       isFramed: true,
//       code: function() {
//         this.counter += 0.01
//         this.children[0].rotation += 0.1;
//         this.children[0].x = 150 + 50 * Math.cos(this.counter);
//         this.children[0].y = 150 + 50 * Math.sin(this.counter);
//         this.children[1].skewX = Math.sin(this.counter);
//         this.children[2].scaleX = 0.5 + 0.5 * Math.abs(Math.cos(this.counter));
//         this.children[2].scaleY = 0.5 + 0.5 * Math.abs(Math.sin(this.counter));
//         this.children[2].rotation += 0.01;
//         this.step();
//         this.invalidated.pub();
//       }
//     }
//   ]
// });
// var g = GraphicsDemo.create();
// g.write();
// g.step();

