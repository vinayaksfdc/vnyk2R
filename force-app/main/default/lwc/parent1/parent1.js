import { LightningElement } from 'lwc';
 
export default class Parent1 extends LightningElement {
        
        handlePhraseChange(event){
        console.log('Lightning Card Header-->'+this.template.querySelector('lightning-card').title);
            var inp=this.template.querySelector("lightning-input").name;
            console.log('inp---------------------------'+inp);
            this.template.querySelector('c-child1').changeUpperCase(event.target.value);
        }
        foo() {
  let element = this.template.querySelector("lightning-input");
  let value = element.value;

  if (value !== '42') {
    element.setCustomValidity("Error!");
  } else {
    element.setCustomValidity("");
  }

  element.reportValidity();
}
}