import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import srchval from '@salesforce/apex/searchParam.SearchString';

const fields = [NAME_FIELD, EMAIL_FIELD];

export default class  Helloworldwithparam   extends LightningElement {
    userId = Id;

    @wire(getRecord, { recordId: '$userId', fields })
    user;

    @wire (srchval, {searchKey : '$userId'}) helloWorld;

    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }

    get email() {
        return getFieldValue(this.user.data, EMAIL_FIELD);
    }

    handleSearch(event) {
        console.log('handle search executing');
        console.log('User Id'+this.userId);
        findContacts({ searchKey: this.userId })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });

           
            this.accountId = event.detail.id;
    }
}