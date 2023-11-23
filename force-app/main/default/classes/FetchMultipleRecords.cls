public class FetchMultipleRecords {
    
  @AuraEnabled(Cacheable=true)
    public static List<Contact> search() {
	return [SELECT Id,Name,FirstName, LastName,Email FROM Contact LIMIT 10];        
    }
    
}