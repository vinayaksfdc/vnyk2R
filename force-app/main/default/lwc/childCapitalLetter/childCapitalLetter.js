import { LightningElement, api } from "lwc";

export default class ChildCapitalLetter extends LightningElement {
  //Parent component pushes the value to the prop name

  @api 
  name = "Teja"; 
  knowList=[];

  set title(value){
      this.name=value.toUpperCase();
  }

  get myTitle(){
      return this.name;
  }
  knowList=[];
      set records(value){
        this.knowList=value;
    }

    get myKnowList(){
        return JSON.stringify(this.knowList);
    }
    /* This is the method that I wish to get invoked from the parent, hence I have decorated it with @api */
  @api
  handleCapitalise() {
  
      /* We are capitalising the input that's being pushed by the parent */
    console.log(this.name.toUpperCase());
  }

  @api colors;
  @api
  changeColor(){
      alert('change color executed');
      this.template.querySelector('h2').style.backgroundColor = "red";
  }

}