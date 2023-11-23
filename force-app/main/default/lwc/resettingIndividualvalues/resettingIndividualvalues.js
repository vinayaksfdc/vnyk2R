import { LightningElement,api } from 'lwc';

export default class ResettingIndividualvalues extends LightningElement {
    @api recordId;
    @api objectApiName;
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            '.contactName'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
     
}