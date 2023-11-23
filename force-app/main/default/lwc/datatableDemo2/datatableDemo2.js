import {LightningElement, track, wire} from 'lwc';

// importing Apex Class
import getAccounts from '@salesforce/apex/datatableDemo.getAccounts2';

// Datatable Columns
const columns = [
    {label:'Account Name', fieldName:'Name'},
     {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency'},
     {label:'Industry', fieldName:'Industry', type:'text'},
     {label:'Phone', fieldName:'Phone', type:'text'},
     {label:'Rating', fieldName:'Rating', type:'text'  ,cellAttributes:{
        class:{fieldName:'ratingColor'}
    } },
     {label:'LastModifiedName', fieldName:'LastModifiedName', type:'text'},
     {label:'createdName', fieldName:'createdbyName', type:'text'},
     {label:'ownerName', fieldName:'ownerName', type:'text'}
];


export default class ReferenceDataInLwcDatatable extends LightningElement {
    @track data = [];
    @track columns = columns;

    @wire(getAccounts)
    opp({error, data}) {
        if(data) {

            let currentData = [];

            data.forEach((row) => {

                /* 
                * Creating the an empty object
                * To reslove "TypeError: 'set' on proxy: trap returned falsish for property"
                */

                let rowData = {};

                rowData.Name = row.Name;
                rowData.AnnualRevenue = row.AnnualRevenue;
				 rowData.Industry = row.Industry;
				  rowData.Rating = row.Rating;
                  rowData.Phone=row.Phone;
                // Account related data
                  
                if (row.LastModifiedBy) {
                    rowData.LastModifiedName = row.LastModifiedBy.Name;
                 }
				 if (row.createdName) {
                    rowData.createdbyName = row.createdName.Name;
                     
                }

                // Owner releated data
                if (row.Owner) {
                    rowData.ownerName = row.Owner.Name;
                }
                if(row.Rating==='Warm'){
                  rowData.ratingColor='slds-text-color_error';
                }

   

                currentData.push(rowData);
            });

            this.data = [...currentData];
        }
        else if(error) {
            window.console.log(error);
        }
    }
}