public class importDataFromCSVController {
    
    public Blob csvFileBody{get;set;}
    public String csvAsString{get;set;}
    public String[] csvFileLines{get;set;}
    public List<account> accountlist{get;set;}
    
    public importDataFromCSVController(){
        csvFileLines = new String[]{};
            accountlist= New List<Account>();
    }
    
    public void importCSVFile(){
        Map<String, Integer> colorCodes = new Map<String, Integer>();
        
        
        // Read CSV file body and store it in variable
        csvAsString = csvFileBody.toString();
        system.debug('csvAsString'+csvAsString);
        // Split CSV String to lines
        csvFileLines = csvAsString.split('\n');
        system.debug('csvFileLines at index 0'+csvFileLines[0]);
        
 
        
        
        
 
        
        
    Map<string,integer> mp=new Map<string,integer>();

String headers='Name,AccountNoType,Type,Phone,Fax';
system.debug(csvFileLines[0].split(','));
string[] strLst=csvFileLines[0].split(',');
 
for(Integer i=0;i<strLst.size();i++){
   mp.put(strLst[i],i);
}  
system.debug('Name Index---->>>'+mp.get('Name'));
        
        
      
        // Iterate CSV file lines and retrieve one column at a time.
        /*        for(Integer i=0; i < csvFileLines.size(); i++){
String[] csvRecord = csvFileLines[i].split(',');
Integer a=colorCodes.get('Name');
system.debug('colorCodes get Name----'+a);
Account accObj = new Account() ;
String[] csvRecordData = csvFileLines[i].split(',');

accObj.name = csvRecordData[0] ;
system.debug(accObj.name+'------->'+i);
accObj.accountnumber = csvRecordData[1];
system.debug(accObj.accountnumber+'------->'+i);
accObj.Type = csvRecordData[2];
system.debug(accObj.Type+'------->'+i);
accObj.AccountSource = csvRecordData[3];
system.debug(accObj.AccountSource+'------->'+i);
accObj.Industry = csvRecordData[4];
system.debug(accObj.Industry+'------->'+i);
accountlist.add(accObj);
} */
        // if all correct then insert Account into Org
        /*  if(accountlist.size()>0)
{
Database.SaveResult[] srList;

List<Error__c> errList=new List<Error__c>();

for (Database.SaveResult sr : srList) {
if (sr.isSuccess()) {

System.debug('Successfully inserted account. Account ID: ' + sr.getId());
}
else {

for(Database.Error err : sr.getErrors()) {
Error__c er=new Error__c();
er.Error_Message__c=string.valueof(err.getStatusCode());
er.Name=err.getMessage();
er.Status_code__c=string.valueof(err.getStatusCode());
er.Error_Fields__c=string.valueof(err.getFields());
errList.add(er);
System.debug('The following error has occurred.');                    
System.debug(err.getStatusCode() + ': ' + err.getMessage());
System.debug('Account fields that affected this error: ' + err.getFields());
}
}
}
insert errList;
} */
    }
    
}