public class UpdateUserProfile {
    @future
    public static void updateProxyProfile(Set<id> pxyConId){
Id proxyProfileId = [SELECT Id FROM profile WHERE name='Keystone Community Principal Proxy' limit 1].Id ;
        List<User> uselst = new List<User>();
        if(pxyConId.size() > 0 ){
            for(user us : [SELECT Id, Name, ContactId from User WHERE ContactId = :pxyConId]){
                us.ProfileId = proxyProfileId ;
                uselst.add(us);
            }
        }
        update uselst;
    }
    @future
    public static void updatePartnerProfile(Set<id> prtnrConId){
    Id partnerProfileId = [SELECT Id FROM profile WHERE name='Keystone Partner Community User' limit 1].Id ;
        List<User> uselst = new List<User>();
        if(prtnrConId.size() > 0 ){
            for(user us : [SELECT Id, Name, ContactId from User WHERE ContactId = :prtnrConId]){
                us.ProfileId = partnerProfileId ;
                uselst.add(us);
            }
        }
        update uselst;
    }
}