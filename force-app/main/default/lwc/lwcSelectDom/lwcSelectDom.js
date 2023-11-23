import { LightningElement, track } from 'lwc';

export default class ComboboxBasic extends LightningElement {
@track value = 'inProgress';

get options() {
    return [
             { label: 'New', value: 'new' },
             { label: 'In Progress', value: 'inProgress' },
             { label: 'Finished', value: 'finished' },
           ];
}
set options(value){
    return [ {label : 'InTransit',value:'InTransit'}]
}

handleChange(event) {
        this.value = event.detail.value;
     }
}