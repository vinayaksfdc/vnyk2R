/* eslint-disable no-console */
import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

/** getProducts() method in ProductController Apex class */
import getProducts from '@salesforce/apex/shirtController.getProducts';

// Ligthning Message Service and message channels
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

/**
 * Container component that loads and displays a list of Product__c records.
 */
export default class ShirtTileList extends LightningElement {
    /**
     * Whether to display the search bar.
     * TODO - normalize value because it may come as a boolean, string or otherwise.
     */
    @api searchBarIsVisible = false;

    /**
     * Whether the product tiles are draggable.
     * TODO - normalize value because it may come as a boolean, string or otherwise.
     */
    @api tilesAreDraggable = false;

    /** Current page in the product list. */
    @track pageNumber = 1;

    /** The number of items on a page. */
    @track pageSize;

    /** The total number of items matching the selection. */
    @track totalItemCount = 0;

    /** JSON.stringified version of filters to pass to apex */
    @track filters = {};

    /** Load context for Ligthning Messaging Service */
    @wire(MessageContext) messageContext;

    @track recordTypeId='0122v000001vKBgAAM';
    
      /** Subscription for ProductsFiltered Ligthning message */
      productFilterSubscription;

    /**
     * Load the list of available products.
     */
    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber',recordtypeId:'$recordTypeId' })
    products;
    get(){
        console.log(JSON.stringify(this.products));
    }
    

    connectedCallback() {
         // Subscribe to ProductsFiltered message
         this.productFilterSubscription = subscribe(
            this.messageContext,
            PRODUCTS_FILTERED_MESSAGE,
            (message) => this.handleFilterChange(message)
        );
    }

    handleProductSelected(event) {
         // Published ProductSelected message
         publish(this.messageContext, PRODUCT_SELECTED_MESSAGE, {
            productId: event.detail
        });
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(event) {
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(filters) {
        this.filters = { ...filters };
        this.pageNumber = 1;
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
}