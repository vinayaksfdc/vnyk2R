/**
 * @File Name          : lookup.js
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Vimal K
 * @Last Modified On   : 3/23/2020, 11:22:11 AM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    1/20/2020   Sasank Subrahmanyam V     Initial Version
 * 1.1    3/19/2020   Vimal K                   Scroll Issue on Lookup
 * 1.2    3/23/2020   Vimal K                   Sub Title Issue
**/
import { LightningElement, track, api, wire } from 'lwc';
import getSObjectsMap from '@salesforce/apex/lookupController.getSObjectsMap';
import getRecentRecords from '@salesforce/apex/lookupController.getRecentRecords';

const MINIMAL_SEARCH_TERM_LENGTH = 2; // Min number of chars required to search
const SEARCH_DELAY = 300; // Wait 300 ms after user stops typing then, peform search

export default class Lookup extends LightningElement {
    @api label;

    @api objectApiName;
    @api iconName;
    @api searchFields;
    @api titleField;
    @api subtitleField; 
    @api filters;
    @api queryType = 'SOQL';
    @api orderBy;
    @api sortAscending = false;
    @api limit = 50;
    @api hideAdvanceSearch = false;
    @api advanceSearchConfig;
    @api value;
    @api disabled = false;

    @api errorMessage;
    @api selection = [];
    @api placeholder = '';
    @api isMultiEntry = false;
    @api errors = [];
    @api customKey;

    @track searchTerm = '';
    @track searchResults = [];
    @track recentResults = [];
    @track hasFocus = false;
    @track loading = false;
    isMouseDown =false;

    cleanSearchTerm = '';
    blurTimeout;
    searchThrottlingTimeout;

    @api
    hasSelection() {
        return Array.isArray(this.selection) && this.selection.length > 0;
    }

    @api
    getSelection() {
        return this.selection;
    }

    @api
    getkey() {
        return this.customKey;
    }

    connectedCallback() { }

    openAdvancedSearch() {
        this.dispatchEvent(new CustomEvent('advancesearchopened'));
        this.template.querySelector('c-lookup-advance-search').show(this.cleanSearchTerm);
    }

