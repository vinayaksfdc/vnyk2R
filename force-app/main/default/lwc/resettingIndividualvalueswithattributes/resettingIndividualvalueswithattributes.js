import { LightningElement,api } from 'lwc';

export default class ResettingIndividualvalueswithattributes extends LightningElement {
    @api recordId;
    @api objectApiName='contact';
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        console.log('inputFields'+inputFields);
        if (inputFields) {
            inputFields.forEach(field => {
                console.log(JSON.stringify(field));
                if(field.name === "Email") {
                    field.reset();
                }
            });
        }
    }
    
}