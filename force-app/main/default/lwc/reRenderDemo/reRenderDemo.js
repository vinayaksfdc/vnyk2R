import { LightningElement } from 'lwc';

export default class ReRenderDemo extends LightningElement {
    showInfo = false;
    showInputFielVal = false;
    buttonLabel;

    /* 
        --------------------renderedCallback 
    in Javascript code, on button click, we are retrieving it's label, setting a Boolean variable to true to show content inside if condition and setting the input fields value based on button labels.


Above code seems to be fine and should work right?

Wrong, above code will throw an error at line number 10.

why? because we are setting input fields variable but this field is not yet available in dom right now. Yes, we are setting Boolean variable true to show field but still it is not yet rendered in dom yet.


if you understood my point above, then you should have figured out that, we can set input field's value only when it is available in dom.


So, the solution is renderedCallback, now we know we can make use of it, because it will be called only after the component is completely rendered.


Now, check this modified code.


    
    
    Here, we commented the error line and added a renderedCallback method, your code in renderedCallback method should be well conditioned, so that there not call every time there is a update on page. 

So here, I took a Boolean variable to check when to show updated value on input field.


    
    */
    buttonClicked(event)
    {
        this.buttonLabel = event.currentTarget.dataset.id;
        this.showInfo = true;
        this.showInputFielVal = true;
        //this.template.querySelector('.input1').value = buttonLabel + ' is Clicked';
    }

    renderedCallback()
    {
        if(this.showInputFielVal)
        {
            this.template.querySelector('.input1').value = this.buttonLabel + ' is Clicked';
            this.showInputFielVal = false;
        }
    }
}