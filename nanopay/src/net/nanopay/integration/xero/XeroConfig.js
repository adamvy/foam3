foam.CLASS({
  package: 'net.nanopay.integration.xero',
  name: 'XeroConfig',
  documentation: 'Abstract Model for Xero Config',
  javaImplements: [
    'com.xero.api.Config'
  ],
  ids: ['url'],
  properties: [
    {
      class: 'String',
      name: 'url',
    },
    {
      class: 'String',
      name: 'appType',
      value: 'PUBLIC'
    },
    {
      class: 'String',
      name: 'privateKeyPassword'
    },
    {
      class: 'String',
      name: 'pathToPrivateKey'
    },
    {
      class: 'String',
      name: 'consumerKey',
    },
    {
      class: 'String',
      name: 'consumerSecret',
    },
    {
      class: 'String',
      name: 'apiUrl',
      value: 'https://api.xero.com/api.xro/2.0/'
    },
    {
      class: 'String',
      name: 'requestTokenUrl',
      value: 'https://api.xero.com/oauth/RequestToken'
    },
    {
      class: 'String',
      name: 'authorizeUrl',
      value: 'https://api.xero.com/oauth/Authorize'
    },
    {
      class: 'String',
      name: 'accessTokenUrl',
      value: 'https://api.xero.com/oauth/AccessToken'
    },
    {
      class: 'String',
      name: 'userAgent',
    },
    {
      class: 'String',
      name: 'accept',
      value: 'XML'
    },
    {
      class: 'String',
      name: 'redirectUri',
    },
    {
      class: 'String',
      name: 'proxyHost'
    },
    {
      class: 'Long',
      name: 'proxyPort'
    },
    {
      class: 'Boolean',
      name: 'proxyHttpsEnabled'
    },
    {
      class: 'Int',
      name: 'connectTimeout'
    },
    {
      class: 'String',
      name: 'authCallBackUrl',
    }
  ]
});
