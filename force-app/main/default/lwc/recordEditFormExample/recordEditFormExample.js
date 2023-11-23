import { LightningElement } from 'lwc';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
 import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
 export default class RecordEditForm extends LightningElement {
     accountName = ACCOUNT_NAME;
     accountType = ACCOUNT_TYPE;
     //selectedFields = [ACCOUNT_NAME, ACCOUNT_TYPE];
     handleSuccess(){
         if(this.recordId !== null){
             this.dispatchEvent(new ShowToastEvent({
                     title: "SUCCESS!",
                     message: "New record has been created.",
                    variant: "success",
                 }),  
            );    
          }
     } }