import { LightningElement,api,wire}  from 'lwc';
 import getAccounts from '@salesforce/apex/AccountController.getAccounts';

import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';

 

export default class AccListCmp extends LightningElement {
    @api Accs=[];
    val;
    @wire(getAccounts)
    wiredAccount({ error, data }) {
        if (data) {
            this.Accs = data;
            this.val=JSON.stringify(this.Accs);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }

   
}