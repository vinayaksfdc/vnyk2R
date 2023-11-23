import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

// getting customer details from account 
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name'
import CUSTOMER_ID from '@salesforce/schema/Account.Customer_Id__c';
import MOBILE_FIELD from '@salesforce/schema/Account.Mobile__c';
import EMAIL_FIELD from '@salesforce/schema/Account.Email__c';
import PREFERRED_CONTACT_FIELD from '@salesforce/schema/Account.preferred_Contact__c';


let FIELDS = ['Account.Name', 'Account.Customer_Id__c', 'Account.Mobile__c', 'Account.Email__c', 'Account.preferred_Contact__c']

export default class Customer_Details extends LightningElement {
    @track recordId;
    @wire(CurrentPageReference) pageRef;

    result = {}

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    account;

    get name(){
        return getFieldValue(this.account.data, NAME_FIELD)
    }
    get phone() {
        return getFieldValue(this.account.data, MOBILE_FIELD)
    }
    get owner() {
        return getFieldValue(this.account.data, CUSTOMER_ID)
    }
    get industry() {
        return getFieldValue(this.account.data, EMAIL_FIELD)
    }
    get revenue(){
        return getFieldDisplayValue(this.account.data, PREFERRED_CONTACT_FIELD)
    }

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        this.recordId = dogDtl;
    }
}