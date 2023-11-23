import { LightningElement } from 'lwc';
import calculate2Numbers from '@salesforce/apex/EmailSendController.sendMailMethodhello';

export default class HelloBindingwithApexInputButton extends LightningElement {
    greeting = 'World';

    handleChange(event) {
        this.greeting = event.target.value;
    }

    handleGetContacts()
    {
        calculate2Numbers({ mMail: this.greeting,mSubject:this.mSubject,mbody:this.sfdcBaseURL })
    }
}