/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
    
  import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import {cars} from 'c/data';

export default class Car_Card extends LightningElement {
   
    @track cardetails=cars;
    @track details;
    @wire(CurrentPageReference) pageRef;
    @track car;
 

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        
         
        this.details = dogDtl;

        for(var i=0;i<this.cardetails.length;i++)
        {
            if(this.cardetails[i].Id===this.details)
            {
                console.log('Index....'+i);
                console.log('cardetail....'+this.cardetails[i]);
                console.log(JSON.stringify(this.cardetails[i]));
                 
                
            }
        }
        
       
    }


}