import { LightningElement,track,wire } from 'lwc';

import getContacts from '@salesforce/apex/ExploreCustomContactController.getContacts';

const columns = [
    { label: 'Label', fieldName: 'Name' },
    { label: 'Website', fieldName: 'LeadSource' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Account Name', fieldName: 'Account.Name'},
    { label: 'Account Industry', fieldName: 'Account.Industry'}
    
];

export default class ExploreCustomDataTable1 extends LightningElement {

    @track allContacts = [];
    @track columns = columns;
    
    //wiring an apex method to a function
    @wire(getContacts)
    wiredContacts({ error, data }) {
        if(data) {
  
           this._flat(data);
            
            //assign the array to an array that's used in the template file
            this.allContacts = contactsArray;
        } else if (error) {
            this.error = error;
        }
    }
    
    _flat=(data)=>{
        let contactsArray = [];
        for (let row of data) {
            // this const stroes a single flattened row. 
            const flattenedRow = {}
            
            // get keys of a single row — Name, Phone, LeadSource and etc
            let rowKeys = Object.keys(row); 
           
            //iterate 
            rowKeys.forEach((rowKey) => {
                
                //get the value of each key of a single row. John, 999-999-999, Web and etc
                const singleNodeValue = row[rowKey];
                
                //check if the value is a node(object) or a string
                if(singleNodeValue.constructor === Object){
                    
                    //if it's an object flatten it
                    this._flatten(singleNodeValue, flattenedRow, rowKey)        
                }else{
                    
                    //if it’s a normal string push it to the flattenedRow array
                    flattenedRow[rowKey] = singleNodeValue;
                }
                
            });
           
            //push all the flattened rows to the final array 
            contactsArray.push(flattenedRow);
        }
        this.allContacts = contactsArray;
    }
    /* create keys in the format of Account.Id, Account.Rating, Account.Industry and etc
    
    we can avoid using this function by reusing the above function. 
    
    To understand in easily I used a separate function 
    
    Feel free to refactor it */
    _flatten = (nodeValue, flattenedRow, nodeName) => {        
        let rowKeys = Object.keys(nodeValue);
        rowKeys.forEach((key) => {
            let finalKey = nodeName + '.'+ key;
            flattenedRow[finalKey] = nodeValue[key];
        })
    }

}