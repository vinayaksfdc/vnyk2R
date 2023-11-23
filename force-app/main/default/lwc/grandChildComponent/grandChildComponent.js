import { LightningElement, api } from 'lwc';

export default class GrandChildComponent extends LightningElement {
    value = 'inProgress';

    @api valueFromChild;

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    @api
    handleChange(valueFromParent) {
        this.value = valueFromParent;
    }
}