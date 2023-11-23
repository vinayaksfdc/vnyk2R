import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/FetchMultipleRecords.search';

export default class FetchMultipleRecords extends LightningElement {
    @track Contacts;
    @track error;
    selectedItem;

    @wire(getAccountList)
    wiredAccounts({ error, data }) {
        if (data) {
            this.Contacts = data;
            this.error = undefined;
            console.log(this.Contacts);
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

        closecard(event)
        {
            console.log('Access key2:'+event.target.accessKey);
            console.log(event.target.id.split('-')[0]);
            var targetval = [];
            
           
            const returnedTarget = Object.assign(targetval, this.Contacts);
            console.log('returnedTarget'+returnedTarget);
            console.log('targetval'+targetval);
            console.log('this.Contacts'+this.Contacts);
            console.log('stringify returnedTarget'+JSON.stringify(returnedTarget));
            console.log('stringify  targetval'+JSON.stringify(targetval));
            console.log('stringify this.Contacts'+JSON.stringify(this.Contacts));
            if(targetval.length>=1){             
                console.log('target.length'+targetval.length);
                targetval.splice(event.target.accessKey,1);
                console.log('after splice'+JSON.stringify(targetval));
                this.Contacts=targetval;
                // this.keyIndex-1;
            }
            

        
        }


}