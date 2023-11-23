import { LightningElement,api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class AccountListItem extends LightningElement {
 
@api recordId;
@api accounts;

  
    deleteAccount(event){
    //  alert('button executing');
        this.recordId=event.target.value;
        
        deleteRecord(this.recordId)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record deleted',
                            variant: 'success'
                        })
                    );
                
                
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error deleting record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
                this.dispatchEvent(new CustomEvent('needrefresh',null));
    }
}