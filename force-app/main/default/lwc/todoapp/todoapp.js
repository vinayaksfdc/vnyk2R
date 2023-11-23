/* eslint-disable no-undef */
import { LightningElement, api } from 'lwc';

export default class Todoapp extends LightningElement {
    @api contacts;
    contacts = [
        {
            Id: 1,
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
        },
        {
            Id: 2,
            Name: 'Michael Jones',
            Title: 'VP of Sales',
        },
        {
            Id: 3,
            Name: 'Jennifer Wu',
            Title: 'CEO',
        },
    ];

 



    /* contacts = [
        {
            Id: 1,
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
        },
        {
            Id: 2,
            Name: 'Michael Jones',
            Title: 'VP of Sales',
        },
        {
            Id: 3,
            Name: 'Jennifer Wu',
            Title: 'CEO',
        },
    ];
   
   
   
    */
   
   
   
   
   
   
   
    /*  @track itemName ;

    updateItemName() {
        this.itemName = "MILK";
    } */
}