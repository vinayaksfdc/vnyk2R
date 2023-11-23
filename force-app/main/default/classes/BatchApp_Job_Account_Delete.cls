global with sharing class BatchApp_Job_Account_Delete implements System.Schedulable, Database.Batchable<Integer>, Database.Stateful, Database.AllowsCallouts  {
 
    
    private List<JobError> jobErrors = new List<JobError>();
 
    global Integer jobCounter = 1;
 
    public void execute(SchedulableContext sc) {
        Database.executeBatch(this, jobCounter);
    }
 
    public Integer[] start(Database.BatchableContext context) {
        return new Integer[] {jobCounter};
    }
 
    public void execute(Database.BatchableContext context, Integer[] scope)     {
        try{
           
                if(scope[0] == 1) {
                    //add your code here to run as part of 1st batch
                } else if (scope[0] == 2){
                    //add your code here to run as part of 2nd batch
                }  else if (scope[0] == 3){
                    //add your code here to run as part of 3rd batch
                }
             
        } catch (Exception ex){
            JobError jobError = new JobError();
            jobError.records = new List<SObject>();
            jobError.message = 'Exception: ' + ex.getTypeName() + ': ' + ex.getMessage()  + ' -- ' + ex.getCause();
            jobErrors.add(jobError);
        }
    }
 
    public void finish(Database.BatchableContext context){
        system.debug('jobCounter'+jobCounter);
        if (jobCounter<3){
            jobCounter++;
            Database.executeBatch(this, jobCounter);
        }
    }
 
    public class JobError{
        public String message;
        public List<SObject> records;
    }
 
    public void setJobError(List<JobError> jobErrors){
        this.jobErrors = jobErrors;
    }
 
 
}