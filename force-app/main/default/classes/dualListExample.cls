public class dualListExample {

    public String displayText {get; set;}
    public dualListExample() {
        displayText = String.escapeSingleQuotes(
            ApexPages.currentPage().getParameters().get('displayText'));
    }

     @AuraEnabled
    public static Attachment generatePDF(String txtValue){
        
    /*     Pagereference pg = Page.renderAsPDF;
        pg.getParameters().put('displayText', txtValue);

        Contact con = new Contact(Id='0032v00002ypAntAAE');
        Attachment objAttachment = new Attachment();
        objAttachment.Name = 'J2S.pdf';
        objAttachment.ParentId = con.Id;
        objAttachment.Body = pg.getContentaspdf();   
        objAttachment.IsPrivate = false;
        insert objAttachment; */
        Attachment objAttachment = new Attachment();
        return objAttachment;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getSObjects() {        
        Map<String, String> sObjectNamebyLabel = new Map<String, String>();
        for(SObjectType objectType : Schema.getGlobalDescribe().values()) {
            DescribeSObjectResult sObjectDescribe = objectType.getDescribe();
            if(sObjectDescribe.isAccessible() && sObjectDescribe.isQueryable()) {
                sObjectNamebyLabel.put(sObjectDescribe.getLabel(),sObjectDescribe.getName());
            }
        }        
        return sObjectNamebyLabel;
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, String>  getFeildApiNames(String objectName){
        Map<String, String> fieldApiNamebyLabel = new Map<String, String>();
        List<string> fieldNames=new List<string>();
        try {
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Map<String, Schema.SObjectField> fields = schemaMap.get(objectName).getDescribe().fields.getMap();
            Schema.DescribeFieldResult fieldInfo = null;
                for (Schema.SObjectField field : fields.values()) {
                    fieldInfo = field.getDescribe();
                    system.debug(fieldInfo.getName()+'====='+fieldInfo.getLabel());
                        fieldApiNamebyLabel.put(fieldInfo.getLabel(),fieldInfo.getName());
                }    

        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
        return fieldApiNamebyLabel;
    }

      @AuraEnabled 
    public static List<sObject> getList(List<String> fields,String objectName) {  
        string commaSepratedFields='';
            for(String s: fields){
                if(commaSepratedFields == null || commaSepratedFields == ''){
                    commaSepratedFields = s;
                }else{
                    commaSepratedFields = commaSepratedFields + ', ' + s;
                }
            }
        string query = 'select ' + commaSepratedFields + ' from ' + objectName + ' Limit 5';
        system.debug(query);
        return  database.query(query);
    }
}