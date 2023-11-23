public class NullPointerExample {

    public static void mapNullPointer(){
        //List of accountIds
        List<String>accountIds = new List<String>{'wrongId'};
        //Map to story results from query    
        Map<String,Account> accounts = new Map<String, Account>([SELECT ID FROM Account where Industry = 'Energy']);
		system.debug(accounts.size());
        //Loop through list of account Ids
        for(String accountId: accountIds){
            //Use map.get with the id
            system.debug('12'+accountId);
            Account account = accounts.get(accountId);
            system.debug('14'+account);
            if(account != null){
                System.debug(account.Name);      
               }
         
        }    
    }
}