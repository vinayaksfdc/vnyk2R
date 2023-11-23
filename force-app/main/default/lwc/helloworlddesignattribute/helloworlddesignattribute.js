import { LightningElement, api } from 'lwc';
export default class Helloworlddesignattribute extends LightningElement {
    @api firstName ='Amit';
    @api strTitle ='Welcome in Salesforce';
    @api showImage =false;
    @api imgUrl ='';
}