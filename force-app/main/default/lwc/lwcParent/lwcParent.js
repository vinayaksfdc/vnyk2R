import { LightningElement } from 'lwc';

export default class LwcParent extends LightningElement {
     progress(event){
       console.log(event.target.value);
       console.log(this.template.querySelectorAll('lightning-input').label);
    }
}