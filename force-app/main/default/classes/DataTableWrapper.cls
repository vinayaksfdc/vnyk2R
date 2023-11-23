//wrapper class for data table
public class DataTableWrapper {
    @AuraEnabled
    public List<LabelDescriptionWrapper> ldwList;
    @AuraEnabled
    public List<sObject> sobList;
    @AuraEnabled
    public List<String> fieldsList;
    @AuraEnabled
    public Integer totalCount;
}