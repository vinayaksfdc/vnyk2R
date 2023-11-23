import { LightningElement,api } from 'lwc';

export default class Recordeditform extends LightningElement {
    zooId;
    /** Pls ignore getter and setter here as it does not have any significance **/
    @api
    get recordId() {
        return this.zooId;
    }
    set recordId(value) {
        this.setAttribute('zooId', value);
        this.zooId = value;
    }

    handleSubmit(event) {
        event.preventDefault();
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        if (inputFields) {
            inputFields.forEach(field => {
                console.log('Field is==> ' + field.fieldName);
                console.log('Field is==> ' + field.value);
            });
        }
        this.template.querySelector('lightning-record-edit-form').submit(inputFields);
    }
    
   
    
    
}