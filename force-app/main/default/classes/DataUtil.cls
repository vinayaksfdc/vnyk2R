@isTest 
private class DataUtil {
    static testmethod void testLoadData() {
        // Load the test accounts from the static resource
        List<sObject> ls = Test.loadData(Account.sObjectType, 'testAccounts');
        // Verify that all 3 test accounts were created
        System.assert(ls.size() == 4);

        // Get first test account
        Account a1 = (Account)ls[0];
        String acctName = a1.Name;
        System.debug(acctName);

        // Perform some testing using the test records
    }
    
     static testMethod void testSetCreatedDate() {  
        Account acc = new Account(Name='Test Account');  
        Insert acc;
        Datetime yesterday = Datetime.now().addDays(-1);
        Test.setCreatedDate(acc.Id, yesterday);  
        Test.startTest();  
        Account testAcc = [SELECT Id, Name, CreatedDate FROM Account WHERE Name ='Test Account' LIMIT 1];  
        System.assertEquals(testAcc.CreatedDate, yesterday);  
        Test.stopTest();  
    }  
}