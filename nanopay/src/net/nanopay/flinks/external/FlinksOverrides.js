/**
 * NANOPAY CONFIDENTIAL
 *
 * [2020] nanopay Corporation
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
  package: 'net.nanopay.flinks.external',
  name: 'FlinksOverrides',
  documentation: 'Override data retrieved from Flinks with data provided in this object.',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.flinks.external.UserOverrideData',
      name: 'userOverrides',
      documentation: 'Overrides for the user'
    },
    {
      class: 'FObjectProperty',
      of: 'net.nanopay.flinks.external.BusinessOverrideData',
      name: 'businessOverrides',
      documentation: 'Overrides for the business'
    },
    {
      class: 'String',
      name: 'type',
      externalTransient: true
    }
  ]
});
