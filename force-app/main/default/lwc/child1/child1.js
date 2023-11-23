import { LightningElement, api,track } from 'lwc';

export default class Child1 extends LightningElement {  
    @track updatedCase;

    @api 
    changeUpperCase(phrase){
        this.updatedCase = phrase.toUpperCase();
    }
    }