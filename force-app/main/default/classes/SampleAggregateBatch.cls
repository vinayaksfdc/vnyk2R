//SampleAggregateBatch  
 
  
   // String query'SELECT COUNT(Id), AccountId FROM Contact GROUP BY AccountId';
    global class SampleAggregateBatch implements Database.Batchable<AggregateResult>,database.stateful {  
    
     
    global SampleAggregateBatch(){
        
    }
  
    global Iterable<AggregateResult> start(Database.BatchableContext bc){
           String query = 'SELECT COUNT(Id), AccountId FROM Contact GROUP BY AccountId';
        system.debug(query);
        return new AggregateResultIterable(query);
    } 
     
    // The batch job executes and operates on one batch of records
    global void execute(Database.BatchableContext bc, List<sObject> scope){ 
         
    }
    // The batch job finishes
    global void finish(Database.BatchableContext bc){ }
}