import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccounts';
export default class DeleteAccount1 extends LightningElement {
    totalContacts
    visibleContacts

    totalAccounts
    visibleAccounts
    @wire(getAccountList)
    wiredContact({error, data}){
        if(data){ 
            this.totalContacts = data
            console.log(this.totalContacts)
        }
        if(error){
            console.error(error)
        }
    }
 

    updateContactHandler(event){
        this.visibleContacts=[...event.detail.records]
        console.log(event.detail.records)
    }
    updateAccountHandler(event){
        this.visibleAccounts=[...event.detail.records]
        console.log(event.detail.records)
    }
}