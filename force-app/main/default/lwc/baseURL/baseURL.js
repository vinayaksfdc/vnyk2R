import { LightningElement,wire,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import calculate2Numbers from '@salesforce/apex/EmailSendController.sendMailMethod';

export default class BaseURL extends LightningElement {
    mMail='vinayakb2@gmail.com'; 
    mSubject='Sent Email with url on button click';
    mbody;
    @track greeting = 'World';
    handleChange(event) {
      this.mMail = event.target.value;
    }
   
 
    sfdcBaseURL;

    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    @wire(CurrentPageReference)
    currentPageReference;
    

    renderedCallback() {
     //   this.sfdcBaseURL = window.location.origin;
    }

    handleGetContacts() {
        console.log('window.location.href'+window.location.href);
        console.log('button click'+this.sfdcBaseURL);

        console.log( 'this.currentPageReference ' + JSON.stringify(this.currentPageReference));

        this.sfdcBaseURL = window.location.href;
        calculate2Numbers({ mMail: this.mMail,mSubject:this.mSubject,mbody:this.sfdcBaseURL })
       this.handleSuccess();
    }



    handleSuccess() {
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: 'Email has been sent',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
    }
}