import { LightningElement } from 'lwc';
export default class ParentDomExample extends LightningElement {
fieldValue;
    handleChange(event) {
        this.fieldValue = event.target.value;
        this.template.querySelector('div');
        
    }

}