/* eslint-disable no-console */
// fetchPicklistValues.js
import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Product__c.Material__c';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Product__c';

export default class FetchPicklistValues extends LightningElement {

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '0122v000001vKBgAAM', 
        // recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    picklistValues;

    handleCheckboxChange(event) {
        console.log(event.target.dataset.value);
        console.log(event.target.checked);
    }
}