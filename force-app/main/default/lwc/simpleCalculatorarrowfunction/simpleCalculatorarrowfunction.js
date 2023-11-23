import { LightningElement,track } from 'lwc';

export default class SimpleCalculatorarrowfunction extends LightningElement {

    @track error;
    @track dataArray = [];
    @track processedArray = [];
    @track currentResult;
    @track areDetailsVisible=false;
      
     a;
      b;

      handleChange(event) {
          
        this.areDetailsVisible = event.target.checked;
        if(this.areDetailsVisible===true)
        {
            console.log('executed if true');
            console.log(this.dataArray.length);
        }
         
     }
 
         firsthandleChanges(event) {
            this.a = event.target.value;
            console.log('fn'+this.a);
        }
        secondhandleChanges(event) {
            this.b = event.target.value;
            console.log('fn'+this.b);
        }
    sum = (a, b) => a + b;
    mult = (a, b) => a * b;
    div = (a, b) => a / b;
    sub = (a, b) => a - b;

    handleClick(event) {
        console.log('simpleCalculatorarrowfunction label'+event.target.label);
       
         


        const result=event.target.label;
        if (result === 'sum') {
            
          //  console.log(this.sum(8,2));
            this.currentResult=this.sum(parseInt(this.a),parseInt(this.b));
            console.log('this.currentResultthis.currentResult'+this.currentResult);
            alert(typeof(this.currentResult));
            //alert(typeof(4+7));
            //alert(typeof("4"+"7"));
            console.log(typeof(this.currentResult));
            console.log('currentResult add============>>'+this.currentResult);
            this.dataArray.push(this.currentResult);
        } else 
        if (result === 'mult'){
            
            this.currentResult=this.mult(this.a,this.b);
            alert(typeof(this.currentResult));
            console.log(typeof(this.currentResult));
            console.log('currentResult mult============>>'+this.currentResult);
            this.dataArray.push(this.mult(this.a,this.b));
        }
        else 
        if (result === 'div'){
            
            this.currentResult=this.div(this.a,this.b);
            console.log('currentResult div============>>'+this.currentResult);
            this.dataArray.push(this.mult(this.a,this.b));

        }
        else 
        if (result === 'sub'){
             
            this.currentResult=this.sub(this.a,this.b);
            console.log('currentResult sub============>>'+this.currentResult);
            this.dataArray.push(this.sub(this.a,this.b));
        }
        return result;
    }

}