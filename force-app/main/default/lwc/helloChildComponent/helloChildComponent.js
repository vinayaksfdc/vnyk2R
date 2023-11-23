import { api, LightningElement } from 'lwc';
export default class HelloChildComponent extends LightningElement {
    @api city;
    @api open;

    makeTrue() {
        if (!this.open) {
            this.open = true;
        }
    }
}