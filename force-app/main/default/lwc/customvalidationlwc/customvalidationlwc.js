import { LightningElement, track } from 'lwc';
 
export default class Customvalidationlwc extends LightningElement {
 
    handleValidation() {
        let nameCmp = this.template.querySelector(".nameCls");
        let dateCmp = this.template.querySelector(".dateCls");
        let emailCmp = this.template.querySelector(".emailCls");
    
     /*    if (!nameCmp.value) {
            nameCmp.setCustomValidity("Name value is required");
        } else {
            nameCmp.setCustomValidity(""); // clear previous value
        } */
        if(nameCmp.value==='test'){
            nameCmp.setCustomValidity("Enter Valid Name")
             nameCmp.reportValidity();
        }
       
 
        if (!dateCmp.value) {
            dateCmp.setCustomValidity("Date value is required");
        } else {
            dateCmp.setCustomValidity(""); // clear previous value
        }
        dateCmp.reportValidity();
 
        if (!emailCmp.value) {
            emailCmp.setCustomValidity("Email value is required");
        } else {
            emailCmp.setCustomValidity(""); // clear previous value
        }
        emailCmp.reportValidity();
    }
}