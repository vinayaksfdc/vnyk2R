public without sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WHERE Picture__c != null
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactLst() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact where lastName!=Null and Email !=Null Limit 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Contact>();
        }
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Title, Phone, Email FROM Contact WHERE Name LIKE :key LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Contact getSingleContact() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }

     
 

    @AuraEnabled
     public static String findCommunitycontacts(String searchKey) {
         system.debug(searchKey);
         
         User ur=[ SELECT AccountId from User where id='0052v00000hBfSiAAK' LIMIT 1];
         
        return ur.AccountId;
    }
}