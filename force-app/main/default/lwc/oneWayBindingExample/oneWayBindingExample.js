import { LightningElement } from 'lwc';
export default class OneWayBindingExample extends LightningElement {
  firstName ="Milanjeet Singh";
    
    handlerChange(event){
        this.firstName = event.target.value;
    }
}