public class LabelDescriptionWrapper {
    @AuraEnabled
    public String label;
    @AuraEnabled
    public String fieldName;
    @AuraEnabled
    public String type;
    @AuraEnabled
    public boolean sortable;
    @AuraEnabled
    public boolean editable;
    @AuraEnabled
    public TypeAttributes typeAttributes;
    
    public LabelDescriptionWrapper(String labelTemp, String fieldNameTemp, String typeTemp, boolean sortableTemp, boolean editableTemp,TypeAttributes typeAttributesTemp) {
        label 	  = labelTemp;
        fieldName = fieldNameTemp;
        type 	  = typeTemp;
        sortable  = false;//sortableTemp;
        editable = editableTemp;
        typeAttributes = typeAttributesTemp;
    }
}