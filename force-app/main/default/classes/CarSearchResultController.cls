public with sharing class CarSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(String carTypeId){
        
        if(String.isEmpty(carTypeId)){
            return [SELECT id, Image_url__c, name,	CarType_Values__c, Make__c
                    FROM car__c];
        } else{
            return [SELECT id, Image_url__c, name,	CarType_Values__c, Make__c
                    FROM car__c
                    WHERE CarType_Values__c  =: carTypeId];
        }

    }
}