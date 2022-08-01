/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.agents',
  name: 'DeveloperModeAgent',
  implements: [ 'foam.core.ContextAgent' ],

  imports: [
    'userCapabilityJunctionDAO'
  ],

  exports: [
    'developerMode'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'developerMode'
    }
  ],

  methods: [
    async function execute() {
      const e = foam.mlang.Expressions.create();
      const developerCapability = await this.userCapabilityJunctionDAO.find(
        e.EQ(foam.nanos.crunch.UserCapabilityJunction.TARGET_ID, 'developer'));

      this.developerMode = developerCapability !== undefined;
    }
  ]
});
