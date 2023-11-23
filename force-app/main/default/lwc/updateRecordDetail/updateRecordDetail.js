import { LightningElement, api, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ID_FIELD from '@salesforce/schema/Account.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord, getFieldValue, getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';
import updateRecordApex from '@salesforce/apex/AccountController.updateAccountRecord';
 
const accountFields = [NAME_FIELD];
 
export default class UpdateRecordDetail extends LightningElement {
    @api recordId;
    @api objectApiName;
    showSpinner = false;
    name = NAME_FIELD;
    account;
 
    //get the account name field property
    get accountName() {
        return getFieldValue(this.account, NAME_FIELD);
    }
 
    @wire(getRecord, { recordId: '$recordId', fields: accountFields })
    wiredAccount(value) {
        if (value.data)
            this.account = value.data;
        else
            this.account = undefined;
    };
 
    //update the record with lightning record edit form LDS service
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        console.log('in updateRecord LDS');
        this.showSpinner = true;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account Name updated using LDS',
                variant: 'success'
            })
        );
        this.showSpinner = false;
    }
 
    //update the record with uiRecordAPI 
    handleSave(event) {
        event.preventDefault();
        let accountName = this.template.querySelector("lightning-input").value;
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[NAME_FIELD.fieldApiName] = accountName;
        const recordInput = { fields };
        this.updateRecord(recordInput);
    }
 
    //refreshes the cache defaultly
    updateRecord(recordInput) {
        console.log('in updateRecord uiRecordAPI');
        this.showSpinner = true;
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account Name updated using uiRecordAPI',
                        variant: 'success'
                    })
                );
                this.showSpinner = false;
            })
            .catch(error => {
                console.log('error in updateRecord: ' + JSON.stringify(error));
                this.showSpinner = false;
            });
    }
 
    //update the record with apex 
    handleSaveApex(event) {
        event.preventDefault();
        let accountName = this.template.querySelector("lightning-input").value;
        this.updateRecordApex(accountName);
    }
 
    //refreshes the cache explicitly
    updateRecordApex(accountName) {
        console.log('in updateRecord Apex');
        this.showSpinner = true;
        updateRecordApex({ 'recordId': this.recordId, accountName })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account Name updated using Apex',
                        variant: 'success'
                    })
                );
                //either use the eval row(#100) or getRecordNotifyChange row(#101) to refresh cache explicitly
                //eval("$A.get('e.force:refreshView').fire();");
               // getRecordNotifyChange([{ recordId: this.recordId }]);
                this.showSpinner = false;
            })
            .catch(error => {
                this.showSpinner = false;
                console.log('error in updateRecordApex: ' + JSON.stringify(error));
            });        
    }
}