// lwcNewAccountOverride.js
import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { decodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class LwcNewAccountOverride extends LightningElement {

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const dfvObject = decodeDefaultFieldValues(currentPageReference.state.defaultFieldValues);
        this.dfv_AccountName = dfvObject.Name;
        this.dfv_NumberOfEmployees = dfvObject.NumberOfEmployees;
        // Handling required for boolean because we don't support boolean field types
        this.dfv_CustomCheckbox = dfvObject.CustomCheckbox__c === 'true';
        this.dfv_OwnerId = dfvObject.OwnerId;
    }

    @track dfv_AccountName = '';
    @track dfv_NumberOfEmployees = '';
    @track dfv_OwnerId = '';
    @track dfv_CustomCheckbox = false;

    // Run code when account is created
    handleAccountCreated(){
    }
}