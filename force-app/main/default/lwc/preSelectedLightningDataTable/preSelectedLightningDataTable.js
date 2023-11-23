import { LightningElement,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountRecords';
const COLS=[
    {label:'Name',fieldName:'Name', type:'text'},
    {label:'Phone',fieldName:'Phone', type:'text'},
    {label:'Industry',fieldName:'Industry', type:'text'},
    {label:'Rating',fieldName:'Rating', type:'text'}
];
export default class PreSelectedLightningDataTable extends LightningElement {
    accList;
    cols = COLS;
    @track preSelectedRows;

    @wire(getAccountList)
    getAccountList(result){
        if(result.data) {
            alert(JSON.stringify(result.data));
            this.accList=result.data.accList;
            this.preSelectedRows = result.data.selectedIdSet;
            this.errorList=undefined;
        }else if(result.error){
            this.accList=undefined;
            this.errorList=result.error;
        }
    }

    handleSync(){
        let selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRows'+JSON.stringify(selectedRows[0]));


        let rows=[];
        this.preSelectedRows=[...rows];


    }
}