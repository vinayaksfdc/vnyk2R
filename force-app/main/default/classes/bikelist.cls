public with sharing class bikelist {
     @AuraEnabled(Cacheable=true)
    public static List<product__c> search() {
        List<string> s;
        List<product__c> camp=[SELECT Id, Name, MSRP__c, Description__c, Category__c, Level__c, Picture_URL__c, Material__c FROM Product__c WHERE RecordTypeid='0122v000001vKBgAAM'];
       	system.debug(camp);
        //type,status,description
	return camp;        
    }
}