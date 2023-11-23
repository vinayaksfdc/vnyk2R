public with sharing class showErrorMsg {
    
    @AuraEnabled

    public static integer showError() {
       system.debug('showErrorfromApextoUI Executing');
        return 10/0;
    }
}