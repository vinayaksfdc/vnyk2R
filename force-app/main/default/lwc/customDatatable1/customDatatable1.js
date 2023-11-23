/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

/* import{fireEvent} from 'c/pubsub'; */

 
 
import { LightningElement, wire ,track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

import fetchleads from '@salesforce/apex/LeadController.fetchleads';
 

export default class CustomDatatable1 extends LightningElement {
    @wire(CurrentPageReference) pageRef;

   
    @track accounts;  
    @track error;  
    @track recordid;
    @track parentValue;
  
/*     @wire(fetchleads) accounts;
    accounts;   */
    
    @wire(fetchleads)
    wiredContacts({ error, data }) {
        if (data) {
            this.accounts = data;
        /*     console.log('this accounts'+JSON.stringify(this.accounts)); */

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    handleClick(event){
        let targetId = event.target.dataset.targetId;
            console.log('Image clicked'+targetId);
            this.recordid=targetId;
            console.log('record id'+this.recordid);
            fireEvent(this.pageRef, "eventdetails", this.recordid);
            console.log('event fired');
    }
    onhandleClick(event) {
        let targetId = event.target.dataset.targetId;
        this.recordid=targetId;
        console.log('record id'+this.recordid);
       // let target = this.template.querySelector(`[data-id="${targetId}"]`);
        
        //console.log('targetId'+targetId+'=================target'+target);
        fireEvent(this.pageRef, "eventdetails", this.recordid);
        console.log('EVENT FIRED');
      }

      displayLabradorDetails(){
        fireEvent(this.pageRef, "eventdetails", "Breed - Labrador");
    }

     

}