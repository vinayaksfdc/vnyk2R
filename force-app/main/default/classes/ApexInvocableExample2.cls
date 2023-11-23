public class  ApexInvocableExample2{
    
    
    
    @InvocableMethod(label='Get  Names From Flow' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
    public static void  getAccountNames(List<List<string>> Names) {
 	 		system.debug('accountNames  ApexInvocableExample2 ___________________>>>>>>>>>>>>>>>>>>'+Names);
        
         system.debug('accountNames  ApexInvocableExample2 ___________________>>>>>>>>>>>>>>>>>>'+Names);
         
    }
    
}