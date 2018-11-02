package net.nanopay.security.receipt;

public class Main {

  public static void main(String[] args)
    throws java.lang.Exception
  {
    foam.core.X x = foam.core.EmptyX.instance();
    foam.core.ClassInfo of = foam.nanos.auth.User.getOwnClassInfo();
    foam.dao.DAO delegate = new foam.dao.MDAO(of);

    ReceiptGenerator generator = new TimedBasedReceiptGenerator(x, "SHA-256", 100);
    ReceiptGeneratingDAO dao = new ReceiptGeneratingDAO.Builder(x)
      .setGenerator(generator)
      .setDelegate(delegate)
      .build();
    generator.start();

    int count = 999;
    java.util.Random srand = new java.security.SecureRandom();

    /**
     * Create 10 threads all which add to the dao
     */
    for ( int i = 0 ; i < count; ++i ) {
      new Thread(new Runnable() {

        @Override
        public void run() {
          try {
            while ( true ) {
              foam.core.FObject obj = new foam.nanos.auth.User.Builder(x)
                .setId(srand.nextInt())
                .setEmail(java.util.UUID.randomUUID().toString() + "@nanopay.net")
                .build();

              dao.put(obj);
            }
          } catch (Throwable t) {
             t.printStackTrace();
          }
        }
      }).start();
    }
  }
}
