/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { LightningElement,wire,track,api } from 'lwc';
import getCampaginList from '@salesforce/apex/FetchCampaignRec.search'


import { NavigationMixin } from 'lightning/navigation';
 
 

export default class FetchCampaignRecLimit5 extends NavigationMixin(LightningElement) {
    @track Campaigns;
    @track  clickedButtonLabel;
    @track error;

    @api recordId='0012v00002oPCPvAAO';
    

    @wire(getCampaginList)
    wiredAccounts({ error, data }) {
        if (data) {
            this.Campaigns = data;
            this.error = undefined;
            console.log(this.Campaigns);
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
    closecard(event){
        console.log('Access key2:'+event.target.accessKey);
        console.log(event.target.id.split('-')[0]);
        console.log();
        if(this.Campaigns.length>=1){   
            console.log('executing'+this.arr1.length);

           
            this.arr1.splice(2,1);
            console.log('executingsplice'+this.arr1.length);
            
         //   console.log(fruits);
     
            this.Campaigns.splice(event.target.accessKey,1);
            console.log(this.Campaigns.length+'====================='+event.target.accessKey);         
            // Campaigns.splice(event.target.accessKey,1);
            // this.keyIndex-1;
            //  console.log('after splice'+fruits);
            
            console.log('after splice'+JSON.stringify(this.Campaigns));
        }

      
    }

    
    
    handleClickEdit(event) {
         this.recordId = event.target.dataset.id;
        console.log('notificationId ' + this.recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'edit'
            },
        });
    }

    navigateToRecordViewPage(event) {
        this.recordId = event.target.dataset.id;
        console.log('notificationId ' + this.recordId);
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'namespace__ObjectName', // objectApiName is optional
                actionName: 'view'
            }
        });
    }
    
    handleIconClick(event) {
        var notificationId = event.target.dataset.id;
        console.log('notificationId ' + notificationId);
        var notificationList = this.Campaigns;
        // eslint-disable-next-line no-unused-vars
        var index;
        var newList = [];
        for (var i = 0; i < notificationList.length; i++) {
            console.log(JSON.stringify(notificationList[i]));
            if (notificationList[i].Id !== notificationId) {
                newList.push(notificationList[i]);
            }
        }
        console.log(JSON.stringify(newList));
        this.Campaigns = newList;
        console.log(JSON.stringify(this.Campaigns.length));

    }

       
}