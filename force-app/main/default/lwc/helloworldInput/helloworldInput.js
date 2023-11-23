import { LightningElement } from 'lwc';

export default class HelloworldInput extends LightningElement {
    greeting = 'World';
    changeHandler(event) {
      this.greeting = event.target.value;
    }
}