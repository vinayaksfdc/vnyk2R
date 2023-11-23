import { LightningElement,api,track } from 'lwc';

export default class REFD_singleLine extends LightningElement {
    @api recordId;
    @api objectApiName='Contact';

    keyIndex = 0;
    @track itemList = [
        {
            id: 0
        }
    ];

    addRow() {
        this.keyIndex++;
        this.itemList.push({
            id: this.keyIndex
        });
    }
    deleteRow(){

    }
}