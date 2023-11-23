import { LightningElement } from 'lwc';
export default class DomExample extends LightningElement {
    handleClick(){
        this.template.querySelector("lightning-input[data-my-id=in3]").value = "Some Value";
        alert(this.template.querySelector("lightning-input[data-my-id=in3]").value = "Some Value");

    }
    connectedCallback() {
        let a1=this.template.querySelector("lightning-input[data-my-id=in3]");
        if(a1){
            a1.value='test';
             console.log(a1.value);
         alert(a1.value);
        }
       
    }
}