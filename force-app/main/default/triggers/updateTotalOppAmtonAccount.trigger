trigger updateTotalOppAmtonAccount on Opportunity (after insert, after update, after delete) {
    Map<Id, List<Opportunity>> acctIdOpptyListMap = new Map<Id, List<Opportunity>>();
    Set<Id> acctIds = new Set<Id>();
    List<Opportunity> opptyList = new List<Opportunity>();
    if(trigger.isUpdate || trigger.isInsert){
        for(Opportunity oppty : trigger.New){
            if(oppty.AccountId != null){
                acctIds.add(oppty.AccountId);
            }
        }    
    }
    if(trigger.isDelete){
        for(Opportunity oppty : trigger.old){
            if(oppty.AccountId != null){
                acctIds.add(oppty.AccountId);
            }
        }    
    }
    if(acctIds.size() > 0){
        opptyList = [SELECT Amount, AccountId FROM Opportunity WHERE AccountId IN : acctIds];
        for(Opportunity oppty : opptyList){
            if(!acctIdOpptyListMap.containsKey(oppty.AccountId)){
                acctIdOpptyListMap.put(oppty.AccountId, new List<Opportunity>());
            }
            acctIdOpptyListMap.get(oppty.AccountId).add(oppty); 
        }   
        List<Account> acctList = new List<Account>();
        acctList = [SELECT Total_Opportunity_Amount__c FROM Account WHERE Id IN: acctIds];
        for(Account acct : acctList){
            List<Opportunity> tempOpptyList = new List<Opportunity>();
            tempOpptyList = acctIdOpptyListMap.get(acct.Id);
            Double totalOpptyAmount = 0;
            for(Opportunity oppty : tempOpptyList){
                if(oppty.Amount != null){
                    totalOpptyAmount += oppty.Amount;
                }
            }
            acct.Total_Opportunity_Amount__c = totalOpptyAmount;
        }
        update acctList;
    }
}