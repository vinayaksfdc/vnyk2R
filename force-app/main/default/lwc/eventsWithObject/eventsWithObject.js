import { LightningElement, api } from 'lwc';
export default class EventsWithObject extends LightningElement {

    @api myName='first Value';
   /*  car = {type:"Fiat", model:"500", color:"white"};
    handleClick(){
        // Creates the event
        const selectedEvent = new CustomEvent('custevent', {
            detail : this.car
        });
        //dispatching the custom event
        this.dispatchEvent(selectedEvent); 
    }*/
}