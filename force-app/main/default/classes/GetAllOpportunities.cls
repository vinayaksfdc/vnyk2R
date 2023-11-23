public with sharing class GetAllOpportunities {
    @AuraEnabled(cacheable=true)
     public static List<Opportunity> getAllOpps() {
         return [SELECT Id, Name ,StageName, CloseDate FROM Opportunity Order By Name asc];
     }
 
 }