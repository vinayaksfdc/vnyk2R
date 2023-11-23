public with sharing class getShirtList {
   
    @AuraEnabled(Cacheable=true)
    public static Product__c[] getShirts(Id productId, Id familyId) {
        return [
            SELECT Id, Name, Price__c, Description__c, Color__c, Brand__c, Picture_URL__c,Size__c, Material__c FROM Product__c where RecordTypeid='0122v000001vKAOAA2'
        ];
    }

}