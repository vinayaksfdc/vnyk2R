import { LightningElement, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.fetchOpportunities';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecord extends LightningElement {
    @track lstOppotunities = [];

    constructor(){
        super();

        // Imperative Apex call to get the list of Opportunities
        getOpportunities({}).then(response => {
            this.lstOppotunities = response;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    deleteOpportunity(event){
        let deleteId = event.target.value;
        deleteRecord(deleteId)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            );

            // To delete the record from UI
            for(let opp in this.lstOppotunities){
                if(this.lstOppotunities[opp].Id == deleteId){
                    this.lstOppotunities.splice(opp, 1);
                    break;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}