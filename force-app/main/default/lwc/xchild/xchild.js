/* eslint-disable vars-on-top */
 
 
    import { LightningElement, track } from 'lwc';

    export default class XChild extends LightningElement {
    
        @track name;
    
        nameChange(event) {
    
            // eslint-disable-next-line eqeqeq
             
    
                this.name= event.target.value;
    
        }
    
        get userName()
    
        {
    
            return this.name;
    
        }
    
    }