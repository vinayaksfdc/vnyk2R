import { LightningElement ,track,api} from 'lwc';

export default class ChildGetter extends LightningElement {
    @track itemNameUpper='Hello';
    @api
    get itemName() {
        return this.itemNameUpper;
    }
    set itemName(value) {
        this.itemNameUpper = value.toUpperCase();
    }
}