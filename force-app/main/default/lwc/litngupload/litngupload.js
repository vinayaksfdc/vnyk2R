import { LightningElement,api,track } from 'lwc';

export default class Litngupload extends LightningElement {
    @track selectVal;
    @track value=false;
   
    

    get encryptedToken() {
        //use apex to get
    }

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }
    get options() {
        return [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' },
            ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        console.log('this value'+this.value);
        if(this.value === 'true')
        {
            return this.selectVal=true;
        }
        else
        {
            return this.selectVal=false;
        }
         
     }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert("No. of files uploaded : " + uploadedFiles.length);
    }
}