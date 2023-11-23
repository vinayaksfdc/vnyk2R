public class TypeAttributes  {
    @AuraEnabled
    public List<Actions> rowActions;
    
    public typeAttributes(List<Actions> rowActionsTemp) {
        rowActions 	  = rowActionsTemp;
    }
}