/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_RecordEditForm extends NavigationMixin(LightningElement) {

    renderedCallback() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                if(field.fieldName == 'Name')
                    field.value = 'Tushar Sharma';
                if(field.fieldName == 'AccountNumber')
                    field.value = '987987';
            });
        }
    }

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        //Check your custom validation
       /* const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                if(field.fieldName == 'Name') {
                    //custom Error
                }
            });
        }
        */
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }

     handleSuccess(event){
        //const updatedRecordId = event.detail.id;
        // Generate a URL to a User record page
        console.log('==============record id', event.detail.id);
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                actionName: 'view',
            },
        });
     }
}