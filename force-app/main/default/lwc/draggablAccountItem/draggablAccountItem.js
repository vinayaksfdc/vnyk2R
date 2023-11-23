import { LightningElement,api } from 'lwc';

export default class DraggablAccountItem extends LightningElement {
    @api item = {};
	@api index = -1;
}