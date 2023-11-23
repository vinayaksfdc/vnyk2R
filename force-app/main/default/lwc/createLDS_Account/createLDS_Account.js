/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'

export default class CreateLDS_Account extends LightningElement {
    name;
    phone;

    firsthandleChanges(event){
        this.name=event.target.value;
    }


    secondhandleChanges(event){
        this.phone=event.target.value;
    }
     
    addhandleClick(){
        const fields={'Name':this.name,'Phone':this.phone};
        const recordInput={apiName:"Account",fields};
        createRecord(recordInput).then(response=>{
                // eslint-disable-next-line no-console
                console.log('Account has been recreated :', response.id);
        // eslint-disable-next-line no-unused-vars
        }).catch(error=>{
            console.log('Account has been recreated :', error.body.message);
        }); 
    }
}