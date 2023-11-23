/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, wire,track } from 'lwc';
import{registerListener,unregisterAllListeners} from 'c/pubsub';
import{CurrentPageReference} from 'lightning/navigation';

export default class SubComp extends LightningElement {

    @track disp;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){

        registerListener('pubsubevent',this.handleCallback,this);
    }
    disconnectedCallback(){

        unregisterAllListeners(this);
    }
    handleCallback(detail)
    {
        console.log('event clicked');
        alert('parameter from publicsher'+detail.firstname);
        this.disp=detail.firstname;
    }
}