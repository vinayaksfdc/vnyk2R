public class lwcCSVUploaderController {
    
    
        @AuraEnabled
        public static list<Account> readCSVFile(Id idContentDocument){
            list<Account> lstAccsToInsert = new list<Account>();
            if(idContentDocument != null) {
                
                // getting File Data based on document id 
                ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
                // split the file data
                list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');
                	system.debug(lstCSVLines);
                for(Integer i = 1; i < lstCSVLines.size(); i++){
                    Account objAcc = new Account();
                    String s1 = lstCSVLines[i];

List<String> lst = s1.split('"');
system.debug('lst---->>>'+lst);
List<String> finalList = new List<String>();

for(String s : lst){
    if(s.countMatches(',') != 1){
        
        List<String> lst2 = new List<String>();
        lst2 = s.split(',');
        
        for(String s2 : lst2){
            
            finalList.add(s2);
        }
        
    }else{finalList.add(s);}
  
}

for(string s : finalList){
    s= s.trim();
    if(string.isNotBlank(s) && s != ','){
        
        system.debug('===============>'+s);
    }
    
}

                    
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
    }