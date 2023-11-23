/* eslint-disable no-console */
import { LightningElement,track,wire,api} from 'lwc';
// eslint-disable-next-line no-unused-vars
import{CurrentPageReference} from 'lightning/navigation';
import{fireEvent} from 'c/pubsub';
import {cars} from 'c/data';

 import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';


export default class List extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api tilesAreDraggable = false;
    @track selectedCarId;
    @track cars=cars;

   carSelectHandler(event){
    const carId = event.detail;
    this.selectedCarId = carId;
    console.log(this.selectedCarId);
    //fireEvent(this.pageRef,'eventdetails',this.selectedCarId);
    console.log('line 22 executed');
  //  this.buttonClick();    
}

 @wire(MessageContext)
    messageContext;

buttonClick(){
    const payload = { recordId: this.selectedCarId };

        publish(this.messageContext, recordSelected, payload);

  
    console.log('event fired');
}

displayLabradorDetails(){
    fireEvent(this.pageRef, "eventdetails", "Breed - Labrador");
}
}