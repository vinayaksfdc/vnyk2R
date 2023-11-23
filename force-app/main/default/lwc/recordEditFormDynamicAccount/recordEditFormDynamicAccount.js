import { LightningElement, api } from 'lwc';

export default class RecordEditFormDynamicAccount extends LightningElement {
    @api recordId;
    @api objectApiName;
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ JSON.strinigify(event.detail.fields));
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
    }
}