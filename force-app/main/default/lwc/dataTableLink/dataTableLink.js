/**
 * @File Name          : dataTableLink.js
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Sasank Subrahmanyam V
 * @Last Modified On   : 10/16/2019, 3:06:42 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    10/16/2019   Sasank Subrahmanyam V     Initial Version
**/
import { LightningElement, track, api } from 'lwc';
export default class DataTableLink extends LightningElement {
    @api recordId;
    @api label;
    @api name;
    @api favorite;
    @api wrap = false;
    @api target = '_blank';
    @track style;

    connectedCallback() {
        if (this.wrap) {
            this.style = 'slds-p-left_x-small slds-cell-wrap';
        }
        else {
            this.style = 'slds-p-left_x-small';
        }
    }
    handleClick(event) {
        if (this.target === '_event') {
            this.dispatchEvent(new CustomEvent('linkevent', {
                detail: {
                    name: this.name,
                    recordId: this.recordId
                },
                bubbles: true,
                composed: true
            }));
        }
        else
            window.open('/' + this.recordId, this.target)
    }
}