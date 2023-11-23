import { LightningElement,wire } from 'lwc';
import srchval from '@salesforce/apex/showErrorMsg.showError';

export default class ShowErrorfromApex extends LightningElement {
    value;
    error;
   
    handleGetContacts() {
        srchval()

        .then(result => {
           console.log(JSON.stringify(result));
        })
        .catch(error => {
            this.error=error;
            console.error(error);
            console.log('error.body.message'+error.body.message);
            console.error('error.body.exceptionType => ' + error.body.exceptionType);
            console.error('error.body.stackTrace => ' + error.body.stackTrace );
            console.error('e.stack => ' + error.stack );
        });
        
    }
}