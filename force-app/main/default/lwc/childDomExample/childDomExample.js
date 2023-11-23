import { LightningElement, api } from 'lwc';
export default class Child extends LightningElement {
    fruit;
    @api get fruitName() {
        return this.fruit;
    }
    set fruitName(value) {
        this.setAttribute('fruitName', value);
        this.fruit = value;
        this.handleValueChange(value);
    }

    //a method called in setter
    handleValueChange(value) {
        console.log(value);
        //do something
    }

    @api icon;
    renderedCallback() {
        if (!this.iconStyleSetDone) {
            if (this.icon === 'utility:activity')
                this.template.querySelector('.sf-icon-class').style.background = 'white';
            else
                this.template.querySelector('.sf-icon-class').style.background = 'grey';
            this.iconStyleSetDone = true;
        }
    }
    get condition0() {
        return true;
    }
    get condition1() {
        return true;
    }
    get condition2() {
        return true;
    }
}