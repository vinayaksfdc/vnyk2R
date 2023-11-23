public with sharing class AccountController {


  @AuraEnabled
  public static Account updateAccountRecord(String recordId, String accountName) {
      Account acc = new Account(Id = recordId, Name = accountName);
      update acc;
      return acc;
  }
  
    @AuraEnabled 
  public static List<Account> getAccountsContactRecords(){
      return [Select Id,Name,Industry,phone,(SELECT Id, FirstName, LastName FROM Contacts) from Account where Id IN 
  ( SELECT AccountId
    FROM Contact
    WHERE AccountId!= Null 
  )
limit 10];
  }

  @AuraEnabled(Cacheable=true)
    public static list<Account> returnAccsWithCons(){
        return [SELECT Id, Name, Industry, Type, (SELECT Id, FirstName, LastName FROM Contacts),(select id,Name from Opportunities) FROM Account];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id,Name,Industry,phone from Account where Industry!=Null and Phone!=null limit 10];
    }


      @AuraEnabled 
    public static List<Account> getAccountsRecords(){
        return [Select Id,Name,Industry,phone from Account where Industry!=Null and Phone!=null limit 10];
    }
	
    
       @AuraEnabled 
    public static void DeleteAccountsRecords(List<string> DeleteAccountids){
      system.debug(DeleteAccountids);
        List<account> accList=[Select Id,Name,Industry,phone from Account where id = : DeleteAccountids];
        for(String s:deleteAccountids){
            system.debug(s);
        }
    	delete accList;
    }
    
    @AuraEnabled(cacheable=true)  
    public static accWrapper getAccountRecords(){  
      accWrapper ow = new accWrapper();  
      ow.accList = [SELECT Id, Name,Phone,Industry,Rating From Account LIMIT 100];  
      Set<Id> selectedAccIdSet = new Set<Id>();  
      for(Account acc: ow.accList){  
        selectedAccIdSet.add(acc.Id);  
      }  
      ow.selectedIdSet = selectedAccIdSet;  
      return ow;  
    }  
       public class accWrapper{  
      @AuraEnabled public List<Account> accList {get; set;}  
      @AuraEnabled public set<Id> selectedIdSet {get; set;}  
    }  

     @AuraEnabled  
    public static void updateAccount( String recId ) {
        
        update new Account( Id = recId, Description = String.valueOf( System.now() ) );
        
    }


    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccountRecord(Integer offset, Integer l){
        return [Select Id, Name, Website, Type from Account limit :l  offset :offset ];
    }
}