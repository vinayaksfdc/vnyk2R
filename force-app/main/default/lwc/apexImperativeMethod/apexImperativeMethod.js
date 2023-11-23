/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ApexImperativeMethod extends LightningElement {
    contacts;
    error;

    handleLoad() {
        getContactList()

        
            .then(result => {
                console.log(JSON.stringify(result));
                this.contacts = result;
                this.error = undefined;
                    ``

                result.forEach(element => {
                    console.group(element.Name);
                    console.log(`$({element.Name})`+is+`${element.Phone}`)
                    console.log(`$({element.Name})`+is+`${element.Title}`)
                    console.log(`$({element.Name})`+is+`${element.Email}`)
                    console.groupEnd(element.Name);
                    
                    
                });
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
    }
}