/**
 * @File Name          : recordField.js
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Swapnil Saurav
 * @Last Modified On   : 6/17/2020, 4:07:14 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    1/23/2020   Sasank Subrahmanyam V     Initial Version
 * 2.0    6/17/2020   Swapnil Saurav            R7 Release: Added subtitleField for lookup.js
**/
import { LightningElement, api, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const OPTION_NONE = '--None--';

export default class RecordField extends LightningElement {
    // Generic public properties
    @api type = 'input';
    @api
    get fieldName() {
        return this._fieldName;
    }
    set fieldName(value) {
        if (!this.fieldApiName) this.fieldApiName = value;
        this.setAttribute('field-name', value);
        this._fieldName = value;
    }
    @api
    get dependentOn() {
        return this._dependentOn;
    }
    set dependentOn(value) {
        this.setAttribute('dependent-on', value);
        this._dependentOn = value;
    }
    @api fieldApiName;
    @api label;
    @api fieldType = 'text';
    @api placeholder = '';
    @api
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.lookupFieldType) {
            this.defaultLookupFieldApiNames = [`${this.objectApiName}.${this.titleField}`];
            this.defaultLookupRecordId = val;
        }
    }
    @api defaultLookup;
    @api required = false;
    @api disabled = false;

    // Lookup specific public properties
    @api objectApiName;
    @api iconName;
    @api searchFields;
    @api titleField;
    @api filters;
    @api queryType = 'SOQL';
    @api orderBy;
    @api sortAscending = false;
    @api limit = 50;
    @api hideAdvanceSearch = false;
    @api subtitleField;
    @api advanceSearchConfig;

    @api messageWhenValueMissing = 'Complete this field.';

    @api fieldQualifiedName; // internal use
    @api fieldLookupQualifiedName; // internal use

    @track lookupDefaultSelection = [];
    @track errors = [];
    @track fieldValues = {};
    @track options = [];
    @track parentPicklistValue;

    controllerValues = {};
    recordTypeId;
    picklistFieldQualifiedName;
    defaultLookupRecordId;
    defaultLookupFieldApiNames;

	/**
	 * @description Fetches picklist field options after qualified name is set by record-form
	 * @author Sasank Subrahmanyam V
	 * @date 2020-01-26
	 * @param {*} { data, error }
	 * @memberof RecordField
	 */
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$picklistFieldQualifiedName' })
    picklistValues({ data, error }) {
        console.log('picklistValues picklistFieldQualifiedName => ', this.picklistFieldQualifiedName);
        if (data) {
            console.log('picklistValues => ', this.picklistFieldQualifiedName, JSON.stringify(data));
            this.options = [{ value: '', label: OPTION_NONE }, ...data.values];
            this.controllerValues = data.controllerValues;
        } else if (error) {
            console.error('ERROR => ', error);
        }
    }

    @wire(getRecord, { recordId: '$defaultLookupRecordId', fields: '$defaultLookupFieldApiNames' })
    fetchRecord({ data, error }) {
        if (data) {
            this.lookupDefaultSelection = [
                {
                    id: this.defaultLookupRecordId,
                    sObjectType: this.objectApiName,
                    iconName: this.iconName,
                    title: getFieldValue(data, `${this.objectApiName}.${this.titleField}`)
                }
            ];
        } else if (error) {
            console.error('ERROR => ', error);
        }
    }

    @track errorMessage;

    @api
    setError(errorMessage) {
        this.errorMessage = errorMessage;
    }

	/**
 * @description Setter of record type and picklistFieldQualifiedName which will invoke wire service to get picklist options. This is currently used by record form
 * @author Sasank Subrahmanyam V
 * @date 2020-01-26
 * @param {*} { recordTypeId, picklistFieldQualifiedName }
 * @memberof RecordField
 */
    @api
    fetchPicklistValues({ recordTypeId, picklistFieldQualifiedName }) {
        this.recordTypeId = recordTypeId;
        this.picklistFieldQualifiedName = picklistFieldQualifiedName;
    }

    @api
    setParentDependentValue(parentValue, reset) {
        if (reset) this.value = '';
        this.parentPicklistValue = parentValue;
    }

    @api
    setValues(vals) {
        this.fieldValues = vals;
        console.log('fieldValues => ', JSON.stringify(this.fieldValues));
        this.recordTypeId = vals.recordTypeId;
        this.value = vals.fieldValue;

        if (this.lookupFieldType) {
            this.lookupDefaultSelection = [
                {
                    id: vals.fieldId,
                    sObjectType: this.objectApiName,
                    iconName: this.iconName,
                    title: vals.fieldValue
                }
            ];
        }
    }

    connectedCallback() {
        if (this.picklistFieldType && !this.value) {
            this.value = '';
        }
        if (this.lookupFieldType && this.value) {
            this.fetchDefaultSelection();
        }

        this.dispatchEvent(
            new CustomEvent('fieldchange', {
                detail: {
                    origin: 'recordField',
                    fieldName: this.fieldName
                },
                bubbles: true
            })
        );
    }

    fetchDefaultSelection() {
        this.defaultLookupRecordId = this.value;
        this.defaultLookupFieldApiNames = [`${this.objectApiName}.${this.titleField}`];
    }

    @api
    getValue() {
        switch (true) {
            case this.lookupFieldType:
                return this.template.querySelector('c-lookup').hasSelection() ? this.template.querySelector('c-lookup').getSelection()[0].id : '';
            case this.textFieldType:
                return this.template.querySelector('lightning-input')[this.fieldType === 'checkbox' ? 'checked' : 'value'];
            case this.picklistFieldType:
                return this.template.querySelector('lightning-combobox').value;
            case this.richtextFieldType:
                return this.template.querySelector('lightning-input-rich-text').value;
            case this.textareaFieldType:
                return this.template.querySelector('lightning-textarea').value;
            default:
                return null;
        }
    }

    handleChange(event) {
        this.errorMessage = '';
        console.log('event value executing '+event.detail.value);
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                detail: {
                    origin: 'recordField',
                    parentDependentPicklist: this.dependentOn,
                    fieldName: this.fieldName,
                    value: event.detail.value
                },
                bubbles: true
            })
        );
    }

    handleAdvanceSearchOpened() {
        this.setError('');
    }

    get inputType() {
        return this.type === 'input';
    }

    get outputType() {
        return this.type === 'output';
    }

    get textFieldType() {
        return this.fieldType === 'text' || this.fieldType === 'date' || this.fieldType === 'datetime' || this.fieldType === 'checkbox';
    }

    get textareaFieldType() {
        return this.fieldType === 'textarea';
    }

    get richtextFieldType() {
        return this.fieldType === 'richtext';
    }

    get lookupFieldType() {
        return this.fieldType === 'lookup';
    }

    get picklistFieldType() {
        return this.fieldType === 'picklist';
    }

    get disableInput() {
        return this.disabled || (this.picklistFieldType && this.dependentOn && !this.parentPicklistValue);
    }

    get inputContainerClass() {
        return `slds-form-element ${this.errorMessage ? 'slds-has-error' : ''}`;
    }

    get picklistOptions() {
        if (!this.dependentOn) return this.options;

        const selectedIndex = this.controllerValues[this.parentPicklistValue];
        return this.options.filter((optItem) => {
            return optItem.value && optItem.validFor.includes(selectedIndex);
        });

    }
}