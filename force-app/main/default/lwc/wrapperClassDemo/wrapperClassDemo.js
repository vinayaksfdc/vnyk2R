import { LightningElement,wire,track } from 'lwc';
import getAllAccountWithContacts from '@salesforce/apex/wrapperClassDemo.getAllAccountWithContacts';
export default class WrapperData extends LightningElement {
    data;
    error;
   
    @wire(getAllAccountWithContacts, {
    })
    wiredclass({
        data, error
    }){
        if (data) { 
            this.data  = data;
           console.log(JSON.stringify(this.data));
            this.error = undefined;  
           } else if (error) {  
            this.error = error;  
            this.data  = undefined;
           }  
    }
}