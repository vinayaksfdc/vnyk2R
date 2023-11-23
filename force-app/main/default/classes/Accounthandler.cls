public class Accounthandler {
    public static void rating(List<Account> accs,Map<id,Account> oldmap){
        set<string> newids=new set<string>();
        List<account> accList=new List<account>();
        for(Account a :accs){
            	if(a.rating==oldmap.get(a.Id).rating){
                    system.debug('rating not changed'+a.rating);
                    system.debug('old rating'+oldmap.get(a.Id).rating);
                }
            else{
                newids.add(a.Id);
                system.debug('rating changed'+a.rating);
                 system.debug('old rating'+oldmap.get(a.Id).rating);
                               
            }
    	}
        List<Account> accounts = [SELECT Id, Name, Description FROM Account WHERE Id IN :newids];
        for(Account a : accounts){
            a.Description = 'Created from after Trigger'+system.today();
        } 
        UPDATE accounts;

      
    }
    
        public static void ratingbeforeUpdate(List<Account> accs,Map<id,Account> oldmap){
            List<Account> accounts =new List<Account>();
        set<string> newids=new set<string>();
        List<account> accList=new List<account>();
        for(Account a :accs){
            	if(a.rating!=oldmap.get(a.Id).rating){
                    system.debug('rating not changed'+a.rating);
                    system.debug('old rating'+oldmap.get(a.Id).rating);
                   a.Description = 'Created from after ratingbeforeUpdat 343';
                      }
        }
      
         

      
    }
}