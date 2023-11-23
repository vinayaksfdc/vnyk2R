public with sharing class datatableDemo {
     
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name,Rating, AnnualRevenue, Industry, Phone from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts1() {
        return [SELECT Id, Name,Rating, AnnualRevenue, Industry, Phone from Account Limit 15];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts2() {
        return [SELECT Id, Name,Rating, AnnualRevenue, Industry, Phone,LastModifiedBy.Name,createdby.Name,Owner.Name  from Account Limit 12];
    }


}