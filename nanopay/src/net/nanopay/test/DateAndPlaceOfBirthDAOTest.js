foam.CLASS({
  package: 'net.nanopay.test',
  name: 'DateAndPlaceOfBirthDAOTest',
  extends: 'foam.nanos.test.Test',
   documentation: `This class tests DateAndPlaceOfBirthDAO - for the purpose of switching service to EasyDAO. 
                  Basic Tests work in 6 steps
                  Step 1: create an object to put into the dao
                  Step 2: do a put(obj) into the testing dao
                  Step 3: do a find(obj)
                  Step 4: test that the find did not return a null
                  Step 5: do a remove(obj)
                  Step 6: test that remove worked by trying to find(obj)`,
   javaImports: [
     'foam.core.X',
     'foam.dao.DAO',
     'net.nanopay.model.DateAndPlaceOfBirth'
  ],
   methods: [
  {
      name: 'runTest',
      javaType: 'void',
      javaCode: `
      // Objects and Variables
      boolean tester = true;
      DAO dateAndPlaceOfBirthDAOTest = (DAO) x.get("dateAndPlaceOfBirthDAO");
      DateAndPlaceOfBirth testDate = new DateAndPlaceOfBirth();
      long id = 11100111;

       // DateAndPlaceOfBirth
      testDate.setId(id);
      
      // put test
      try {
        dateAndPlaceOfBirthDAOTest.put(testDate);
      } catch (Exception e) {
        tester = false;
      }
      
      // find test
      DateAndPlaceOfBirth test1 = null;
      try {
        test1 = (DateAndPlaceOfBirth) dateAndPlaceOfBirthDAOTest.find(testDate);
        if( test1.getId() != id ) tester = false;
      } catch (Exception e) {
        tester = false;
      }
      
      // remove test
      try {
        dateAndPlaceOfBirthDAOTest.remove(test1);
      } catch (Exception e) {
        tester = false;
      }
      
       // find 2: confirm remove 
      try {
        DateAndPlaceOfBirth test2 = (DateAndPlaceOfBirth) dateAndPlaceOfBirthDAOTest.find(testDate);
        if( test2 != null ) tester = false;
      }
      catch (Exception e){
        tester = false;
      }

      test(tester, "dateAndPlaceOfBirthDAO - put, find, remove test ");
        `
      }
    ]
  });
