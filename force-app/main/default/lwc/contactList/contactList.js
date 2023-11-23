import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactExp.getContactList';

export default class contactList extends LightningElement {
contacts;
error;
    @wire(getContactList)
wiredContacts({ error, data }) {
if (data) {
            console.log('data: ', data);
            this.contacts = data;
            console.log('this.contacts: ', this.contacts);
            this.error = undefined;
           console.log('this.error: ', this.error);
        } else if (error) { 
           console.log('error ', error);
            this.error = error; 
           console.log('this.error: ', this.error); 
           this.contacts = undefined;
            console.log('this.contacts : ', this.contacts);
        }
    }}