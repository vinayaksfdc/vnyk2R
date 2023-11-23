/* eslint-disable no-console */
import { LightningElement,track,wire,api} from 'lwc';
// eslint-disable-next-line no-unused-vars
import{CurrentPageReference} from 'lightning/navigation';
import{fireEvent} from 'c/pubsub';
import {cars} from 'c/data';

export default class SrcTarget extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api tilesAreDraggable = false;
    @track selectedCarId;
    @track cars=cars;

 

displayLabradorDetails(){
    fireEvent(this.pageRef, "eventdetails", "Breed - Labrador");
}
}