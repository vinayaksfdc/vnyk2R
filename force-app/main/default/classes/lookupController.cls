/**
 * @File Name          : lookupController.cls
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Vimal K
 * @Last Modified On   : 3/24/2020, 11:04:02 AM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    1/23/2020   Sasank Subrahmanyam V     Initial Version
 * 1.1    3/23/2020   Vimal K                   SOSL Issue, RecentlyViewed Issue, SubTitle Issue 
**/
public with sharing class lookupController {
    public lookupController() {

    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getSObjectsMap(Map<String, Object> params) {
        system.debug('params => '+ params);
        String objectApiName = params.containsKey('objectApiName') ? (String)params.get('objectApiName') : null;
        String searchFields = params.containsKey('searchFields') ? (String)params.get('searchFields') : null;
        String titleField = params.containsKey('titleField') ? (String)params.get('titleField') : null;
        String subtitleField = params.containsKey('subtitleField') ? (String)params.get('subtitleField') : null;
        String filters = params.containsKey('filters') ? (String)params.get('filters') : null;
        String orderBy = params.containsKey('orderBy') ? (String)params.get('orderBy') : null;
        String queryType = params.containsKey('queryType') ? (String)params.get('queryType') : null;
        String searchTerm = params.containsKey('searchTerm') ? (String)params.get('searchTerm') : null;
        String iconName = params.containsKey('iconName') ? (String)params.get('iconName') : null;
        Boolean sortAscending = params.containsKey('sortAscending') ? (Boolean)params.get('sortAscending') : false;
        Integer limitRecords = params.containsKey('limitRecords') ? Integer.valueOf(params.get('limitRecords')) : null;
        
        try{
            //Initial checks
            String limitRecordsStr = String.valueOf(Integer.valueOf(limitRecords));
            filters = String.isNotBlank(filters) ? filters.trim().removeStartIgnoreCase('AND').removeEndIgnoreCase('AND') : '';
            
            String whereCondition = '';
            for(String ftr : searchFields.split(',')) {
                whereCondition += ftr+' LIKE \'%'+searchTerm+'%\' AND ';
            }
            whereCondition = whereCondition.trim().removeEndIgnoreCase('AND');

            if(String.isNotBlank(filters)) {
                whereCondition += ' AND ' + filters;
            }

            //Declare query string
            String query;

            //Fields to Query
            String fieldsToQuery='CreatedById';
            
            if(titleField!=null){
                fieldsToQuery=titleField;
            }
            if(subtitleField!=null){
                fieldsToQuery+=', ' +subtitleField;
            }
            
            //Query initialization for Soql and Sosl
            if(queryType == 'SOQL'){
                query = 'SELECT Id, ' + fieldsToQuery + ' FROM ' + objectApiName;
            }
            else if(queryType == 'SOSL') {
                query = 'Id, ' + fieldsToQuery;
            }

            //Adding where condition
            query += ' WHERE ' + whereCondition;
            
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
            if(queryType == 'SOQL'){
                system.debug('query => '+query);
                sObjectsList = Database.query(query);
            }
            else if(queryType == 'SOSL') {
                query = 'FIND \'' + String.escapeSingleQuotes(searchTerm) + '\' IN ALL FIELDS RETURNING ' + objectApiName + '(' + query + ')';
                system.debug('query => '+query);
                sObjectsList = Search.query(query)[0];
            }

            List<LookupSearchResult> results = new List<LookupSearchResult>();
            for (sObject sObj : sObjectsList) {
                results.add(
                    new LookupSearchResult(
                        (String)sObj.get('Id'),
                        objectApiName,
                        iconName,
                        (String)sObj.get(titleField),
                        subtitleField != null ? (String)sObj.get(subtitleField) : ''
                    )
                );
            }

            returnMap.put('records', results);
            
            //Log the result
            system.debug('returnMap => '+returnMap);
            
            return returnMap;     
        }
        catch(Exception ex) {
            system.debug('Error => '+ex.getMessage());
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getRecentRecords(Map<String, Object> params) {
        system.debug('params => '+ params);
        String objectApiName = params.containsKey('objectApiName') ? (String)params.get('objectApiName') : null;
        String searchFields = params.containsKey('searchFields') ? (String)params.get('searchFields') : null;
        String titleField = params.containsKey('titleField') ? (String)params.get('titleField') : null;
        String subtitleField = params.containsKey('subtitleField') ? (String)params.get('subtitleField') : null;
        String filters = params.containsKey('filters') ? (String)params.get('filters') : null;
        String orderBy = params.containsKey('orderBy') ? (String)params.get('orderBy') : null;
        String iconName = params.containsKey('iconName') ? (String)params.get('iconName') : null;
        Boolean sortAscending = params.containsKey('sortAscending') ? (Boolean)params.get('sortAscending') : false;
        Integer limitRecords = params.containsKey('limitRecords') ? Integer.valueOf(params.get('limitRecords')) : null;
        
        try {
            //String limitRecordsStr = String.valueOf(Integer.valueOf(limitRecords));
            filters = String.isNotBlank(filters) ? filters.trim().removeStartIgnoreCase('AND').removeEndIgnoreCase('AND') : '';
            

            String recordIds='';
            for (SObject objRecentlyViewed : [SELECT Id FROM RecentlyViewed WHERE Type =:objectApiName ORDER BY LastViewedDate DESC LIMIT 10]) { 
                recordIds+= '\'' + objRecentlyViewed.Id + '\','; 
            }
            
            List<sObject> sObjectsList= new List<sObject>();

            if(String.isNotBlank(recordIds)) {
                String whereCondition = 'Id IN ( ' + recordIds.trim().removeEndIgnoreCase(',') + ')';
                System.debug('whereCondition: '+ whereCondition);         

                if(String.isNotBlank(filters)) {
                    whereCondition += ' AND ' + filters;
                }
    
                //Declare query string
                String query;
    
                //Fields to Query
                String fieldsToQuery='CreatedById';
                
                if(titleField!=null){
                    fieldsToQuery=titleField;
                }
                if(subtitleField!=null){
                    fieldsToQuery+=', ' +subtitleField;
                }
                query = 'SELECT Id, ' + fieldsToQuery + ' FROM ' + objectApiName;
                

                //Adding where condition
                query += ' WHERE ' + whereCondition;
                System.debug('Recently Viewed Records Query => '+query);
                sObjectsList = Database.query(query);
            }

            //Log the query before getting query results from database
            Map<String, Object> returnMap = new Map<String, Object>();            
            List<LookupSearchResult> results = new List<LookupSearchResult>();
            for (sObject sObj : sObjectsList) {
                results.add(
                    new LookupSearchResult(
                        (String)sObj.get('Id'),
                        objectApiName,
                        iconName,
                        (String)sObj.get(titleField),
                        subtitleField != null ? (String)sObj.get(subtitleField) : ''
                    )
                );
            }

            returnMap.put('records', results);
            
            //Log the result
            system.debug('returnMap => '+returnMap);
            
            return returnMap;
        }
        catch(Exception ex) {
            system.debug('Error => '+ex.getMessage());
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public class LookupSearchResult {
        private Id id;
        private String sObjectType;
        private String iconName;
        private String title;
        private String subtitle;

        public LookupSearchResult(
            Id id,
            String sObjectType,
            String iconName,
            String title,
            String subtitle
        ) {
            this.id = id;
            this.sObjectType = sObjectType;
            this.iconName = iconName;
            this.title = title;
            this.subtitle = subtitle;
        }

        @AuraEnabled
        public Id getId() {
            return id;
        }

        @AuraEnabled
        public String getSObjectType() {
            return sObjectType;
        }

        @AuraEnabled
        public String getIconName() {
            return iconName;
        }

        @AuraEnabled
        public String getTitle() {
            return title;
        }

        @AuraEnabled
        public String getSubtitle() {
            return subtitle;
        }
    }
}