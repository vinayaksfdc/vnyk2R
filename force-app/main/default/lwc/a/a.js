import { LightningElement,api } from 'lwc';
export default class A extends LightningElement {

    @api message;

    updateMessage(event) {
        this.message = event.detail.message;
        alert('GP--->>>>'+event.detail.message)
    }
}