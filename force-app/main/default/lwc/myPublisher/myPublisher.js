import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class MyPublisher extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    displayLabradorDetails(){
        fireEvent(this.pageRef, "eventdetails", "Breed - Labrador");
    }
}