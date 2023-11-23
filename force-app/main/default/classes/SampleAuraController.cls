public class SampleAuraController {
     
    @AuraEnabled
    Public static void createLead(Lead objLead){
        try{
            //Insert Lead Record
            insert objLead; 
        }catch(DmlException e) {
            //get DML exception message
            throw new AuraHandledException(e.getMessage());
        }catch(Exception e){
            //get exception message
            throw new AuraHandledException(e.getMessage());
        }
        finally {
        }
    } 
}