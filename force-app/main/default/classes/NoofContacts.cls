public without sharing class NoofContacts {
     public static void noofcontacts(List<Contact> conList){
        List<string> accountid;
        for (Contact c : conList) 
        {
            accountid.add(c.accountid); 
        }    
        if(accountid!=null){
            List<Account> a=[select id,NoofContact__c,(select id from contacts) from Account where id in:  accountid];
            if(!a.isEmpty()){
                for(Account acc:a){
                    acc.NoofContact__c=acc.contacts.size();
                }
            }
            update a;
        }
        
    }
}