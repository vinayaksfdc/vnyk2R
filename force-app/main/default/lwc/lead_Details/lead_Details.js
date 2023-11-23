import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lead_Details extends LightningElement {
    @track recordId;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        this.recordId = dogDtl;
    }
}