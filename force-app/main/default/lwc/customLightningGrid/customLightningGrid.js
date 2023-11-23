import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountsContactRecords';
import deleteAccounts from '@salesforce/apex/AccountController.DeleteAccountsRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomLightningGrid extends LightningElement {
    data = [];
    error;
    @track accounts;
   

    connectedCallback() {
         this.handleLoad();
    }


    handleLoad() {
        getAccounts()
            .then(result => {
                let temp_data = [];
                temp_data = result.map(iterateAccounts => {return {...iterateAccounts}});
                temp_data.forEach(iterateAccounts => {
                    iterateAccounts.showContacts=false;
                })
                this.accounts = temp_data;
                console.log('this Accounts'+JSON.stringify(this.accounts));
            })
            .catch(error => {
                this.error = error;
            });
    }
    toggleRow(event){
        
        let temp_data = [];
        temp_data = this.accounts.map(accInfo => {return {...accInfo}});
          temp_data.forEach(accInfo => {
            if(accInfo.Id == event.target.dataset.recordId) {
                 accInfo.showContacts = !accInfo.showContacts;
                }
        });
         this.accounts= temp_data;
         console.log(JSON.stringify(this.accounts));
    }

     
}