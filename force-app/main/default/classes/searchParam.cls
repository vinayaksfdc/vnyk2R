public with sharing class searchParam {
      @AuraEnabled(cacheable=true)
    public static string SearchString(String searchKey) {
         User ur=[ SELECT AccountId from User where id='0052v00000hBfSiAAK' LIMIT 1];
         
        return ur.AccountId;
    }

    @AuraEnabled
    public static Integer showErrorfromApextoUI() {
        system.debug('showErrorfromApextoUI Executing');
        return 10/0;
   }


     @AuraEnabled 
    public static string RetriveAccIdfromCommunityUser(String searchKey) {
        system.debug(searchKey);
         
         User ur=[ SELECT AccountId from User where id='0052v00000hBfSiAAK' LIMIT 1];
         
        return ur.AccountId;
    }
}