    getRecentRecords() {
        this.loading = true;
        const params = {
            objectApiName: this.objectApiName,
            searchFields: this.searchFields,
            titleField: this.titleField,
            subtitleField:  this.subtitleField,
            orderBy: this.orderBy,
            iconName: this.iconName,
            sortAscending: this.sortAscending,
            limitRecords: this.limit
        };
        getRecentRecords({ params })
            .then((result) => {
                this.recentResults = result.records;
            })
            .catch((error) => {
                console.error('ERROR => ', error);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    // INTERNAL FUNCTIONS
    updateSearchTerm(event) {
        const newSearchTerm = event.target.value;
        this.searchTerm = newSearchTerm;

        // Compare clean new search term with current one and abort if identical
        const newCleanSearchTerm = newSearchTerm.trim().replace(/\*/g, '').toLowerCase();
        if (this.cleanSearchTerm === newCleanSearchTerm) {
            return;
        }

        // Save clean search term
        this.cleanSearchTerm = newCleanSearchTerm;

        // Ignore search terms that are too small
        if (newCleanSearchTerm.length < MINIMAL_SEARCH_TERM_LENGTH) {
            this.searchResults = [];
            return;
        }

        // Apply search throttling (prevents search if user is still typing)
        if (this.searchThrottlingTimeout) {
            clearTimeout(this.searchThrottlingTimeout);
        }
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.searchThrottlingTimeout = setTimeout(() => {
            // Send search event if search term is long enougth
            if (this.cleanSearchTerm.length >= MINIMAL_SEARCH_TERM_LENGTH) {
                // Display spinner until results are returned
                this.loading = true;
                this.handleSearch();
            }
            this.searchThrottlingTimeout = null;
        }, SEARCH_DELAY);
    }

    handleSearch() {
        const params = {
            objectApiName: this.objectApiName,
            searchFields: this.searchFields,
            titleField: this.titleField,
            subtitleField:  this.subtitleField,
            filters: this.filters,
            orderBy: this.orderBy,
            queryType: this.queryType,
            searchTerm: this.searchTerm,
            iconName: this.iconName,
            sortAscending: this.sortAscending,
            limitRecords: this.limit
        };
        getSObjectsMap({ params })
            .then((result) => {
                this.searchResults = result.records;
            })
            .catch((error) => {
                console.error('ERROR => ', error);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    isSelectionAllowed() {
        if (this.isMultiEntry) {
            return true;
        }
        return !this.hasSelection();
    }

    // EVENT HANDLING

    handleInput(event) {
        // Prevent action if selection is not allowed
        if (!this.isSelectionAllowed()) {
            return;
        }
        this.updateSearchTerm(event);
    }

    handleKeypress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.openAdvancedSearch();
        }
    }

    handleResultClick(event) {
        const recordId = event.currentTarget.dataset.recordid;
        this.handleSelection(recordId);
    }

    handleAdvanceSelection(event) {
        this.selection = [
            {
                id: event.detail.recordId,
                sObjectType: this.objectApiName,
                iconName: this.iconName,
                title: event.detail.name,
                subtitle: ''
            }
        ];
        this.handleSelectionChange();
        this.template.querySelector('c-lookup-advance-search').close();
        this.resetSearch();
    }

    handleSelection(recordId) {
        // Save selection
        let selectedItem = this.searchEnabled
            ? this.searchResults.filter((result) => result.id === recordId)
            : this.recentResults.filter((result) => result.id === recordId);
        if (selectedItem.length === 0) {
            return;
        }
        selectedItem = selectedItem[0];
        const newSelection = [...this.selection];
        newSelection.push(selectedItem);
        this.selection = newSelection;
        this.handleSelectionChange();
        this.resetSearch();
    }

    resetSearch() {
        // Reset search
        this.searchTerm = '';
        this.cleanSearchTerm = '';
        this.searchResults = [];
    }

    handleComboboxClick() {
        // Hide combobox immediatly
        if (this.blurTimeout) {
            window.clearTimeout(this.blurTimeout);
        }
        this.hasFocus = false;
    }

    handleFocus() {
        // Prevent action if selection is not allowed
        if (!this.isSelectionAllowed()) {
            return;
        }
        this.hasFocus = true;
        if (this.cleanSearchTerm.length === 0) {
            this.getRecentRecords();
        }
    }

    handleBlur() {
        // Prevent action if selection is not allowed
        if (!this.isSelectionAllowed()) {
            return;
        }

        // If Click happens on scroll area or inside the Combo Box, No Action
        if(this.isMouseDown){
            this.isMouseDown=false;
            return; 
        }

        // Delay hiding combobox so that we can capture selected result
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.blurTimeout = window.setTimeout(() => {
            this.hasFocus = false;
            this.blurTimeout = null;
        }, 300);
    }

    handleMouseDown(event){
        this.isMouseDown =true;
    }

    handleRemoveSelectedItem(event) {
        const recordId = event.currentTarget.name;
        this.selection = this.selection.filter((item) => item.id !== recordId);
        // Notify parent components that selection has changed
        this.handleSelectionChange();
    }

    handleClearSelection() {
        this.selection = [];
        this.template.querySelector('input').focus();
        // Notify parent components that selection has changed
        this.handleSelectionChange();
    }

    handleSelectionChange() {
        const selection = this.hasSelection() ? this.getSelection()[0] : {};
        this.dispatchEvent(
            new CustomEvent('selectionchange', {
                detail: {
                    selection,
                    value: this.hasSelection() ? this.getSelection()[0].id : ''
                }
            })
        );
    }

    // STYLE EXPRESSIONS

    get getContainerClass() {
        let css = 'slds-combobox_container slds-has-inline-listbox ';
        if (this.hasFocus) {
            // && this.hasResults()) {
            css += 'slds-has-input-focus ';
        }
        if (this.errorMessage || this.errors.length > 0) {
            css += 'slds-has-error';
        }
        return css;
    }

    get advancedSearchLinkText() {
        return `Search "${this.cleanSearchTerm}"`;
    }

    get getDropdownClass() {
        let css = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ';
        if (this.hasFocus) {
            // && this.cleanSearchTerm && this.cleanSearchTerm.length >= MINIMAL_SEARCH_TERM_LENGTH) {
            css += 'slds-is-open';
        }
        return css;
    }

    get getInputClass() {
        let css = 'slds-input slds-combobox__input has-custom-height ' + (this.errors.length === 0 ? '' : 'has-custom-error ');
        if (!this.isMultiEntry) {
            css += 'slds-combobox__input-value ' + (this.hasSelection() ? 'has-custom-border' : '');
        }
        return css;
    }

    get getComboboxClass() {
        let css = 'slds-combobox__form-element slds-input-has-icon ';
        if (this.isMultiEntry) {
            css += 'slds-input-has-icon_right';
        } else {
            css += this.hasSelection() ? 'slds-input-has-icon_left-right' : 'slds-input-has-icon_right';
        }
        return css;
    }

    get getSearchIconClass() {
        let css = 'slds-input__icon slds-input__icon_right ';
        if (!this.isMultiEntry) {
            css += this.hasSelection() ? 'slds-hide' : '';
        }
        return css;
    }

    get getClearSelectionButtonClass() {
        return 'slds-button slds-button_icon slds-input__icon slds-input__icon_right ' + (this.hasSelection() ? '' : 'slds-hide');
    }

    get getSelectIconName() {
        return this.hasSelection() ? this.selection[0].iconName : 'standard:default';
    }

    get getSelectIconClass() {
        return 'slds-combobox__input-entity-icon ' + (this.hasSelection() ? '' : 'slds-hide');
    }

    get getInputValue() {
        if (this.isMultiEntry) {
            return this.searchTerm;
        }
        return this.hasSelection() ? this.selection[0].title : this.searchTerm;
    }

    get getInputTitle() {
        if (this.isMultiEntry) {
            return '';
        }

        return this.hasSelection() ? this.selection[0].title : '';
    }

    get isInputReadonly() {
        if (this.isMultiEntry) {
            return false;
        }
        return this.hasSelection();
    }

    get searchEnabled() {
        return this.cleanSearchTerm.length >= MINIMAL_SEARCH_TERM_LENGTH;
    }

    get enableAdvanceSearch() {
        return this.searchEnabled && !this.hideAdvanceSearch;
    }

    get hasSearchResults() {
        return this.searchEnabled && Array.isArray(this.searchResults) && this.searchResults.length > 0;
    }

    get userMessage() {
        if (this.searchEnabled) {
            if (this.loading) return 'Searching...';
            else if (!this.hasSearchResults) return 'No Records Found.';
        } else if (Array.isArray(this.recentResults) && this.recentResults.length === 0) {
            return 'No Records Found.';
        }
        return null;
    }

    get showCloseButton() {
        return !this.isMultiEntry && !this.disabled;
    }
}