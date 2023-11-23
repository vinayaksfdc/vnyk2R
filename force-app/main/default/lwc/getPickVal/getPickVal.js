/* eslint-disable no-console */
import { LightningElement, wire,track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CarType_FIELD from '@salesforce/schema/Car__c.CarType_Values__c';
import ACCOUNT_OBJECT from '@salesforce/schema/Car__c';
 
export default class PicklistDemo extends LightningElement {
    @track pickListvalues;
    @track error;
    @track values;
   

    @wire(getPicklistValues, {
        recordTypeId : '012000000000000AAA',
        fieldApiName : CarType_FIELD
    })
        wiredPickListValue({ data, error }){
            if(data){
                console.log(` Picklist values are `, data.values);
                this.pickListvalues = data.values;
                this.error = undefined;
            }
            if(error){
                console.log(` Error while fetching Picklist values  ${error}`);
                this.error = error;
                this.pickListvalues = undefined;
            }
        }
 
 
    handleChange(){
        
    }

}