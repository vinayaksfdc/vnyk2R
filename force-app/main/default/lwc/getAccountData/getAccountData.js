import { LightningElement,wire,api,track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccounts';
import { refreshApex } from '@salesforce/apex';

export default class GetAccountData extends LightningElement {
   
  @track accounts = [];
  @track error;
  @track wiredAccountList = [];

  @wire(getAccountList) accList(result) {
    this.wiredAccountList = result;

    if (result.data) {
      this.accounts = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.accounts = [];
    }
  }
 
  refreshApex(event) {
       refreshApex(this.wiredAccountList);
     }
}