public with sharing class LeadController {
     @AuraEnabled(cacheable = true)  
    public static List<Lead> fetchleads( ) {  
        return [ select id,model__c,type__c,picture__c,prospect__r.Name,status__c,Assigned_To_Dealership__c,Outcome__C,Consultant__r.Name from lead where model__c!=null ];  
     }  

     
     
     @AuraEnabled
     public static String updateLeadRecord(Lead recordForUpdate){
     update recordForUpdate;
     return recordForUpdate.Id;
     }
}