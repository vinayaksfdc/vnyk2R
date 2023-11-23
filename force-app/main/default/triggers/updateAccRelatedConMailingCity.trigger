trigger updateAccRelatedConMailingCity on Account (after update){
    Set<Id> accId=new Set<Id>();
    for(Account acc:Trigger.new){
    if(acc.BillingCity != null && acc.BillingCity != Trigger.oldMap.get(acc.Id).BillingCity){
    accId.add(acc.Id);
    }
    }
    List<Contact> conListToUpdate = new List<Contact>();
    List<Contact> conList = [Select Id,MailingCity,AccountId,Account.BillingCity from Contact where AccountId=:accId ];
    if(conList.size()>0){
    for(Contact conObj:conList){
    if(conObj.MailingCity!=conObj.Account.BillingCity){
    conObj.MailingCity=conObj.Account.BillingCity;
    conListToUpdate.add(conObj);
    }
    }
    }
    if(conListToUpdate.size()>0){
    update conListToUpdate;
    }
    }