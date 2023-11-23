import { LightningElement } from 'lwc';

export default class NamedSlots extends LightningElement {
    renderedCallback() {
        const val=this.querySelector('span'); // <span>push the green button.</span>
        console.log('valnamedslots'+val);
        const valall=this.querySelectorAll('span'); // [<span>push the green button</span>, <span>push the red button</span>]
        console.log('valallnamedslots'+JSON.stringify(valall));
    }
}