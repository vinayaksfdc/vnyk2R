/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
    
import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import {cars} from 'c/data';
export default class CarTargetComp extends LightningElement {   @track cardetails=cars;
    @track details;
    @track car;
    areDetailsVisible = false;
  
    @wire(CurrentPageReference) pageRef;
    @track car;
 

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        console.log('event Recived');
         
        this.details = dogDtl;
        for(var i=0;i<this.cardetails.length;i++)
        {
            if(this.cardetails[i].Id===this.details)
            {
                console.log('Index....'+i);
                console.log('cardetail....'+this.cardetails[i]);
                console.log(JSON.stringify(this.cardetails[i]));
                this.areDetailsVisible = true;
                this.car=this.cardetails[i];
            }
        }
        
        
       
    }

    handleDragOver(event) {
        event.preventDefault();
    }


    handleDrop(event) {
        event.preventDefault();

        // Product__c from LDS
        // eslint-disable-next-line no-unused-vars
           const car = JSON.parse(event.dataTransfer.getData('car'));
        console.log(car); // eslint-disable-next-line no-debugger

 
    }
}