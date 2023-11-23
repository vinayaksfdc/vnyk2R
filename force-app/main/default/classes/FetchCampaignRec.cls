public with sharing class FetchCampaignRec {
     @AuraEnabled(Cacheable=true)
    public static List<campaign> search() {
        List<string> s;
        List<campaign> camp=[select id,name from Campaign  LIMIT 5];
       	system.debug(camp);
        //type,status,description
	return camp;        
    }
}