@isTest  
private class SampleTest {  
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