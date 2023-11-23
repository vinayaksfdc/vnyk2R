import { LightningElement,api } from 'lwc';
/* import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
    FlowNavigationFinishEvent
} from 'lightning/flowSupport';
 */

export default class LwcRichTextFlowExample extends LightningElement {
    @api label;
    @api value;
    @api placeholder;

    handleChange(event){
        event.preventDefault();
        this.value=event.detail.value
    }

    
}