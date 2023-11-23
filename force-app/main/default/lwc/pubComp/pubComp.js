import { LightningElement, wire ,track} from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
import{fireEvent} from 'c/pubsub';
export default class PubComp extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    callEvent(event){
            var eventParam={'firstname':'Vinayak'};
            fireEvent(this.pageRef,'pubsubevent',eventParam);
    }
}