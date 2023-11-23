import { LightningElement, track , wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class MyContactsTest extends LightningElement {
     @track contacts;
    @track error;

   connectedCallback(){
        getContactList()
        .then(result => {
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
   }    

   onSpreadOperator()
   {
    const fruits = ['orange', 'apple', 'lemon'];
const newFruits = [...fruits, 'banana']; 
console.log('newFruits'+newFruits);
   }
   
}