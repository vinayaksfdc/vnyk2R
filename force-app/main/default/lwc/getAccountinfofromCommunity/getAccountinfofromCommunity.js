/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findCommunitycontacts';
import Id from '@salesforce/user/Id';

export default class GetAccountinfofromCommunity extends LightningElement { 
    userId = Id;
    

    searchKey = '';
    contacts;
    error;
    accountId;

    handleSearch(event) {
        console.log('handle search executing');
        console.log('User Id'+this.userId);
        findContacts({ searchKey: this.userId })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });

           
            this.accountId = event.detail.id;
    }
    overrideValue() {
        this.myValue = this.contacts;
    }
}