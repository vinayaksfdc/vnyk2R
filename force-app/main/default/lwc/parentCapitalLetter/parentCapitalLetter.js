import { LightningElement } from "lwc";

export default class ParentCapitalLetter extends LightningElement {

  finalName;
  Name='vinayak bule';
  get fullName(){
      return this.Name; 
  }
  handleChange(event) {
    /*
     * accepting the user input 
     */
    let fName = event.target.value;
    console.log(fName);

    
    /* check if the value is not null, if it's not, then assign the
     * value to the property. 
     */ 
    if (fName !== null ? (this.finalName = fName) : "");
  }

  handleInvokeChildMethod() {
      /* get reference to the child component tag name and invoke 
       * the child method name 
       */
    this.template.querySelector("c-child-Capital-letter").handleCapitalise();
    this.template.querySelector('c-child-Capital-letter').changeColor();
  }

  coloring;
handleClick() {
  this.template.querySelector('c-child-Capital-letter').changeColor();
}


}