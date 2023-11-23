import { LightningElement ,wire,track} from 'lwc';
import getAllOpps from '@salesforce/apex/GetAllOpportunities.getAllOpps';

export default class OpportunityList extends LightningElement {
    @track columns = [
        {
            label: 'Opportunity name',
            fieldName: 'nameUrl',
            type: 'url',
            typeAttributes: {label: { fieldName: 'Name' }, 
            target: '_blank'},
            sortable: true
        },
        {
            label: 'Stage Name',
            fieldName: 'StageName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Close date',
            fieldName: 'CloseDate',
            type: 'date',
            sortable: true
        }

    ];

    @track error;
    @track opportunities = [];


    @wire(getAllOpps)
    wiredOpps(result) {
        const { data, error } = result;
        if(data) {
            let nameUrl;
            this.opportunities = data.map(row => { 
                console.log('data is =============================>'+JSON.stringify(row));
                nameUrl = `/${row.Id}`;
                return {...row , nameUrl} 
            })
            console.log('___________________________________>>>>>>>>'+JSON.stringify(this.opportunities));
            this.error = null;
        }
        if(error) {
            this.error = error;
            this.opportunities = [];
        }
    }
}