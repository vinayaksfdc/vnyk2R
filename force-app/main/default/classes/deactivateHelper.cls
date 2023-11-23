/* While deactivating a user on User Object update field on msg__c and deactivatedate__c with current dd*/  
public class deactivateHelper{
   
  public static Boolean isFirstTime = true;
    public static void updateUser(Set<id> pxyUsrId){
        
        system.debug('====='+pxyUsrId);
        //Getting the Id for the user
        Id userId = [select id,msg__c from User where id in: pxyUsrId limit 1].Id ; 
      //  List<User> userListToDeactivate = [select id,msg__c from User where id in: ids];
        
                List<User> uselst = new List<User>();
        if(pxyUsrId.size() > 0 ){
            for(user us : [SELECT Id, msg__c,deactivatedate__c from User WHERE Id = :userId]){
                system.debug('us'+us);
                us.msg__c = 'tested';
                us.deactivatedate__c=system.today();
                uselst.add(us);
            }
        }
        update uselst;
    }
    
 
}