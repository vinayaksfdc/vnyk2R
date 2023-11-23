import { LightningElement,api } from 'lwc';
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';

const COLUMNS = [
    {label:'Name', fieldName:'Name'},
    {label:'Phone', fieldName:'Phone'},
    {label:'Rating', fieldName:'Rating'},
    
    
]

export default class AccList extends LightningElement {
    @api Accs=[];
    @api SelectedAccs=[];
    @api selectedString;
    @api isDataAvailable=false;
    columns = COLUMNS

    connectedCallback(){
         
      // alert('length of connected call back '+this.Accs.length)
       if(this.Accs.length>0){
           this.isDataAvailable=true;
       }
       else{
           this.isDataAvailable=false;
       }
   }    

  

    handleRowSelected(event) {
        const selectedRecords=[];
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + JSON.stringify(selectedRows[i]));
            /*  this.selectedaccs.push(selectedRows[i]); */
            selectedRecords.push(selectedRows);
        }
         //alert(JSON.stringify(selectedIds));
        this.selectedString=JSON.stringify(selectedRecords);
        this.SelectedAccs=selectedRecords;
    }


}