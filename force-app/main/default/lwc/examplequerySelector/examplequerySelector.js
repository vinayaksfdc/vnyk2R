import { LightningElement } from 'lwc';
 
export default class examplequerySelector extends LightningElement {
    toggleRow() {
    console.log('Lightning Card Header-->'+this.template.querySelector('lightning-card').title);
    console.log('Lightning Card Header-->'+this.template.querySelector('.main').title);
    console.log('Lightning Button-->'+this.template.querySelector('lightning-button').name);
    this.template.querySelector('lightning').name
        
    }
}