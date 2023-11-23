import { LightningElement, wire,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Stages__c';
export default class DynamcComponent extends LightningElement {
    picklistvalue;
    @track value="Won";
    @wire(getObjectInfo, {objectApiName:ACCOUNT_OBJECT})
    objectInfo

    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD})
    IndustryPicklistValues

    handleChange(event){
        this.picklistvalue = event.target.value;
        console.log('this.picklistvalue'+this.picklistvalue);
        this.value=this.picklistvalue;
    }
}