import { LightningElement ,track } from 'lwc';

export default class RefreshLWC extends LightningElement {
@track selectedValue;
    handleChange(event){
        this.selectedValue =event.target.value;
    }
    refreshComponent(event){
        eval("$A.get('e.force:refreshView').fire();");
    }
}