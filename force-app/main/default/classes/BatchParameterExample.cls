global class BatchParameterExample implements Database.Batchable<sObject>, Database.Stateful{
    global Integer jobCounter = 1;
    public BatchParameterExample(){
        system.debug('Rating--->>'+jobCounter);
    }
        public BatchParameterExample(String Rating){
        system.debug('Rating--->>'+jobCounter);
    }
      
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ID, BillingStreet, BillingCity, BillingState, ' +
            'BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode FROM Contacts) FROM Account ' +
            'Where BillingCountry = \'USA\' Limit 1'
        );
    } 
    public void execute(Database.BatchableContext bc, List<Account> scope){
        // process each batch of records
        
        List<Contact> contacts = new List<Contact>();
        for (Account account : scope) {
            for (Contact contact : account.contacts) {
                contact.MailingStreet = account.BillingStreet;
                contact.MailingCity = account.BillingCity;
                contact.MailingState = account.BillingState;
                contact.MailingPostalCode = account.BillingPostalCode;
                // add contact to list to be updated
                contacts.add(contact);
                // increment the instance member counter
                
            }
        }
        update contacts;
    }
    public void finish(Database.BatchableContext bc){
         if (jobCounter<3){
            jobCounter++;
            BatchParameterExample e=new BatchParameterExample('Hot');
        Database.executeBatch(e,1);
        }
        
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors,
            JobItemsProcessed,
            TotalJobItems, CreatedBy.Email
            FROM AsyncApexJob
            WHERE Id = :bc.getJobId()];
        // call some utility to send email
       // EmailUtils.sendMessage(job, recordsProcessed);
    }
        
        
        
 
}