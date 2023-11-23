public with sharing class LwcModalCtrl {
   // This method is used to retrieve the contact details.
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name,Title,Department,LeadSource FROM Contact LIMIT 10];
    }
}