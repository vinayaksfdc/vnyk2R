/* eslint-disable no-unused-expressions */
import { LightningElement,track} from 'lwc';
import saveAssets from '@salesforce/apex/AccountCreationController.createAssets';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/* eslint-disable no-console */
 

export default class CreateOrders extends LightningElement {
    @track keyIndex = 0;  
    @track error;
    @track message;
    @track assetRecList = [
        {                      
            Name: '',
            AccountId: '',
            ContactId: ''
        }
    ];
    //Add Row 
    addRow() {
        this.keyIndex+1;   
        this.assetRecList.push ({            
            Name: '',
            AccountId: '0012v000035FLdkAAG',
            ContactId: '0032v00003aZQ5uAAG'
        });
        console.log('Enter ',this.assetRecList);
        console.log('Enter ',this.assetRecList);
    }
    changeHandler(event){       
       // alert(event.target.id.split('-'));
        console.log('Access key2:'+event.target.accessKey);
        console.log('id:'+event.target.id);
        console.log('value:'+event.target.value);       
        if(event.target.name==='assName')
            this.assetRecList[event.target.accessKey].Name = event.target.value;
        // else if(event.target.name==='assIndustry'){
        //     this.assetRecList[event.target.accessKey].Industry = event.target.value;
        // }
        // else if(event.target.name==='assPhone'){
        //     this.assetRecList[event.target.accessKey].Phone = event.target.value;
        // }
    }
    //Save Assets
     saveMultipleAssets() {

        console.log("assetlist"+JSON.stringify(this.assetRecList));
        saveAssets({ assetlist : this.assetRecList })
            .then(result => {
                this.message = result;
                this.error = undefined;                
                this.assetRecList.forEach(function(item){                   
                    item.Name='';
                    item.AccountId='0012v000035FLdkAAG';
                    item.ContactId='0032v00003aZQ5uAAG';                   
                });

                //this.assetRecList = [];
                if(this.message !== undefined) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Assets Created!',
                            variant: 'success',
                        }),
                    );
                }

                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating records',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
    removeRow(event){       
        console.log('Access key2:'+event.target.accessKey);
        console.log(event.target.id.split('-')[0]);
        if(this.assetRecList.length>=1){             
             this.assetRecList.splice(event.target.accessKey,1);
             this.keyIndex-1;
        }
    }  

}