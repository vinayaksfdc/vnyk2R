/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { LightningElement,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';


import { NavigationMixin } from 'lightning/navigation';
 

export default class FetchAccountRecords extends NavigationMixin(LightningElement) {

    @track accounts;
    @track error;
    @track recordId;

    @wire(getAccountList)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
            console.log(this.accounts);
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    handleClickView(event) {
        this.recordId = event.target.dataset.id;
        console.log('notificationId ' + this.recordId);
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account', // objectApiName is optional
                actionName: 'view'
            }
        });
    }

    handleIconClick(event) {
        console.log('clicked');
        var accountId = event.target.dataset.id;
        console.log('accountId ' + accountId);
        var accountList = this.accounts;
        // eslint-disable-next-line no-unused-vars
        var index;
        var newList = [];
        for (var i = 0; i < accountList.length; i++) {
            console.log(JSON.stringify(accountList[i]));
            if (accountList[i].Id !== accountId) {
                newList.push(accountList[i]);
            }
        }
        console.log(JSON.stringify(newList));
        this.accounts = newList;
        console.log(JSON.stringify(this.accounts.length));

    }
}