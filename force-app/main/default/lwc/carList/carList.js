/* eslint-disable no-console */
import { LightningElement,track,wire} from 'lwc';
// eslint-disable-next-line no-unused-vars
import{CurrentPageReference} from 'lightning/navigation';
import{fireEvent} from 'c/pubsub';
import {cars} from 'c/data';

export default class CarList extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    @track selectedCarId;
    @track cars=cars;

   carSelectHandler(event){
    const carId = event.detail;
    this.selectedCarId = carId;
    console.log(this.selectedCarId);
    fireEvent(this.pageRef,'eventdetails',this.selectedCarId);
    console.log('event fired');
}

displayLabradorDetails(){
    fireEvent(this.pageRef, "eventdetails", "Breed - Labrador");
}
}