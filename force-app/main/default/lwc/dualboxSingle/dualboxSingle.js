import { LightningElement } from 'lwc';
import COLORS from '@salesforce/resourceUrl/duallist'
import {loadStyle} from 'lightning/platformResourceLoader'

export default class DualListboxSelected extends LightningElement {
    isCssLoaded = false
    options = [];

    values = [];

    connectedCallback() {
        alert('executing');
        const items = [];
          for (let i = 1; i <= 10; i++) {
            items.push({
                label: `Option ${i}`,
                value: `opt${i}`,
            });
        }
        this.options.push(...items);
        this.values.push(...['opt2', 'opt4', 'opt6']);
 
     
    }
    renderedCallback(){

           if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
/*        let input= this.template.querySelectorAll(".slds-form-element__label");
    input.forEach(currentItem => {
         currentItem.style="color:red"
    }); */
  /*   this.template.querySelector(".slds-dueling-list__options").style="color:red" */
/*  
     this.template.querySelector('div').classList.add('green-border');    */         
 
    }

    renderedCallback(){ 
     
    }

}