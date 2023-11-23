/* eslint-disable no-console */
import { LightningElement,api,wire,track } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

    // on load of record id to get the values from wire  using getRecord and Get field value 
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Lead.Name';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import MODEL_FIELD from '@salesforce/schema/Lead.Model__c';
import TYPE_FIELD from '@salesforce/schema/Lead.Type__c';

 
import STATUS_FIELD from '@salesforce/schema/Lead.Status__c';
import ASSINGEDDEALERSHIP_FIELD from '@salesforce/schema/Lead.Assigned_To_Dealership__c';
import OUTCOME from '@salesforce/schema/Lead.Outcome__c';
import CONSULTANTNAME_FIELD from '@salesforce/schema/Lead.Consultant__r.Name';

import PROSPECT_FIELD from '@salesforce/schema/Lead.Prospect__r.Name';
import Mobile_FIELD from '@salesforce/schema/Lead.Prospect__r.Mobile__c';
import CUSTOMERID_FIELD from '@salesforce/schema/Lead.Prospect__r.Customer_Id__c';
import CUSTEMAIL_FIELD from '@salesforce/schema/Lead.Prospect__r.Email__c';
import PREFERREDMETHOD_FIELD from '@salesforce/schema/Lead.Prospect__r.preferred_Contact__c';

//Get picklist values

import { getPicklistValues } from 'lightning/uiObjectInfoApi';

const fields = [NAME_FIELD,TITLE_FIELD,PHONE_FIELD,EMAIL_FIELD,MODEL_FIELD,TYPE_FIELD,PROSPECT_FIELD,STATUS_FIELD,ASSINGEDDEALERSHIP_FIELD,OUTCOME,CONSULTANTNAME_FIELD,
    Mobile_FIELD, CUSTOMERID_FIELD,CUSTEMAIL_FIELD,PREFERREDMETHOD_FIELD
   
];


export default class LeadDetail extends LightningElement {
    
    @api recordId;
    @wire(CurrentPageReference) pageRef;
    @track lead;
    @wire(getRecord, {recordId: '$recordId', fields})
    lead;


    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    })
    picklistValuesStatus;



    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: OUTCOME
    })
    picklistValuesOutcome;


    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    get name() {
        return getFieldValue(this.lead.data, NAME_FIELD);
    }

    get title() {
        return getFieldValue(this.lead.data, TITLE_FIELD);
    }

    get phone() {
        return getFieldValue(this.lead.data, PHONE_FIELD);
    }

    get email() {
        return getFieldValue(this.lead.data, EMAIL_FIELD);
    }
    get model() {
         return getFieldValue(this.lead.data, MODEL_FIELD);
    }
    get type() {
        return getFieldValue(this.lead.data, TYPE_FIELD);   
    }
    get prospect() {
        return getFieldValue(this.lead.data, PROSPECT_FIELD);
    }
    get status() {
        return getFieldValue(this.lead.data,STATUS_FIELD);
    }
    get assingedLeadership() {
        return getFieldValue(this.lead.data, ASSINGEDDEALERSHIP_FIELD);
    }
    get outcome() {
        return getFieldValue(this.lead.data, OUTCOME);
    }
    get consultantName() {
        return getFieldValue(this.lead.data, CONSULTANTNAME_FIELD);
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




    sutUpDetails(dogDtl){
        console.log('Event Recived lead detail');
        this.recordId = dogDtl;
        console.log('recordId lead detail'+this.recordId);

    }


    handleChangeStatus(event){
        
          console.log('status'+event.target.value);
    }

    handleChangeOutcome(event){
        
        console.log('outcome'+event.target.value);
  }

    
}