import { LightningElement } from 'lwc';

export default class ForloopjsEx extends LightningElement {
     someValues = [1, 'abc', 3, 'sss'];

     connectedCallback(){
        //do something
        this.handlechange;
   }    


    handlechange(){
        someValues.forEach((element) => {
            console.log(element);
        });

        someValues.forEach((element, index) => {
            console.log(`Current index: ${index}`);
            console.log(element);
        });
    }


}