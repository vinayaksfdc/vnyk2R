//        recordTypeId: '0122v000001vKAOAA2',
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Brand__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Type__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';

// Ligthning Message Service and a message channel
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';


/** The delay used when debouncing event handlers before firing the event. */
const DELAY = 350;

/**
 * Displays a filter panel to search for Product__c[].
 */
export default class ShirtFilter extends LightningElement {
    searchKey = '';
    maxPrice = 10000;

    filters = {
        searchKey: '',
        maxPrice: 10000
    };

    @wire(CurrentPageReference) pageRef;

    @wire(getPicklistValues, {
        recordTypeId: '0122v000001vKAOAA2',
        fieldApiName: CATEGORY_FIELD
    })
    brands;

    @wire(getPicklistValues, {
        recordTypeId: '0122v000001vKAOAA2',
        fieldApiName: LEVEL_FIELD
    })
    types;

    @wire(getPicklistValues, {
        recordTypeId: '0122v000001vKAOAA2',
        fieldApiName: MATERIAL_FIELD
    })
    materials;

    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleMaxPriceChange(event) {
        const maxPrice = event.target.value;
        this.filters.maxPrice = maxPrice;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {
        if (!this.filters.brands) {
            // Lazy initialize filters with all values initially set
            this.filters.brands = this.brands.data.values.map(
                item => item.value
            );
            this.filters.types = this.types.data.values.map(
                item => item.value
            );
            this.filters.materials = this.materials.data.values.map(
                item => item.value
                
            );
        }
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                item => item !== value
            );
        }
       
          // Published ProductsFiltered message
          publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
            filters: this.filters
        });
    }

    delayedFireFilterChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            fireEvent(this.pageRef, 'filterChange', this.filters);
        }, DELAY);
    }
}