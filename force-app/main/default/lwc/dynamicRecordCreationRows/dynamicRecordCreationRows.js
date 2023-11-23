import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class DynamicRecordCreationRows extends NavigationMixin(LightningElement) {

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

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList.splice(event.target.accessKey, 1);
            this.keyIndex--;
        }
    }

    handleSubmit() {
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                console.log(element.submit());
            });
            // Navigate to the Account home page
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Contact',
                    actionName: 'home',
                },
            });
        }
    }

}