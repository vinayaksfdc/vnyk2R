/**
 * @File Name          : LCC_DataViewMainController.cls
 * @Description        : Generic Methods for data view - both Aura and LWC
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Sasank Subrahmanyam V
 * @Last Modified On   : 5/31/2019, 2:59:58 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    2/12/2018, 2:59:09 PM   Sasank Subrahmanyam V     Initial Version
**/

public with sharing class LCC_DataViewMainController{
    
    //*****************************************************************************
    // RETURNS LIST OF sOBJECTS MAP (WITH OTHER INFORMATION) BASED ON QUERY TYPE
    //
    @AuraEnabled
    public static Map<String, Object> getSObjectsMap(Map<String, Object> params) {
        system.debug('params => '+ params);
        Id recordId = params.containsKey('recordId') ? (Id)params.get('recordId') : null;
        String childObjectName = params.containsKey('childObjectName') ? (String)params.get('childObjectName') : null;
        String fields = params.containsKey('fields') ? (String)params.get('fields') : null;
        String whereCondition = params.containsKey('whereCondition') ? (String)params.get('whereCondition') : null;
        String userFilterConditions = params.containsKey('userFilterConditions') ? (String)params.get('userFilterConditions') : null;
        String additionalConditions = params.containsKey('additionalConditions') ? (String)params.get('additionalConditions') : null;
        String orderBy = params.containsKey('orderBy') ? (String)params.get('orderBy') : null;
        String queryType = params.containsKey('queryType') ? (String)params.get('queryType') : null;
        String soslSearchTerm = params.containsKey('soslSearchTerm') ? (String)params.get('soslSearchTerm') : null;
        Boolean sortAscending = params.containsKey('sortAscending') ? (Boolean)params.get('sortAscending') : false;
        Boolean getQueryLocator = params.containsKey('getQueryLocator') ? (Boolean)params.get('getQueryLocator') : false;
        Integer limitRecords = params.containsKey('limitRecords') ? Integer.valueOf(params.get('limitRecords')) : null;
        
        try{
            //Initial checks
            String limitRecordsStr = String.valueOf(Integer.valueOf(limitRecords));
            additionalConditions = String.isNotBlank(additionalConditions) ? additionalConditions.trim().removeStartIgnoreCase('AND').removeEndIgnoreCase('AND') : '';
            
            //Declare query string
            String query;
            
            //Query initialization for Soql and Sosl
            if(queryType == 'SOQL'){
                query = 'SELECT Id, ' + fields + ' FROM ' + childObjectName;
            }
            else if(queryType == 'SOSL') {
                query = 'Id, ' + fields;
            }

            //Adding where condition
            if(String.isNotBlank(whereCondition)){
                query += ' WHERE ' + whereCondition + '=\''+ recordId + '\'' + (String.isNotBlank(additionalConditions) ? 'and '+additionalConditions : '') + (String.isNotBlank(userFilterConditions) ? 'and '+userFilterConditions : '');
            }
            else if(String.isNotBlank(additionalConditions)){
                query += ' WHERE ' + additionalConditions + (String.isNotBlank(userFilterConditions) ? 'and '+userFilterConditions : '');
            }
            else if(String.isNotBlank(userFilterConditions)){
                query += ' WHERE ' + userFilterConditions;
            }
            
            //Adding order by and limit records
            if(String.isNotBlank(orderBy) && queryType == 'SOQL'){
                query += ' ORDER BY ' + orderBy + (sortAscending?' ASC ':' DESC ');
            }
            
            if(String.isNotBlank(limitRecordsStr)) {
                query += ' LIMIT ' + limitRecordsStr;
            }
            
            //Log the query before getting query results from database
            Map<String, Object> returnMap = new Map<String, Object>();
            List<sObject> sObjectsList = new List<sObject>();
            if(!getQueryLocator) {            
                if(queryType == 'SOQL'){
                    system.debug('query => '+query);
                    sObjectsList = Database.query(query);
                }
                else if(queryType == 'SOSL') {
                    query = 'FIND \'' + String.escapeSingleQuotes(soslSearchTerm) + '\' IN ALL FIELDS RETURNING ' + childObjectName + '(' + query + ')';
                    system.debug('query => '+query);
                    sObjectsList = Search.query(query)[0];
                }
            } else {
                returnMap.put('iterator', new ApexPages.StandardSetController(Database.getQueryLocator(query)));
            }

            returnMap.put('records', sObjectsList);
            
            //Log the result
            system.debug('returnMap => '+returnMap);
            
            return returnMap;     
        }
        catch(Exception ex) {
            system.debug('Error => '+ex.getMessage());
            throw new AuraHandledException(ex.getMessage());
        }   
    }
    
    //*****************************************************************************
    // UPDATE LIST OF sOBJECTS (FOR FUTURE ENHANCEMENTS)
    //
    @AuraEnabled
    public static List<sObject> updateSObjectsCc(List<sObject> sObjects) {                
        update sObjects;
        return sObjects;        
    }
    
    //*****************************************************************************
    // DELETE LIST OF sOBJECT (FOR FUTURE ENHANCEMENTS)
    //
    @AuraEnabled
    public static void deleteSObjectsCc(List<sObject> sObjects) {
        delete sObjects;        
    }
    
    //*****************************************************************************
    // GET PICKLIST VALUES (FOR FUTURE ENHANCEMENTS)
    //
    @AuraEnabled
    public static Map<String, Map<String,String>> getPicklistValues(String childObjectName, String picklistFieldOptions) {
        
        if(string.isNotBlank(picklistFieldOptions)){            
            Map<String, Map<String,String>> picklistValuesMap = new Map<String, Map<String,String>>();
            
            for(String picklistField : picklistFieldOptions.split(',')){                
                picklistField = picklistField.trim();
                Schema.DescribeFieldResult stagesFR = Schema.getGlobalDescribe().get(childObjectName).getDescribe().fields.getMap().get(picklistField).getDescribe();
                List<Schema.PicklistEntry> stagesPle = stagesFR.getPicklistValues();
                
                Map<String,String> valuesList = new Map<String,String>();
                
                for( Schema.PicklistEntry s : stagesPle){
                    valuesList.put(s.getValue(),s.getLabel());
                }                
                picklistValuesMap.put(picklistField, valuesList);                
            }            
            return picklistValuesMap;            
        }        
        return null;        
    }   
    
}