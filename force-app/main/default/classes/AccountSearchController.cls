public with sharing class AccountSearchController {
    public AccountSearchController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<User> getAccounts(String actName){
        List<User> accountList = new List<User>();
        if(actName!=''){
            String accountName = '%' + actName + '%';
            accountList = [select id,name from User where name like:accountName];
            return accountList;  
        }
        return accountList;
              
    }
}