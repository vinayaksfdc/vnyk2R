import { LightningElement, wire } from 'lwc';
import fetchleads from '@salesforce/apex/LeadController.fetchleads';

export default class Datatable_ex extends LightningElement {

    @wire(fetchleads) lds;
    lds;
}