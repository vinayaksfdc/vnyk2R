import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const fields = [
    'Product__c.Id',
    'Product__c.Name',
    'Product__c.Price__c',
    'Product__c.Size__c',
    'Product__c.Description__c',
    'Product__c.Brand__c' /*

    'Contact.Title',
    'Contact.Phone',
    'Contact.Email'

    */
   


    
];

export default class ShirtListItem extends LightningElement {
    @api recordid;
    @api meetingRoomInfo;
     
    @wire(getRecord, { recordId: '$recordid', fields })
    contact;

    get testMe() {
        console.log(this.contact.data); // returns a Proxy
        console.log(JSON.stringify(this.contact.data)); // returns a JSON as expected:
        console.log(JSON.stringify(this.contact.data.fields));
        console.log(this.contact.data.fields.Id.value); // shows Name Value:
        console.log(this.contact.data.fields.Name.value); // show Service Value:
        return '?!';
    }

    connectedCallback(){
        //do something
        console.log('connectedCallback'+this.contact);
        this.handlechange;
   }    
    get id() {
        console.log(this.contact.data.fields.Id.value);
        return this.contact.data.fields.Id.value;
    }
    get name() {
        console.log(this.contact.data.fields.Name.value);
        return this.contact.data.fields.Name.value;
    }

    get price() {
        return this.contact.data.fields.Price__c.value;
    }

    get size() {
        return this.contact.data.fields.Size__c.value;
    }

    get desc() {
        return this.contact.data.fields.Description__c.value;
    }
    get brand() {
        return this.contact.data.fields.Brand__c.value;
    }
    

    deleteAccount(event) {
        const recordId = event.target.dataset.recordid;
        console.log(recordId);
        const passEvent = new CustomEvent('accountselection', {
        detail:{recordId:recordId} 
    });
    this.dispatchEvent(passEvent);
    console.log('Event Dispatched');
    }
    
}