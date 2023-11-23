public class wrapperClassDemo {
     @AuraEnabled(cacheable=true)
    public static List<AccountrelContact> getAllAccountWithContacts(){
        List<AccountrelContact> accWrapperList = new List<AccountrelContact>();
        List<Account> accList = [SELECT Id, Name, BillingState, Website, Phone,
                                    (SELECT Id, FirstName, LastName, Name, Email From Contacts)
                                    FROM Account Where Name like '%United%'];
        if(!accList.isEmpty()){
            for(Account acc : accList){
                AccountrelContact accWrapper = new AccountrelContact();
                accWrapper.accRecord = acc;
                accWrapper.contactList = acc.Contacts;
                accWrapper.contactCount = acc.Contacts.size();
                accWrapperList.add(accWrapper);
            }
        }
        return accWrapperList;
    }
    public class AccountrelContact{
        @AuraEnabled
        public Account accRecord{get;set;}
        @AuraEnabled
        public List<Contact> contactList{get;set;}
        @AuraEnabled
        public Integer contactCount{get;set;}
    }
}