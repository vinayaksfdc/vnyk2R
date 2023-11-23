import { LightningElement, wire, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import getLatestAccounts from '@salesforce/apex/AccountController.getAccounts';
const COLS = [
  { label: 'Name', fieldName: 'Name', type: 'text' },
  { label: 'Phone', fieldName: 'Phone', type: 'text' },
  { label: 'Industry', fieldName: 'Industry', type: 'text' }
];
export default class LwcRefreshApex extends LightningElement {
  cols = COLS;
  @track selectedRecord;
  @track accountList = [];
  @track error;
  @track wiredAccountList = [];

  @wire(getLatestAccounts) accList(result) {
    this.wiredAccountList = result;

    if (result.data) {
      this.accountList = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.accountList = [];
    }
  }

  handelSelection(event) {
    if (event.detail.selectedRows.length > 0) {
      this.selectedRecord = event.detail.selectedRows[0].Id;
    }
  }
  deleteRecord() {
    deleteRecord(this.selectedRecord)
      .then(() => {
        refreshApex(this.wiredAccountList);
      })
      .catch(error => {
      })
  }
}