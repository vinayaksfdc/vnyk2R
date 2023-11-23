import { LightningElement,track,wire } from 'lwc';
import getContactList from '@salesforce/apex/LwcModalCtrl.getContactList';

//create data table
const COLS = [
    { label: 'Name', fieldName: 'Name', editable: false },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Department', fieldName: 'Department' },
    { label: 'LeadSource', fieldName: 'LeadSource' }
];
export default class LwcModal extends LightningElement  {

    @track columns = COLS;
   
    @wire(getContactList)
    contact;

    @track openmodel = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {
        this.closeModal();
    }
}