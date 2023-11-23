public with sharing class LWCExampleController {

    @AuraEnabled
    public static list<Account> readCSVFile(Id idContentDocument){
        list<Account> lstAccsToInsert = new list<Account>();
        if(idContentDocument != null) {
            
            // getting File Data based on document id 
            ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
            // split the file data
            list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

            for(Integer i = 1; i < lstCSVLines.size(); i++){
                Account objAcc = new Account();
                list<String> csvRowData = lstCSVLines[i].split(',');
                System.debug('csvRowData====> '+csvRowData);
                objAcc.Name = csvRowData[0]; // accName
                objAcc.Industry = csvRowData[1];
                objAcc.Rating = csvRowData[2];
                objAcc.Type = csvRowData[3];
                objAcc.Website = csvRowData[4];
                lstAccsToInsert.add(objAcc);
            }

            try{    
                if(!lstAccsToInsert.isEmpty()) {
                    insert lstAccsToInsert;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return lstAccsToInsert;    
    }


    
        @AuraEnabled(Cacheable = true)
        public static List<Account> getContacts(){
            return [SELECT Id, Name FROM Account ORDER BY Name limit 50];
        }
    
    	 @AuraEnabled(cacheable = true)
       public static List<Contact> searchContactList(String accountName){
           if (String.isBlank(accountName)) {
                return new List<Contact>();
            }
           
            String key = '%' + accountName + '%';            
            return [SELECT Id, Name, Email FROM Contact WHERE Account.Name LIKE : key LIMIT 3];
       }      
        
    	 @AuraEnabled(cacheable=true)
    public static list<Opportunity> retriveOpportunities() {
        return [SELECT Id, Name, Account.Name, Account.owner.name, Owner.Name, CreatedDate FROM Opportunity LIMIT 10];
    }
    
        @AuraEnabled
        public static void deleteContacts(list<Id> lstConIds){
            system.debug(lstConIds);
            try {
                list<Contact> lstConsToDelete = new list<Contact>();
                System.debug('lstConIds ====> '+lstConIds);
                for(Id idCon : lstConIds) {
                    lstConsToDelete.add(new Contact(Id = idCon));
                }
                if(!lstConsToDelete.isEmpty()) {
                    delete lstConsToDelete;
                }
            }
            catch(Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            }
    }

}