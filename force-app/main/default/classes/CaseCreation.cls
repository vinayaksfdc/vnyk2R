public class CaseCreation {

    @AuraEnabled
    public static void createCase(Case caseRecord){
        system.debug(caseRecord);
    }
}