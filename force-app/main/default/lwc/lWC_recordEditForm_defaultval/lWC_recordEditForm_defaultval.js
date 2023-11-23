import { LightningElement } from 'lwc';

export default class LWC_recordEditForm_defaultval extends LightningElement {
    onSubmitHandler(event) {
        event.preventDefault();    // Get data from submitted form
        const fields = event.detail.fields;    // Here you can execute any logic before submit
        // and set or modify existing fields
        fields.Name = fields.Name + fields.Phone    // You need to submit the form after modifications
        this.template
            .querySelector('lightning-record-edit-form').submit(fields);
    }
}