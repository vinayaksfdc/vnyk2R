import {
    LightningElement,
    wire
} from 'lwc';
import fetchAccs from '@salesforce/apex/AccountController.returnAccsWithCons';

export default class TreeGridInLWC extends LightningElement {
    gridData;

    gridColumns = [{
            type: 'text',
            fieldName: 'Name',
            label: 'Name'
        },
        {
            type: 'text',
            fieldName: 'Industry',
            label: 'Industry'
        },
        {
            type: 'text',
            fieldName: 'FirstName',
            label: 'FirstName'
        },
        {
            type: 'text',
            fieldName: 'LastName',
            label: 'LastName'

        }
    ];


    @wire(fetchAccs)
    accsWithCons({
        error,
        data
    }) {
        if (data) {
            let parseData = JSON.parse(JSON.stringify(data));

            for (let i = 0; i < parseData.length; i++) {
                parseData[i]._children = parseData[i]['Contacts'];
                delete parseData[i]['Contacts'];
            }

            this.gridData = parseData;
        } else if (error) {
            console.log('error ====> ' + JSON.stringify(error));
        }
    }
}