public class AccountFormByIDController {
    @AuraEnabled
    public static Account find_AccById(Id get_accountid) {
        if(get_accountid != null ) {
            return [SELECT Id, Name, Type, Industry from Account where ID = :get_accountid];
        }
        else{
            return [SELECT ID,  Name, Type, Industry from Account LIMIT 1];
        }     
    } 
}