import { LightningElement,api } from 'lwc';
import {
    FlowAttributeChangeEvent,
    FlowNavigationPreviousEvent,
    FlowNavigationNextEvent,
    FlowNavigationFinishEvent
} from 'lightning/flowSupport';
export default class PassValueFromFlow extends LightningElement {
    @api firstname;

    @api lastname;
}