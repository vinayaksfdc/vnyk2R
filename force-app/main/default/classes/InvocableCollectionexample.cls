public   class InvocableCollectionexample {
     
   /*  @InvocableMethod(label='get List Accounts' description='Inserts the accounts specified and returns the IDs of the new accounts.' category= 'Account')
    public static void getRecordsFromFlow(List<List<Account>> accountList) {
        List<Account> accLst=new List<Account>();
        accLst=accountList[0];
      system.debug(accLst);
    } */

        @InvocableMethod(label='get List RecordsAccounts' description='Inserts the accounts specified and returns the IDs of the new accounts.' category= 'Account')
    public static List<List<Account>> sendRecordstoflow(List<List<Account>> accountList) {
        List<Account> accLst=[select id,name,phone from account limit 10];
        List<List<Account>> accRecLst=new     List<List<Account>> ();
        accRecLst.add(accLst);
      system.debug(accRecLst);
      return accRecLst;
    }

  
}