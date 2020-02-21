/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'net.nanopay.tx.planner.predicate',
  name: 'PropertyIsClass',

  documentation: 'Returns true if property propName is classOf of',

  extends: 'foam.mlang.predicate.AbstractPredicate',
  implements: ['foam.core.Serializable'],

  javaImports: [
    'foam.core.FObject',
    'static foam.mlang.MLang.*'
  ],
  properties: [
    {
      class: 'String',
      name: 'propName'
    },
    {
      class: 'Class',
      name: 'of',
      documentation: 'class that we want the object to be an instance of'
    },
    {
      class: 'Boolean',
      name: 'isNew',
      value: true
    }
  ],
  methods: [
    {
      name: 'f',
      javaCode: `

      if ( getIsNew() ) {
        FObject nu  = (FObject) NEW_OBJ.f(obj);
        return CLASS_OF(getOf().getObjClass()).f(nu.getClassInfo().getAxiomByName(getPropName()));
      }
      FObject old = (FObject) OLD_OBJ.f(obj);
      if ( old != null )
        return CLASS_OF(getOf().getObjClass()).f(old.getClassInfo().getAxiomByName(getPropName()));
      return false;
      `
    }
  ]
});
