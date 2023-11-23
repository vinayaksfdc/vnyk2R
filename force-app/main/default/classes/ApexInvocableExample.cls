public class ApexInvocableExample {
    
    
    
    @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
    public static List<List<String>>  getAccountNames(List<ID> ids) {
 	  List<String> accountNames = new List<String>();
        List<List<String>>  lstAcc=new List<List<String>>();
        List<accountcontactrelation> accounts = [SELECT id, AccountId, Account.Name,ContactId, contact.Name FROM accountcontactrelation where contactid  in :ids];
         for (accountcontactrelation account : accounts) {
            accountNames.add(account.Account.Name);
       }
        lstAcc.add(accountNames);
         system.debug('accountNames ___________________>>>>>>>>>>>>>>>>>>'+accountNames[0]);
        return lstAcc;
    }
    
}