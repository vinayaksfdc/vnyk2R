public class apexInvokableAccountController {

    @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
  public static List<String> getAccountNames(List<ID> ids) {
       System.debug('ids ==================='+ids);
    List<String> accountNames = new List<String>();
    List<Account> accounts = [SELECT Name FROM Account WHERE Id in :ids];
    for (Account account : accounts) {
      accountNames.add(account.Name);
    }
      System.debug('accountNames ===================>>>>>'+accountNames);
    return accountNames;
  }
}