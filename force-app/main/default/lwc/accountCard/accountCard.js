/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, api, wire, track  } from 'lwc';
import{registerListener,unregisterAllListeners} from 'c/pubsub';
import{CurrentPageReference} from 'lightning/navigation';
import findAccountById from '@salesforce/apex/AccountController.findAccountById';

export default class AccountCard extends LightningElement {

    @track recordId = '';
    @track acc;
 
   
 
    @wire(CurrentPageReference) pageRef;

    @wire(findAccountById, { recordId: '$recordId' })
    wiredAccount({ error, data }) {
        if (data) {
            alert(JSON.stringify(data));
            this.acc = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.acc = undefined;
        }
    }
    

    connectedCallback(){

        registerListener('pubsubevent',this.handleCallback,this);
    }
    disconnectedCallback(){

        unregisterAllListeners(this);
    }
    handleCallback(detail)
    { 
     
        const recordId =detail.prosId;
        this.recordId = recordId;
        console.log('Parameter in AccountCard this.recordId'+this.recordId);  
        alert('parameter from publicsher from AccountCard'+this.recordId);
        alert(JSON.stringify(detail));
    
  
 }
}