/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
    
import { LightningElement, api,wire,track } from 'lwc';
 
 import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';


export default class CarCard extends LightningElement {

 
     
 
   
   // @track car;
    @api carDrag;
    areDetailsVisible = false;
    
     publisherMessage = '';
    subscription = null;
 
    handleDrop(event) {
        event.preventDefault();
        this.areDetailsVisible = true;
        // Product__c from LDS
        const car = JSON.parse(event.dataTransfer.getData('car'));
        console.log('car'+car);
        
        this.carDrag=car;
        
    }

    /** Handles for dragging events. */
    handleDragOver(event) {
        event.preventDefault();
    }

    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        alert(this.recordId = message.recordId);
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: reduceErrors(error).join(', '),
                variant: 'error'
            })
        );
    }
}