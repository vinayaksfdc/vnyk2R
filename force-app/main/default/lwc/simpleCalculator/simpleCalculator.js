/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-vars
import { LightningElement,track } from 'lwc';

 
export default class SimpleCalculator extends LightningElement {

    @track error;
    @track dataArray = [];
    @track processedArray = [];
    @track currentResult;
    @track areDetailsVisible=false;

     firstnumber;
      secondnumber;

      handleChange(event) {
          
        this.areDetailsVisible = event.target.checked;

         
     }
 
      firsthandleChanges(event) {
          
            this.firstnumber = event.target.value;

            console.log('fn'+this.firstnumber);
        }
        secondhandleChanges(event) {
            this.secondnumber = event.target.value;
            console.log('fn'+this.secondnumber);
        }
        addhandleClick() {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-console
            this.currentResult=parseInt(this.firstnumber)+ parseInt(this.secondnumber);
            this.dataArray.push(this.currentResult);
            console.log(this.currentResult);
        }
        // eslint-disable-next-line no-dupe-class-members
        subhandleClick() {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-console
            this.currentResult=parseInt(this.firstnumber)- parseInt(this.secondnumber);
            this.dataArray.push(this.currentResult);
            console.log(this.currentResult);
        }
     
        mulhandleClick() {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-console
            this.currentResult=parseInt(this.firstnumber)*parseInt(this.secondnumber);
            this.dataArray.push(this.currentResult);
            console.log(this.currentResult);
        }
        divhandleClick() {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-console
            this.currentResult=parseInt(this.firstnumber)/parseInt(this.secondnumber);
            this.dataArray.push(this.currentResult);
            console.log(this.currentResult);
        }
}