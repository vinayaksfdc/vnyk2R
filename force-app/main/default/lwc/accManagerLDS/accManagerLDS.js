/* eslint-disable no-undef */
import { LightningElement,track,wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

const fieldArray=['Account.Name'];

export default class AccManagerLDS extends LightningElement {

@track name;
@track recordId;

@wire(getRecord,{recordId:'$recordId',fields:fieldArray})
accountRecord;

    handleNameChange(event) {
        
        this.name = event.target.value;
    }

    createAccount() {
        const fields = {'Name':this.accountName};
        
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.recordId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
    getretAccountName(){
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Name.value;
        }
        return undefined;
    }
}