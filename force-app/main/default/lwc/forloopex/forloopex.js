import { LightningElement } from 'lwc';

export default class Forloopex extends LightningElement {
 
   contacts = [
        {
          
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
        },
        {
            
            Name: 'Michael Jones',
            Title: 'VP of Sales',
        },
        {
           
            Name: 'Jennifer Wu',
            Title: 'CEO',
        },
    ];

    connectedCallback() {
        this.contacts.forEach((contact, idx) =>{
            contact.number = idx + 1;
        });
    }
}