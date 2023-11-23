import { LightningElement } from 'lwc';

export default class Inputselector extends LightningElement {
    foo() {
  let element = this.template.querySelector("[name='foo']");
  let value = element.value;

  if (value !== '42') {
    element.setCustomValidity("Error!");
  } else {
    element.setCustomValidity("");
  }

  element.reportValidity();
}
}