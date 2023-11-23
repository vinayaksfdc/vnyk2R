public with sharing class OpportunityController {
    @AuraEnabled
    public static List<Account> fetchOpportunities(){
        return [SELECT Id, Name   FROM Account];
    }
}