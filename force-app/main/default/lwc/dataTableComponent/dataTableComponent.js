/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, wire ,track} from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
/* import{fireEvent} from 'c/pubsub'; */
import fetchleads from '@salesforce/apex/LeadController.fetchleads';
 
const columns = [  
    { label: 'Id', fieldName: 'Id' },  
    { label: 'Model', fieldName: 'Model__c' },  

    { label: 'Picture', fieldName: 'picture__c' },
    { label: 'Type', fieldName: 'Type__c' },  
     { label: 'Prospect__c', fieldName: 'Prospect__c' },  
      { label: 'Status', fieldName: 'Status__c' },   

    {type: "button", typeAttributes: {  
        label: 'Edit',  
        name: 'Edit',  
        title: 'Edit',  
        disabled: false,  
        value: 'edit',  
        iconPosition: 'left'  
    }}  
];  

export default class dataTableComponent extends LightningElement {

    @track accounts;  
    @track error;  
    @track columns = columns; 
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

    @wire(CurrentPageReference) pageRef;
    callRowAction( event ) {  
   /*      console.log('event clicked'); */
          
  /*       const recId =  event.detail.row.Id;   */
            const rowval=event.detail.row;
                this.parentValue=rowval;
            console.log(JSON.stringify(this.parentValue));
/* 
            {"Model__c":"https://kat2k-dev-ed--c.visualforce.com/resource/1580135498000/f?","Type__c":"Test Drive","Prospect__c":"0012v00002oPCPvAAO","Status__c":"New","Assigned_To_Dealership__c":"2020-01-30T20:00:00.000Z","Outcome__c":"Lost","Consultant__c":"0052v00000geHSSAA2","Id":"00Q2v00001bzBb9EAE","Prospect__r":{"Name":"JEFF","Id":"0012v00002oPCPvAAO"},"Consultant__r":{"Name":"vinayak bule","Id":"0052v00000geHSSAA2"}} */

        const actionName = event.detail.action.name;  
        if ( actionName === 'Edit' ) {  

            console.log('under edit button'+JSON.stringify(this.parentValue));  
            
      /*   fireEvent(this.pageRef,'pubsubevent',recId); */
            this.parentValue;
         
             console.log('under edit button'+JSON.stringify(this.parentValue));  
        }
    }

     

}