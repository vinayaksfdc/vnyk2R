public without sharing class UserRelatedContactsList {
    
    public class contactWrapperClass{
        @AuraEnabled public Contact contactRecord;
        @AuraEnabled public User contactRelatedUser;
        @AuraEnabled public Boolean active;
        @AuraEnabled public Boolean inactive;
        @AuraEnabled public Boolean isUser;
    }
    
    @AuraEnabled(Cacheable=true)
    public static List<contactWrapperClass> getContactList() {
        List<contactWrapperClass> listOfContactWrapper = new List<contactWrapperClass>();
        User userObj = [SELECT ID,Name,AccountId,ContactId FROM User WHERE id = :userInfo.getUserId()];
        Map<Id,Contact> mapOfIdWithContact = new Map<Id,Contact>([SELECT Id,FirstName,LastName, Name, Email, Phone, AccountId FROM Contact WHERE AccountId = :userObj.AccountId]);
        Map<Id,User> mapOfContactIdWithUser = new Map<Id,User>();
        for(User usr: [select id,Name,Email,ContactId,isActive from User where contactId=:mapOfIdWithContact.keyset()]){
            mapOfContactIdWithUser.put(usr.contactId,usr);
        }
        for(Contact con:mapOfIdWithContact.values()){
            contactWrapperClass conWrapper = new contactWrapperClass();
            conWrapper.contactRecord = con;
            if(mapOfContactIdWithUser.containskey(con.id)){
                conWrapper.contactRelatedUser = mapOfContactIdWithUser.get(con.id);
                if(mapOfContactIdWithUser.get(con.id).isActive){
                    conWrapper.active = mapOfContactIdWithUser.get(con.id).isActive;
                }else{
					conWrapper.inactive = true;                    
                }                
                conWrapper.isUser = true;
            }else{
                conWrapper.isUser = false;
            }
            listOfContactWrapper.add(conWrapper);
        }
        return listOfContactWrapper;
    }
    @AuraEnabled
    public static void deactiveUser(Id conId){
        // Assume contactList is a list of Contacts whose users we wish to deactivate
        List<User> usersToUpdate = new List<User>();
        for(User u : [Select u.Id, u.IsActive, u.IsPortalEnabled from User u where u.ContactId = :conId ]){
            if(u.IsActive){
                u.IsActive = false;
                usersToUpdate.add(u);
            }
        }
        if (usersToUpdate.size()>0)
        {
            update usersToUpdate;
        }
    }
    
    @AuraEnabled
    public static void activateUser(Id conId){
        // Assume contactList is a list of Contacts whose users we wish to deactivate
        List<User> usersToUpdate = new List<User>();
        for(User u : [Select u.Id, u.IsActive, u.IsPortalEnabled from User u where u.ContactId = :conId ]){
            if(!u.IsActive){
                u.IsActive = true;
                usersToUpdate.add(u);
            }
        }
        if (usersToUpdate.size()>0)
        {
            update usersToUpdate;
        }
    }
    
    @AuraEnabled
    public static void saveContactRecord(Contact objAcc){
        try{
            
            system.debug('test'+objAcc);
            insert objAcc;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    
    @AuraEnabled
    public static void inviteUser(Id conId,String alias){
        //Create Portal User
        Profile portalProfile = [SELECT Id FROM Profile WHERE Name='BYKES' Limit 1];
        Contact con = [select id,FirstName,LastName, Email, AccountId from Contact where id=:conId];
        User user1 = new User(
            UserName = con.Email,
            FirstName = con.FirstName,
            LastName = con.LastName,
            Alias = alias,
            email = con.Email,
            ContactId = con.Id,
            ProfileId = portalProfile.Id,
            EmailEncodingKey = 'UTF-8',
            CommunityNickname = 'test12345',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US'
        );
        insert user1;
    }


     
}