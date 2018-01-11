foam.INTERFACE({
  package: 'net.nanopay.flinks',
  name: 'FlinksAuth',

  methods: [
  {
    name: 'authorize',
    //javaReturns: 'net.nanopay.flinks.model.FlinksRespMsg',
    javaReturns: 'net.nanopay.flinks.model.FlinksResponse',
    javaThrows: [ 'javax.naming.AuthenticationException'],
    args: [
      {
        name: 'x',
        javaType: 'foam.core.X'
      },
      {
        name: 'institution',
        javaType: 'String'
      },
      {
        name: 'username',
        javaType: 'String'
      },
      {
        name: 'password',
        javaType: 'String'
      }
    ]
  },
  {
    name: 'challengeQuestion',
    javaReturns: 'net.nanopay.flinks.model.FlinksResponse',
    javaThrows: [ 'javax.naming.AuthenticationException' ],
    args: [
      {
        name: 'x',
        javaType: 'foam.core.X'
      },
      {
        name: 'institution',
        javaType: 'String'
      },
      {
        name: 'username',
        javaType: 'String'
      },
      {
        name: 'requestId',
        javaType: 'String'
      },
      {
        name: 'questions',
        javaType: 'String[]',
      },
      {
        name: 'answers',
        javaType: 'Object[]'
      }
    ]
  },
  {
    name: 'getAccountSummary',
    //javaReturns: 'net.nanopay.flinks.model.FlinksRespMsg',
    javaReturns: 'net.nanopay.flinks.model.FlinksResponse',
    javaThrows: [ 'javax.naming.AuthenticationException' ],
    args: [
      {
        name: 'x',
        javaType: 'foam.core.X'
      },
      {
        name: 'requestId',
        javaType: 'String'
      }
    ]
  }
  ]
 });