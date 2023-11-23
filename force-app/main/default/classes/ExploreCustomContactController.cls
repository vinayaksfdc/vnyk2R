public with sharing class ExploreCustomContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> conList;
        try {
             conList=[select Name,LeadSource,Phone,Account.Name,Account.Industry from Contact Limit 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return conList;
    }
}