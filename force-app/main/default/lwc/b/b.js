import { LightningElement } from 'lwc';
export default class B extends LightningElement {

 message = 'Updated count will appear here!';

    updateMessage(event) {
        this.message = event.detail.message;
         alert('Parent--->>>>'+event.detail.message)
    }


}