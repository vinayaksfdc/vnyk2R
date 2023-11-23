import { LightningElement } from 'lwc';

export default class AddEx extends LightningElement {
    sum = (a, b) => a + b;
    mult = (a, b) => a * b;
    div = (a, b) => a / b;
    sub = (a, b) => a - b;

    addhandleClick(event) {
        console.log('addEx label'+event.target.label);
        console.log('addEx addition'+this.sum(2,6));
    }
    
}