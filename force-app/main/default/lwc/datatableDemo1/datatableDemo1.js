import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/datatableDemo.getAccounts1'
 import {loadStyle} from 'lightning/platformResourceLoader'
 import COLORS from '@salesforce/resourceUrl/colors'
const COLUMNS = [
    {label:'Account Name', fieldName:'Name',   type:'text',cellAttributes:{
        class:{fieldName:'accountColor'}
    }
     },
    {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency',cellAttributes:{
        class:{fieldName:'revenueColor'}
    } },
    {label:'Industry', fieldName:'Industry', type:'text',cellAttributes:{
        class:{fieldName:'industryColor'}
    }},
    {label:'Phone', fieldName:'Phone', type:'phone'},
     {label:'Rating', fieldName:'Rating', type:'text',cellAttributes:{
        class:{fieldName:'ratingColor'}
    }},
]
export default class DatatableDemo1 extends LightningElement {
    tableData
    columns = COLUMNS
    isCssLoaded = false

    @wire(getAccounts)
    accountsHandler({data, error}){ 
        if(data){ 
            
             this.tableData = data.map(item=>{
                 let ratingColor;
                 let industryColor;
                 let revenueColor = item.AnnualRevenue <500000 ? "slds-text-color_error":"slds-text-color_success"
                /* let amountColor = item.AnnualRevenue <500000 ? "slds-text-color_error":"slds-text-color_success"
                let iconName = item.AnnualRevenue <500000 ? "utility:down":"utility:up" */
               
                if(item.Rating==='Hot'){
                    ratingColor="slds-text-color_success"
                }
                else{
                    ratingColor="slds-text-color_default"
                }
                return {...item, 
                    "ratingColor":ratingColor,
                    "revenueColor":revenueColor,
                    "accountColor":"datatable-orange",
                    "industryColor":"datatable-pink"
                     
                }
            })
            console.table('======='+JSON.stringify(this.tableData));  

          /*   this.tableData=data.forEach(ele => {
                ele.format = ele.Rating === "Hot" ? 'slds-text-color_error' : 'slds-text-color_success';
            });
            this.data = data;
            console.log(this.tableData);  */
        }
        if(error){
            console.error(error)
        }
    }

     renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }  

}