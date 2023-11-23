import { LightningElement,api } from 'lwc';

export default class con_ex extends LightningElement {

    @api recordId;

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