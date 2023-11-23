import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

import CAR_ID from '@salesforce/schema/Car__c.Id';
import CAR_NAME from '@salesforce/schema/Car__c.Name';
import CAR_FuelType from '@salesforce/schema/Car__c.Fuel_Type__c';
import CAR_City from '@salesforce/schema/Car__c.City__c';
import CAR_Make from '@salesforce/schema/Car__c.Make__c';
import CAR_PICTURE from '@salesforce/schema/Car__c.Image_url__c';
import CAR_RegNo from '@salesforce/schema/Car__c.Reg_No__c';
 

const fields = [
    CAR_ID,
    CAR_NAME,
    CAR_FuelType,
    CAR_RegNo,
    CAR_PICTURE,
    CAR_City,
    CAR_Make,
     
]

export default class CarDetails extends LightningElement {

    carId;
    @track selectedTabValue;
    
    @wire(CurrentPageReference) pageRef;

    @wire(getRecord, { recordId : '$carId', fields})
    car;

    connectedCallback(){
        registerListener('carselect', this.callBackMethod, this);
    }

    callBackMethod(payload){
        this.carId = payload;
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;
    }

    get carFound(){
        if(this.car.data){
            return true;
        }
        return false;
    }
}