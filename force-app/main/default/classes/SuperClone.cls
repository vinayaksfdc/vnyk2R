public class SuperClone {
    private static SuperCloneService service = new SuperCloneService();
    @AuraEnabled
    public static Id doClone(Id parentId) {
        Id clonedId = service.doClone(parentId);
        return clonedId;
    }
}