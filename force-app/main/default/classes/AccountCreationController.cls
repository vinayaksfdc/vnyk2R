public with sharing class AccountCreationController {
    public AccountCreationController() {

    }

    @AuraEnabled
    public static string createAccount(Account accountRecObj){
        try {
            insert accountRecObj;
            return  accountRecObj.id;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

        @AuraEnabled
    public static string createAssets(Asset assRecObj){
        try {
            insert assRecObj;
            return  assRecObj.id;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }


    @AuraEnabled
    public static List<Account> createAccounts(List<Account> accountList){
        insert accountList;
        return accountList;
        
    }
}