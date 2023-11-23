import { LightningElement, api } from 'lwc';

export default class ShowAccountFlows extends LightningElement {
    @api strRecordId;
    arrayFields = ['Name', 'AccountNumber', 'Phone', 'Type', 'Website'];
}