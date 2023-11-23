global class Batch_Forecast_Opportunity implements Database.Batchable<AggregateResult> { 
    global Integer jobCounter = 1;
    global Batch_Forecast_Opportunity(){
        String query = 'SELECT Count(Id), sum(amount),Business_Unit__c,owner.Name,OwnerId,Calendar_Year(CloseDate), Calendar_Month(CloseDate) FROM Opportunity WHERE StageName = \'Closed Won\' and Calendar_Year(CloseDate)='+system.today().year() + ' GROUP BY  Calendar_Year(CloseDate), Calendar_Month(CloseDate) ,Business_Unit__c,owner.Name,OwnerId ORDER BY Count(Id) DESC';
    }
    global Batch_Forecast_Opportunity(String s){
        system.debug('s--->'+s);
        //  String query = 'SELECT Count(Id), sum(amount),Business_Unit__c,owner.Name,OwnerId,Calendar_Year(CloseDate), Calendar_Month(CloseDate) FROM Opportunity WHERE StageName = \'Closed Won\' and Calendar_Year(CloseDate)='+system.today().year() + ' GROUP BY  Calendar_Year(CloseDate), Calendar_Month(CloseDate) ,Business_Unit__c,owner.Name,OwnerId ORDER BY Count(Id) DESC';
    }
    global target__c month(Target__C objTar,Integer month,Decimal Amt){
        if(month==1){
            objTar.January__c=Amt;
        }
        if(month==2){
            objTar.February__c=Amt;
        }
        if(month==3){
            objTar.March__c=Amt;
        }if(month==4){
            objTar.April__c=Amt;
        }
        if(month==5){
            objTar.May__c=Amt;
        }
        if(month==6){
            objTar.June__c=Amt;
        }
        if(month==7){
            objTar.July__c=Amt;
        }
        if(month==8){
            objTar.august__c=Amt;
        }
        if(month==9){
            objTar.september__c=Amt;
        }
        if(month==10){
            objTar.october__c=Amt;
        }
        if(month==11){
            objTar.November__c=Amt;
        }
        if(month==12){
            objTar.December__c=Amt;
        }
        return objTar;
        
    }
    global Iterable<AggregateResult> start(Database.BatchableContext bc){
        String query = 'SELECT Count(Id), sum(amount),Business_Unit__c,owner.Name,OwnerId,Calendar_Year(CloseDate), Calendar_Month(CloseDate) FROM Opportunity WHERE StageName = \'Closed Won\' and Calendar_Year(CloseDate)='+system.today().year() + ' GROUP BY  Calendar_Year(CloseDate), Calendar_Month(CloseDate) ,Business_Unit__c,owner.Name,OwnerId ORDER BY Count(Id) DESC';
        system.debug(query);
        return new AggregateResultIterable(query);
    } 
    // The batch job executes and operates on one batch of records
    global void execute(Database.BatchableContext bc, List<sObject> scope){ 
        /*List<AggregateResult> AggregateRes=[SELECT Count(Id), sum(amount),ownerId,Business_Unit__c,owner.Name ,Calendar_Year(CloseDate), Calendar_Month(CloseDate)
FROM Opportunity 
WHERE StageName = 'Closed Won' and owner.Name in ('vinay bule','B Bhramarambika')

GROUP BY  Calendar_Year(CloseDate), Calendar_Month(CloseDate) ,Business_Unit__c,owner.Name,OwnerId
ORDER BY Count(Id) DESC]; */
        Map<string,target__c> mapTarget=new Map<string,target__c>();
        Map<Id,List<Target__c>> maptargetObj=new Map<Id,List<target__c>>();
        
        List<target__c> targetObjectList=[select Id,business_unit_New__c,Year__c,user__c,User__r.Name from  target__c];
        for(target__c targetObject:targetObjectList)
        {
            string temp = targetObject.business_unit_New__c + '#'+targetObject.user__c;
            
            mapTarget.put(temp,targetObject);
        }
        List<Target__c> targetList=new List<Target__c>();
        Map<String,Target__c> knowTarMap = new Map<String,Target__c>();
        for(sObject sObj : scope) {
            
            AggregateResult ar = (AggregateResult)sObj;
            
            
            string temp1 = ar.get('Business_Unit__c') + '#'+ar.get('OwnerId');
            
            
            if(mapTarget.get(temp1)!=Null && mapTarget.get(temp1).business_unit_New__c!=Null && mapTarget.get(temp1).user__c!=Null && mapTarget.get(temp1).Year__c!=Null){
                
                if(mapTarget.get(temp1).business_unit_New__c==ar.get('Business_Unit__c') &&
                   mapTarget.get(temp1).user__c==ar.get('OwnerId') && 
                   integer.valueof(mapTarget.get(temp1).Year__c)==ar.get('expr2')
                  )
                {
                    system.debug('executing'+ar.get('expr3'));
                    Target__c  objTar=new   Target__c();
                    
                    if(knowTarMap.containsKey(mapTarget.get(temp1).Id) && knowTarMap.get(mapTarget.get(temp1).Id)!=null){
                        
                        objTar=knowTarMap.get(mapTarget.get(temp1).Id);  
                        target__c  existingtar=month(objTar,Integer.valueOf(ar.get('expr3')),(Decimal)ar.get('expr1'));
                        
                        knowTarMap.put(mapTarget.get(temp1).Id,existingtar);
                        system.debug('knowTarMap---91 >>'+knowTarMap);
                    }else{
                        target__c tr=new target__c();
                        
                        Target__c newTr=month(tr,Integer.valueOf(ar.get('expr3')),(Decimal)ar.get('expr1'));
                        newTr.Id=mapTarget.get(temp1).Id;
                        
                        
                        knowTarMap.put(newTr.Id,newTr);
                        system.debug('knowTarMap---132 >>'+knowTarMap);
                    } 
                    
                    system.debug('knowTarMap 134-->>>>>'+knowTarMap);
                } //ended
            }
        }
        
        system.debug('keyset'+knowTarMap.keyset());
        system.debug('values'+knowTarMap.values());
        
        update knowTarMap.values();
        // ((Target__c:{October__c=8000.0, Id=a0M2v00000QO2YfEAL}))
        //a0C7E00000D2UdeUAF, a0C7E00000D2V4GUAV}
        List<id> listtargetids=new List<id>();
        
        
        system.debug('Size'+knowTarMap.size());
        List<Database.SaveResult> updateResults = Database.update(targetList, false);
        for(Integer i=0;i<updateResults.size();i++){
            if (updateResults.get(i).isSuccess()){
                updateResults.get(i).getId();
                system.debug('updateResults.get(i).getId ===>>>'+updateResults.get(i).getId());
                
            }else if (!updateResults.get(i).isSuccess()){
                // DML operation failed
                Database.Error error = updateResults.get(i).getErrors().get(0);
                String failedDML = error.getMessage();
                targetList.get(i);//failed record from the list
                system.debug('Failed ID'+updateResults.get(i).Id);
            }
            
        }
        
        
        /*for(sObject sObj : scope) {
Target__c targetObj=new Target__c();
AggregateResult ar = (AggregateResult)sObj;
system.debug(sObj);

}*/
    }
    // The batch job finishes
    global void finish(Database.BatchableContext bc){ 
        
        //Database.executeBatch(this, jobCounter);
        
    }
}