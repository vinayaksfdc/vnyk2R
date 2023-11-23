public class DeleteMultipleRecordHandler {
    @AuraEnabled(cacheable = true)
    public static List<Account> fetchAccounts() {
        return [ SELECT Id, Name, Phone FROM Account order by Name asc limit 15];    
    }
    
    @AuraEnabled
    public static void deleteSelectedAccounts(List<Account> accLst) {
        system.debug(accLst);
        delete accLst;
    }
 }