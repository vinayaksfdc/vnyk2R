import { LightningElement,api } from 'lwc';

export default class ResettingtheForm extends LightningElement {
    @api recordId;
    @api objectApiName;

handleReset(event) {
    const inputFields = this.template.querySelectorAll(
        'lightning-input-field'
    );
    if (inputFields) {
        inputFields.forEach(field => {
            field.reset();
        });
    }
 }
}