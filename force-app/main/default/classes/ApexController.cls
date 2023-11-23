public class ApexController {
	  
     @AuraEnabled
 public static String serverEcho (String firstName) 
 {
     system.debug('++?????????????'+firstName);
  return('Hello from the server'+ firstName); 
 }
}