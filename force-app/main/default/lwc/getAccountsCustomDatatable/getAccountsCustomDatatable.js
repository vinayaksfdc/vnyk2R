import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountsRecords';
import deleteAccounts from '@salesforce/apex/AccountController.DeleteAccountsRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LWCCustomDatatableWithCheckbox extends LightningElement {
    data = [];
    error;
    accounts;
    @track selectedRecordIds = [];
    @track selectedRadioRecord = '';

    connectedCallback() {
         this.handleLoad();
    }


    handleLoad() {
        getAccounts()
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handleCheckboxSelect(event) {
        let selectedRows = this.template.querySelectorAll('lightning-input[data-key="firstColumnCheckbox"]');
        let allSelected = true;

        selectedRows.forEach(currentItem => {
            if (!currentItem.checked && currentItem.type === 'checkbox') {
                allSelected = false;
            }
        });

        let selectedRow = this.template.querySelector('lightning-input[data-key="allCheckbox"]');

        if (allSelected) {
            selectedRow.checked = true;
        } else {
            selectedRow.checked = false;
        }
    }

    //Select/unselect all rows
    handleAllSelected(event) {
        let selectedRows = this.template.querySelectorAll('lightning-input[data-key="firstColumnCheckbox"]');

        selectedRows.forEach(row => {
            if (row.type == 'checkbox') {
                row.checked = event.target.checked;
            }
        });
    }

    handleSingleCheckboxSelect(event) {
        const boxes = this.template.querySelectorAll('lightning-input[data-key="singleSelectColumnCheckbox"]');
        boxes.forEach(box => box.checked = event.target.name === box.name);
    }

    getAllSelectedRecord() {
        //first column checkbox selected records
        let firstColumnSelectedRecord = [];
        let firstColumnCheckboxRows = this.template.querySelectorAll('lightning-input[data-key="firstColumnCheckbox"]');

        firstColumnCheckboxRows.forEach(row => {
            if (row.type == 'checkbox' && row.checked) {
                firstColumnSelectedRecord.push(row.dataset.id);
            }
        });
        this.selectedRecordIds=firstColumnSelectedRecord;
        //single selected checkbox record
        let selectedRecord = '';
        let singleColumnCheckbox = this.template.querySelectorAll('lightning-input[data-key="singleSelectColumnCheckbox"]');
        singleColumnCheckbox.forEach(row => {
            if (row.type == 'checkbox' && row.checked) {
                selectedRecord = row.value;
            }
        });

        let selectedRadioRecord = '';
        let selectedRadioRows = this.template.querySelectorAll('lightning-input[data-name="radio"]');

        selectedRadioRows.forEach(currentItem => {
            if (currentItem.type === 'radio' && currentItem.checked) {
                selectedRadioRecord = currentItem.value;
            }
        })
        console.log('this.selectedRecordIds'+this.selectedRecordIds);
        console.log('multiple selected Record : ' + JSON.stringify(firstColumnSelectedRecord));
        console.log('single checkbox selected Record : ' + selectedRecord);
        console.log('single radio selected Record : ' + selectedRadioRecord);
    }

    DeleteSectedRecords(){
        this.getAllSelectedRecord();
        console.log('this.selectedRecordIds=='+this.selectedRecordIds);
         deleteAccounts({DeleteAccountids:this.selectedRecordIds})
            .then(result => {
               this.showToast();
               this.handleLoad();
            })
            .catch(error => {
                this.error = error;
            });
    }

    showToast() {
    const event = new ShowToastEvent({
        title: 'Toast message',
        message: 'Toast Message',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}
}