import { LightningElement, track, wire } from 'lwc';
import searchAccountList from '@salesforce/apex/AccountController.searchAccountList';
 

export default class ShowAccListwithParams extends LightningElement { @track searchKey = '';
@track contacts;
@track error;      

searchContact(event){        
    this.searchKey = event.target.value;        
}

@wire(searchAccountList, {accountName:'$searchKey'})
wiredContacts({data, error}){
    if(data){
        this.contacts = data;
        this.error = undefined;
    }
    else if (error) {
        this.error = error;
        this.contacts = undefined;
    }
}
}