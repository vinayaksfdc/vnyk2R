import { LightningElement } from 'lwc';
export default class DualboxSingledomexample extends LightningElement {

handleClick(){
    
      console.log('==>>>>>>>>>>>>>>>',this.template.querySelector('div').innerHTML) ; // <div>First</div>
/*        console.log('++>>>>>>>>>>>>>>>',this.template.querySelector('.error[data-recid="Jupitar"]')?.classList.remove('hide-error')) ; */
         console.log('==>>>>>>>>>>>>>>>',this.template.querySelectorAll('div').innerHTML) ;
        // [<div>First</div>, <div>Second</div>]  
   this.template.querySelector(".first-class").style="color:green";
this.template.querySelector(".third-class").style="color:red"
}      

}