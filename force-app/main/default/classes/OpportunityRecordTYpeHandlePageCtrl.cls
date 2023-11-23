public class OpportunityRecordTYpeHandlePageCtrl {

  public apexpages.StandardController cont {set;get;}
 
 public account acc {set;get;}
 public account acc1 {set;get;}
 public OpportunityRecordTYpeHandlePageCtrl(apexpages.StandardController controller){
 cont=controller;
 string[] ss= new string[]{'name','email__c','industry','rating'};
 acc=(account)cont.getrecord();
 }
 public void savenew(){
 insert acc;
 acc.clear();
 }
}