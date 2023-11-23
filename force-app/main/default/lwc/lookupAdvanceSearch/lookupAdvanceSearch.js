/**
 * @File Name          : lookupAdvanceSearch.js
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : vinay.mekal@non.se.com
 * @Last Modified On   : 09-02-2020
 * @Modification Log   : CCCCASE-4524 R10 Release: Fixed the bug of lookup filter in advance search
 * Ver       Date            Author      		    Modification
 * 1.0    1/23/2020   Sasank Subrahmanyam V     Initial Version
 * 2.0    7/23/2020   Swapnil Saurav            CCCCASE-4524 R10 Release: Fixed the bug of lookup filter in advance search
**/
import { LightningElement, api, track } from 'lwc';

export default class LookupAdvanceSearch extends LightningElement {
    @api config;
    @api searchFields;

    @track searchText;
    @track showAdvanceSearch = false;
    @track searchCondition = '';

    @api
    show(searchText) {
        this.searchText = searchText;
        this.showAdvanceSearch = true;
        this.searchRecords(searchText);
    }

    @api
    close() {
        this.showAdvanceSearch = false;
    }

    handleKeypress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.searchRecords(event.target.value);
        }
    }

    searchRecords(searchTerm) {
        let searchConditionsList = this.searchFields.split(',').map(fld => {
            return `${fld} LIKE '%${searchTerm}%'`;
        });
        this.searchCondition = `(${searchConditionsList.join(' OR ')})`;
        if (this.config.advanceLookupFilter != undefined) {
            this.searchCondition = `${this.config.advanceLookupFilter} AND ${this.searchCondition}`;
        }
    }

    get modalClass() {
        if (this.showAdvanceSearch) return 'slds-modal slds-fade-in-open slds-slide-up-open slds-modal_large';
        return '';
    }
}