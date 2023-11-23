import { LightningElement,api } from 'lwc';
export default class LightningRecordEditForm extends LightningElement {
@api recordId;
@api industry;
    connectedCallback(){

        //this.template.querySelector('.lightning-layout-item').style='background: #cca6324a;';
        //this.template.querySelector('.main').classList.add('panelHeader');

 
    }

    fo1o(){
        console.log('fo1o Executing==>>>');
        console.log('fo1o Executing==>>>');
        /* console.log('this.template.querySelector(value)',this.template.querySelector('.Industry').value); */
      const element = this.template.querySelector('[data-id="overview"]');
     element.value='Communications'; 
    }

     handleFieldChange(event){
          console.log('event.target.value',event.target.value);
            this.industry=value;
     }

    handleClick1(){
       const element = this.template.querySelector('[data-id="overview"]');
       console.log('executing element',element.value);
      // element.value='Communications';

        var divblock = this.template.querySelector('[data-id="divblock"]');
        if(divblock){
            //this.template.querySelector('[data-id="divblock"]').className='class1';
           // this.template.querySelector('lightning-layout-item').className='class1';
            //let temp=           this.template.querySelectorAll('lightning-layout-item');
         /*    let temp=           this.template.querySelector('.navBar');
            temp.className='class2'; */

             this.template.queryselector('.navBar[lightning-record-edit-form]').className='class3';
                console.log('temp-->',temp.children);
            //for(let i=0;i<temp.length;i++){
                
          //  }
                   
        }        
    }
    handleClick2(){
       
        
        var divblock = this.template.querySelector('[data-id="divblock"]');
        if(divblock){
            this.template.querySelector('[data-id="divblock"]').className='class2';
                 let temp=           this.template.querySelectorAll('lightning-layout-item');
               console.log('===>>>>>',JSON.stringify(temp));
            for(let i=0;i<temp.length;i++){
                temp[i].className='class2';
            }
        }
    }
    handleclick3(){
        console.log('executing');
         const element = this.template.querySelector('[data-id="overview"]');
       console.log('executing element',element.value);
    }
}