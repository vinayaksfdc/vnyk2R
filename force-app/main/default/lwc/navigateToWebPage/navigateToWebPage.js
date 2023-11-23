import {
    LightningElement,
    api,
    wire
} from 'lwc';
/* Wire adapter to fetch record data */
import {
    getRecord,
    getFieldValue
} from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Account_Website_FIELD from '@salesforce/schema/Account.Website';
import { NavigationMixin } from 'lightning/navigation';


export default class NavigateToWebPage extends  NavigationMixin(LightningElement){
    /** Id of record to display. */
    @api recordId;

    /* Expose schema objects/fields to the template. */
    accountObject = ACCOUNT_OBJECT;

    /* Load Account.Name for custom rendering */
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD,Account_Website_FIELD]
    })
    record;

    /** Gets the Account.Name value. */
    get nameValue() {
        return this.record.data ? getFieldValue(this.record.data, NAME_FIELD) : '';
    }
    get websiteValue() {
        return this.record.data ? getFieldValue(this.record.data, Account_Website_FIELD) : '';
    }
	
	   navigateToWebPage(event) {
        this.Url = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": this.Url
            }
        });
    }

       navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": "https://www.Google.com/"
            }
        });
    }
}