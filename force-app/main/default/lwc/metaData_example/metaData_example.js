import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [
    'RecordtypeName__mdt.MasterLabel',
    'RecordtypeName__mdt.DeveloperName',
    'RecordtypeName__mdt.Name__c',
    'RecordtypeName__mdt.Language',
];

export default class LifeCycle extends LightningElement {
   
    //Id is hardcoded for demo purpose. You can pass a dynamic id here
    @api recordId;

    @wire(getRecord, { recordId: 'm002v00000175yIAAQ', fields: FIELDS })
    metadatarecord;
    
    get label() {
        return this.metadatarecord.data.fields.MasterLabel.value;
    }

    get developername() {
        return this.metadatarecord.data.fields.DeveloperName.value;
    }

    get name() {
        return this.metadatarecord.data.fields.Name__c.value;
    }

     
}