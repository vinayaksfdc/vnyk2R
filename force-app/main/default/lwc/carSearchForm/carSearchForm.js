/* eslint-disable no-console */
import { LightningElement, track,api, wire } from 'lwc';
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchForm extends LightningElement {

    @track carTypes;
    @api progressValue;

    @wire(getCarTypes)
    wiredCarType({data, error}){
        if(data){
            this.carTypes = [{value:'', label:'All Types'}];
            data.forEach(element => {
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Name;
                this.carTypes.push(carType);
            });
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    handleCarTypeChange(event){
        event.preventDefault();
        const name = event.target.value;
        const selectEvent = new CustomEvent('mycustomevent', {
            detail: name
        });
       this.dispatchEvent(selectEvent);
            
    }

 

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    createNewCarType(){
        console.log('new button clicked');
    }
   
}