public with sharing class ContactExp {
     @AuraEnabled(cacheable=true)
     public static List<contact> getContactList() {
        List<contact> conList= [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 10];
         return conList;
     }
 }