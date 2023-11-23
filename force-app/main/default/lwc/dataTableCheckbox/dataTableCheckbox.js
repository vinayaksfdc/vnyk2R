/**
 * @File Name          : dataTableCheckbox.js
 * @Description        : Checkbox option added on the dataTable to enable rendering of clickable checkbox as a column.
 * @Author             : Swapnil Saurav
 * @Group              : 
 * @Last Modified By   : Swapnil Saurav
 * @Last Modified On   : 4/2/2020, 11:16:08 AM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    3/20/2020        Swapnil Saurav          Initial Version
**/
import { LightningElement,api,track } from 'lwc';

export default class DataTableCheckbox extends LightningElement {
    @api name;
    @api label;
    @api recordId;
    @api checked;
    @api selectionName; // distinguish between 2 checkboxes
    handleClick(event) {
        this.checked = this.template.querySelector('lightning-input').checked;
        this.dispatchEvent(new CustomEvent('checkboxclick', {
            detail: {
                name: this.name,
                label: this.label,
                recordId: this.recordId,
                checked: this.checked,
                selectionName: this.selectionName,
            },
            bubbles: true,
            composed: true
        }));
    }
}