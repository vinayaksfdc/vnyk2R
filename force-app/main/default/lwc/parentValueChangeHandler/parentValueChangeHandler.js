import { LightningElement } from 'lwc';
export default class ParentValueChangeHandler extends LightningElement {
    strContactName = '';
    
    // To call the child component method to add the Contact into the list.
    addContact(event){
        const objChild = this.template.querySelector('c-child-cmp');
        objChild.addContactToList(this.strContactName);
    }
    // To update the Contact name after updating it on UI. 
    changeName(event){
        this.strContactName = event.target.value;
    }
}