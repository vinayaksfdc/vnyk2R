public without sharing class contactDuplicateTriggerHandler {
   
    public static void preventDuplicateRecords(List<Contact> conList){
        
        Map<Id,List<Contact>> accMap = new Map<Id,List<Contact>>();
        List<Contact> contactList;
        
        for(Contact c: [Select Id,Email,accountId from Contact]){
            if(accMap.containsKey(c.accountId)){   
                accMap.get(c.accountId).add(c);
            }
            else{
                contactList = new List<Contact>();
                contactList.add(c);
                accMap.put(c.accountId,contactList);
            }       
        }
        
        for (Contact c : conList) 
        {
            if(accMap.containsKey(c.accountId)){
                for(Contact con : accMap.get(c.accountId)){
                    if(c.Email == con.Email){
                        c.Email.addError('Contact with this email address already exists');
                    }
                }
            }
        }
    }
}