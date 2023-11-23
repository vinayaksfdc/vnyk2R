import { LightningElement,track,wire } from 'lwc';
import getFeildApiNames from '@salesforce/apex/dualListExample.getFeildApiNames';
import getSObjects from '@salesforce/apex/dualListExample.getSObjects';
import getList from '@salesforce/apex/dualListExample.getList';
export default class DynamicDatatable extends LightningElement {

allowedFormats =  ['font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
    'background','code','code-block'];


selected = [];
displayTable=false;
@track listOfObjectNames=[];
@track records=[];
@track options;
@track fieldAPIoptions;
objectName;

    connectedCallback() {
       this.getSObjectOptions();
    }
    /* To get the list of sobjects */
    getSObjectOptions() {
            getSObjects()
                .then((response) => {
                  let options = [];
                 
                for (var key in response) {
                    options.push({ label: key, value: response[key]  });
                }
                options.sort(); 
                this.options = options;
                })
                .catch((error) => {
                    // toast your error
                });
    }
    
     /* To get the list of fields of Selected Sobjects */
    @wire(getFeildApiNames, {objectName:'$objectName'})
    WiredObjects_Type({ error, data }) {
        if (data) {
            try {
            let options = [];
                for (var key in data) {
                    options.push({ label: key, value: data[key]  });
                }
                this.fieldAPIoptions = options;
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }

     /* On Change of picklist Object is selected */
    handleTypeChange(event){
        var Picklist_Value = event.target.value; 
        this.objectName=event.target.value;
        console.log('Picklist_Value',this.objectName);
    }

     /* The Selected Fields moved to selected Box*/
    handleChange(event){
       console.log('event.detail.value',event.detail.value); 
       const selectedOptionsList = event.detail.value;
       this.selected = selectedOptionsList;
    }

     /* Dynamically Display Datatable*/
    handleLoad() {
          let tempListData = [];                      
        getList({ fields: this.selected,objectName:this.objectName })
            .then(result => {
                result.forEach(currentItem => {
                       let recordListTemp=[];
                     for (const [key, value] of Object.entries(currentItem)) {
                        console.log(key);
                        if(key!=='Id'){
                            if (currentItem.hasOwnProperty(key)) { 
                                recordListTemp.push({value:currentItem[key], key:key});
                            }  
                           else{
                                recordListTemp.push({value:'', key:key});
                            }
                        }}   
                        tempListData.push(recordListTemp);
                });
                this.records=tempListData;
                console.log(JSON.stringify(this.records));
            })
            .catch(error => {
                this.error = error;
            });
    }

    onButtonClick(){
        this.displayTable=true;
        this.handleLoad();
    }  

     handlePDF(){
    	window.print();
	}
}