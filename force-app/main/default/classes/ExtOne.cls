public class ExtOne {
    public ExtOne(ApexPages.StandardController acon) { }
	  public string accrecid {get;set;}
    public String getFoo() {
        return 'foo-One';
    }
    public Pagereference getRedir(){
        system.debug('ApexPages.CurrentPage().getParameters() '+ApexPages.CurrentPage().getParameters());
         if(ApexPages.CurrentPage().getParameters().get('accid') != null){
         accrecid = ApexPages.CurrentPage().getParameters().get('accid');
        }
        return null;
    }
      
         
}