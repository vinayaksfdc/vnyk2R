/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
export default class EventsWithObjectParent extends LightningElement {
     
    @track parentValue='Second Value';
    
    handleClick(){
        //access object parameters and assign the value
        console.log('Event clicked');
       this.parentValue= {type:"Fiat", model:"500", color:"white"};
        alert(JSON.stringify(this.parentValue));
    }
}