foam.CLASS({
  package: 'net.nanopay.tx.model',
  name: 'TransactionEntity',
  documentation: `This model represents the payer/payee of a transaction and is meant to storage transient.`,

  javaImports: ['foam.nanos.auth.User'],

  properties: [
    {
      class: 'String',
      name: 'firstName',
      visibility: foam.u2.Visibility.RO
    },
    {
      class: 'String',
      name: 'lastName',
      visibility: foam.u2.Visibility.RO
    },
    {
      class: 'EMail',
      name: 'email'
    },
    {
      class: 'foam.nanos.fs.FileProperty',
      name: 'profilePicture',
      view: { class: 'foam.nanos.auth.ProfilePictureView' }
    }
  ],
  axioms: [
    {
      buildJavaClass: function(cls) {
        cls.extras.push(`
          public TransactionEntity(User user) {
            setFirstName(user.getFirstName());
            setLastName(user.getLastName());
            setEmail(user.getEmail());
            setProfilePicture(user.getProfilePicture());
          }
        `);
      },
    },
  ],
});
