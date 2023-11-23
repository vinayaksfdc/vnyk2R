public with sharing class CarSearchFormController {
    @AuraEnabled(cacheable=true)
    public static List<CarType_Values__c> getCarTypes(){
        return [SELECT Id, Name FROM CarType_Values__c];
    }
}