/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, wire ,track} from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
/* import{fireEvent} from 'c/pubsub'; */
import fetchleads from '@salesforce/apex/AccountController.fetchaccounts';
 
const columns =  [
    { label: 'Record Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber', type: 'number' },
    {
        label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
            placeholder: 'Choose rating', options: [
                { label: 'Hot', value: 'Hot' },
                { label: 'Warm', value: 'Warm' },
                { label: 'Cold', value: 'Cold' },
            ] // list of all picklist options
            , value: { fieldName: 'Rating' } // default value for picklist
            , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
        }
    }
];

export default class Ex extends LightningElement {
    data = [{ 'Id': '12345', 'Name': 'Acme', 'AccountNumber': 12345, 'Rating': 'Hot' }, { 'Id': '34567', 'Name': 'Mace', 'AccountNumber': 34567, 'Rating': 'Cold' }]


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