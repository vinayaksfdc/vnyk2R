public class Actions {
    @AuraEnabled
    public String label;
    @AuraEnabled
    public String name;
    
    public Actions(String labelTemp, String nameTemp) {
        label 	  	= labelTemp;
        name 		= nameTemp;
    }
}