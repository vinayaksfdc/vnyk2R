import {LightningElement, track, wire} from 'lwc';

// importing Apex Class
import getOppdata from '@salesforce/apex/LWCExampleController.retriveOpportunities';

// Datatable Columns
const columns = [
    {
        label: 'Opportunity Name',
        fieldName: 'Name',
        type: 'text',
    }, {
        label: 'Account Name',
        fieldName: 'AccountName',
        type: 'text'
    }, {
        label: 'Account Owner',
        fieldName: 'AccountOwner',
        type: 'text'
    }, {
        label: 'Opportunity Owner',
        fieldName: 'OpportunityOwner',
        type: 'text'
    }, {
        label: 'CreatedDate',
        fieldName: 'CreatedDate',
        type: 'date'
    }
];


export default class ReferenceDataInLwcDatatable extends LightningElement {
    @track data = [];
    @track columns = columns;

    @wire(getOppdata)
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
                rowData.CreatedDate = row.CreatedDate;

                // Account related data
                if (row.Account) {
                    rowData.AccountName = row.Account.Name;
                    rowData.AccountOwner = row.Account.Owner.Name;
                }

                // Owner releated data
                if (row.Owner) {
                    rowData.OpportunityOwner = row.Owner.Name;
                }

                currentData.push(rowData);
            });

            this.data = currentData;
        }
        else if(error) {
            window.console.log(error);
        }
    }
}