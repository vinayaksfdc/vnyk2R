import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    value = 'inProgress';
    @api valueFromParent;

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
        this.template.querySelector('c-grand-child-component').handleChange(valueFromParent);
    }
}