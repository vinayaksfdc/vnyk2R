public class accExample {

    public String accregion{set;get;} 
    public String[] regions{set;get;}
    
    
    public void meth(){
        
   
        Account acc=[select id,state__c from account where id='0012v000035FLdkAAG'];
        accregion=acc.state__c;
        system.debug(accregion);
        contact con=[select id,state__c,Accountid from contact where Accountid='0012v000035FLdkAAG'];
        regions = con.state__c.split(';');
        system.debug(regions);
        
        Map<id,account> mapaccounts=new Map<id,account>([select id,Name,State__c from account where State__c In: regions limit 1]);
        
        if(!mapaccounts.isEmpty())
        {
            List<contact> cont=[select id,name,state__c from contact where accountid In:mapaccounts.keyset()];
        }
    }
}