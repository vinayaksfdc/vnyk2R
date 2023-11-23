import { LightningElement, api } from 'lwc';

export default class MyDndItem extends LightningElement {
    @api task;

    itemDragStart(event) {
        event.dataTransfer.setData('task', JSON.stringify(this.task.name));
    }
}