/* eslint-disable no-console */
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

/** Wire adapter to load records, utils to extract values. */
import { getRecord } from 'lightning/uiRecordApi';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners } from 'c/pubsub';

/** Product__c Schema. */
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import BRAND_FIELD from '@salesforce/schema/Product__c.Brand__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import PRICE_FIELD from '@salesforce/schema/Product__c.Price__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';
/** Record fields to load. */
const fields = [
    NAME_FIELD,
    TYPE_FIELD,
    BRAND_FIELD,
    MATERIAL_FIELD,
    PRICE_FIELD,
    PICTURE_URL_FIELD,
     
];

/**
 * Component to display details of a Product__c.
 */
export default class ShirtCard extends NavigationMixin(LightningElement) {
    /** Id of Product__c to display. */
    recordId;

    @wire(CurrentPageReference) pageRef;

    /** Load the Product__c to display. */
    @wire(getRecord, { recordId: '$recordId', fields })
    product;
    get()
    {
        console.log('product list'+JSON.stringify(this.product));
    }

    connectedCallback() {
        registerListener('productSelected', this.handleProductSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    /**
     * Handler for when a product is selected. When `this.recordId` changes, the @wire
     * above will detect the change and provision new data.
     */
    handleProductSelected(productId) {
        this.recordId = productId;
    }

    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

    get noData() {
        return !this.product.error && !this.product.data;
    }
}