import { LightningElement, track, api } from 'lwc';
export default class ChildValueChangeHandler extends LightningElement {
    // Default list of Contacts.
    @track lstContacts = ["Weird Coder", "Red Devil", "Mystic Baba", "OneManArmy Baburao"];
    
    // This method will add new Contact into Contact list.
    @api
    addContactToList(strContactName){
        this.lstContacts.push(strContactName);
    }
    
}