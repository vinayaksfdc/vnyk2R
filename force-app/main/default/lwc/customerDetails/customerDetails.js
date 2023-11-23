/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
    
import { LightningElement, track, wire,api } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

// getting customer details from account 
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

 

import PROSPECT_FIELD from '@salesforce/schema/Lead.Prospect__r.Name';
import Mobile_FIELD from '@salesforce/schema/Lead.Prospect__r.Mobile__c';
import CUSTOMERID_FIELD from '@salesforce/schema/Lead.Prospect__r.Customer_Id__c';
import CUSTEMAIL_FIELD from '@salesforce/schema/Lead.Prospect__r.Email__c';
import PREFERREDMETHOD_FIELD from '@salesforce/schema/Lead.Prospect__r.preferred_Contact__c';


import CarType_FIELD from '@salesforce/schema/Car__c.CarType_Values__c';

const fields = [
    PROSPECT_FIELD,Mobile_FIELD, CUSTOMERID_FIELD,CUSTEMAIL_FIELD,PREFERREDMETHOD_FIELD
];



export default class CustomerDetails extends LightningElement {
    @api recordId;
    @wire(CurrentPageReference) pageRef;

    
     

    @wire(getRecord, { recordId: '$recordId', fields })
    lead;

    get prospect() {
        return getFieldValue(this.lead.data, PROSPECT_FIELD);
    }
    
    get Mobile() {
        return getFieldValue(this.lead.data, Mobile_FIELD);
    }
    get CUSTOMERID() {
        return getFieldValue(this.lead.data, CUSTOMERID_FIELD);
    }
    get CUSTEMAIL() {
        return getFieldValue(this.lead.data, CUSTEMAIL_FIELD);
    }
    get PREFERREDMETHOD() {
        return getFieldValue(this.lead.data, PREFERREDMETHOD_FIELD);
    }
    
    get noData() {
        return !this.lead.error && !this.lead.data;
    }

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        console.log('event Received');
        this.recordId = dogDtl;
        console.log('customer details recordId'+this.recordId)
    }
}