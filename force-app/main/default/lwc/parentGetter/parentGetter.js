import {
    LightningElement,
    
} from 'lwc';
 
export default class ParentGetter extends LightningElement {
    counter = 1;
    changingVar = 'initial changingVar';
    get changingGetter() {
        return this.counter + ' changingGetter';
    }
    handleClick() {
        this.counter += 1;
        this.changingVar = this.counter + ' changingVar';
    }
}