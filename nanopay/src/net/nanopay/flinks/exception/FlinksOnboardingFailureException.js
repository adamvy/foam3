/**
 * NANOPAY CONFIDENTIAL
 *
 * [2021] nanopay Corporation
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of nanopay Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to nanopay Corporation
 * and may be covered by Canadian and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from nanopay Corporation.
 */

foam.CLASS({
  package: 'net.nanopay.flinks.exception',
  name: 'FlinksOnboardingFailureException',
  extends: 'foam.nanos.dig.exception.TemporaryExternalAPIException',

  axioms: [
    {
      name: 'javaExtras',
      buildJavaClass: function(cls) {
        cls.extras.push(`
          public FlinksOnboardingFailureException(String message) {
            super(message);
            setMessage(message);
          } 
        `
        );
      }
    }
  ],

  properties: [
    {
      class: 'String',
      name: 'message',
      value: 'Failed to create business during onboarding with Flinks'
    }
  ]
});
