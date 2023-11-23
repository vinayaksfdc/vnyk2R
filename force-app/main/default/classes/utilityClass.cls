public without sharing class utilityClass {
     
    
        public static void getAccFieldsetFields(Id recordId, String objectName, String fieldSetName) {
            Schema.SObjectType objectType = null;
            System.debug('quote line item record id'+recordId);
            
            if (recordId != null) {
                objectType = recordId.getSobjectType();
            }
            
            if (String.isNotBlank(objectName)) {
                objectType = Schema.getGlobalDescribe().get(objectName);
            }
            system.debug('objectType'+objectType);
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            System.debug('objectDescribe'+objectDescribe);
            Map<String, Schema.FieldSet> fieldSetMap = objectDescribe.fieldSets.getMap();
            system.debug(objectDescribe.fieldSets.getMap());
            system.debug('fieldSetName'+fieldSetName);
            system.debug(fieldSetMap.get(fieldSetName));
            Schema.FieldSet fieldSet = fieldSetMap.get(fieldSetName);
            system.debug('fieldSet.getFields()'+fieldSet.getFields());
            List<Schema.FieldSetMember> fieldSetMembers = fieldSet.getFields();
            
            
            for (Schema.FieldSetMember fsm : fieldSetMembers) {
                 
                 system.debug(fsm.getFieldPath());
            }
            
            
        }
    

        public static List<Schema.FieldSetMember> readFieldSet(String fieldSetName, String ObjectName)
    {
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(ObjectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();

        //system.debug('====>' + DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName));

        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName);

        //List<Schema.FieldSetMember> fieldSetMemberList =  fieldSetObj.getFields();
        //system.debug('fieldSetMemberList ====>' + fieldSetMemberList);  
        return fieldSetObj.getFields(); 
    }  

    public static void  getFields()
    {
        String fieldsFromFieldSet = '';
        List<Schema.FieldSetMember> fieldSetMemberList =  Util.readFieldSet('Account_Field_Set','Account');
        system.debug('fieldSetMemberList'+fieldSetMemberList);
        for(Schema.FieldSetMember fieldSetMemberObj : fieldSetMemberList)
        {
            system.debug('API Name ====>' + fieldSetMemberObj.getFieldPath()); //api name
          /*   system.debug('Label ====>' + fieldSetMemberObj.getLabel());
            system.debug('Required ====>' + fieldSetMemberObj.getRequired());
            system.debug('DbRequired ====>' + fieldSetMemberObj.getDbRequired());
            system.debug('Type ====>' + fieldSetMemberObj.getType());   //type - STRING,PICKLIST */
            fieldsFromFieldSet += fieldSetMemberObj.getFieldPath()+',';
            
        }
        system.debug(fieldsFromFieldSet);
    }  
        @AuraEnabled
    public static String getFieldsAndRecords(String strObjectApiName, String strfieldSetName)
    {
        Map<String, String> returnMap = new Map<String,String>();
            if(!String.isEmpty(strObjectApiName) && !String.isEmpty(strfieldSetName)){
                //get fields from FieldSet
                SObject sObj = (SObject)(Type.forName('Schema.'+ strObjectApiName).newInstance());
                List<Schema.FieldSetMember> lstFSMember = 
                sObj.getSObjectType().getDescribe().fieldSets.getMap().get(strfieldSetName).getFields();

                //prepare SOQL query based on fieldAPIs	
                String query = 'SELECT ';
                    for(Schema.FieldSetMember f : lstFSMember) {
                    query += f.getFieldPath() + ', ';
                    }
                query += 'Id FROM ' + strObjectApiName +' limit 10' ;
                List<SObject> lstRecords = Database.query(query);
                system.debug(lstRecords);
                //prepare a map which will hold fieldList and recordList and return it
                returnMap.put('FIELD_LIST', JSON.serialize(lstFSMember));
                returnMap.put('RECORD_LIST', JSON.serialize(lstRecords));
                return JSON.serialize(returnMap);
            }
        return null;
    }

    public static String getFieldsAndRecords(String strObjectApiName, String strfieldSetName,
                                             String criteriaField, String criteriaFieldValue){
        Map<String, String> returnMap = new Map<String,String>();
        if(!String.isEmpty(strObjectApiName) && !String.isEmpty(strfieldSetName)){
            //get fields from FieldSet
            SObject sObj = (SObject)(Type.forName('Schema.'+ strObjectApiName).newInstance());
            List<Schema.FieldSetMember> lstFSMember = 
                sObj.getSObjectType().getDescribe().fieldSets.getMap().get(strfieldSetName).getFields();

	    //prepare SOQL query based on fieldAPIs	
	    String query = 'SELECT ';
	    for(Schema.FieldSetMember f : lstFSMember) {
	        query += f.getFieldPath() + ', ';
            }
            query += 'Id FROM ' + strObjectApiName ;
            system.debug(query);
            //Just in case criteria field not specified then it will return all records
            if(!(String.isEmpty(criteriaField) && String.isEmpty(criteriaFieldValue))){
                query += ' WHERE ' + criteriaField + '=\'' + criteriaFieldValue + '\'';
            }
                        
	    //execute query
             List<SObject> lstRecords = Database.query(query);
            
             //prepare a map which will hold fieldList and recordList and return it
	     returnMap.put('FIELD_LIST', JSON.serialize(lstFSMember));
	     returnMap.put('RECORD_LIST', JSON.serialize(lstRecords));
	     return JSON.serialize(returnMap);
        }
        return null;
    }
}