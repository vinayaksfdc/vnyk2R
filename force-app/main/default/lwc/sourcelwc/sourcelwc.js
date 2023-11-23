import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; //import library for navigation

export default class Sourcelwc extends NavigationMixin(LightningElement) {
    @track text = ""; //for taking user input
    handleChange(event) {
        this.text = event.target.value;
    }
    handleClick() {
        let compDefinition = {
            componentDef: "c:targetlwc",
            attributes: {
                ParentMessage : this.text != "" ? this.text : "No Name Provided."
            }
        };
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedCompDef
            }
        });
    }
}