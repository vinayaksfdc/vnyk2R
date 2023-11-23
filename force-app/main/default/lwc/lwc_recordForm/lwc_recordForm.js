import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lwc_recordForm extends LightningElement {
    //fields = ['Name', 'AnnualRevenue', 'Industry'];
    modeName ='view';
    objectApiName = 'Account';
    recordId = '001B000001AR4dE';

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Name = 'Tushar Sharma'; // modify a field
        console.log('fields', fields);
        console.log('fields 2', fields.Name);
        this.template.querySelector('lightning-record-form').submit(fields);
     }

     handleSuccess(event) {
        console.log('fields');
        const evt = new ShowToastEvent({
            title: "Account updated",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}