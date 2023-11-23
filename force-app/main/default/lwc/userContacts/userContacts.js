/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

/* import{fireEvent} from 'c/pubsub'; */


import{CurrentPageReference} from 'lightning/navigation';
import{fireEvent} from 'c/pubsub';
import fetchleads from '@salesforce/apex/LeadController.fetchleads';
 
import { LightningElement, wire ,track} from 'lwc';
 
 

export default class customDataTableComponent extends LightningElement {

    @track accounts;  
    @track error;  
    
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
    }
    onhandleClick(event) {
        let targetId = event.target.dataset.targetId;
       
        let target = this.template.querySelector(`[data-id="${targetId}"]`);
        
        console.log('targetId'+targetId+'=================target'+target);
        fireEvent(this.pageRef,'pubsubevent',targetId);
        console.log('EVENT FIRED');
      }

    

     

}