import { LightningElement,wire } from 'lwc';
import srchval from '@salesforce/apex/searchParam.SearchString';

export default class SearchParam extends LightningElement {
    searchKey = '';
    @wire (srchval, {searchKey : 'Peter'}) helloWorld;


    handleKeyChange( ) {
        
    }
}