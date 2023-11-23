import { LightningElement,track } from 'lwc';
import getShirts from '@salesforce/apex/getShirtList.getShirts';
export default class ShirtList extends LightningElement {
  
    @track slctshrts=[];
    @track res; 
    @track dataArray = [];
    @track processedArray = [];
    @track selectedAccountId;
    
    fetchShirts(){
        getShirts().then(response=>{
            console.log(response);
            const val=JSON.stringify(response);
            console.table(val);
            console.table(JSON.stringify(response));
            this.res=response;
        }).catch(error=>{
            console.error(error);
        })
    }

    connectedCallback(){
        this.fetchShirts();
        console.log('shirts executed');
        console.log('this.slctshrts'+JSON.stringify(this.slctshrts));
    }
    
    handleClick(event){
        console.log('event : ', event.currentTarget.dataset.value);
       
        this.slctshrts.push(event.currentTarget.dataset.value);
        console.log('this.slctshrts'+this.slctshrts);
        console.log('this.slctshrts'+JSON.stringify(this.slctshrts));

     }


     onAccountSelection(event){
        console.log('event Recieved');
        this.selectedAccountId = event.detail.recordId;
        console.log(this.selectedAccountId);
        var itemList = this.slctshrts;
        console.log('this.slctshrts on AccountSelection'+this.slctshrts)
        // eslint-disable-next-line no-unused-vars
        var index;
        var newList = [];
        for (var i = 0; i < itemList.length; i++) {
            console.log(JSON.stringify(itemList[i]));
            if (itemList[i] !== this.selectedAccountId) {
                newList.push(itemList[i]);
            }
        }
        console.log('newList'+JSON.stringify(newList));
        this.slctshrts = newList;
        console.log(JSON.stringify(this.slctshrts.length));
        
        
    }

    handleClick() {
        this.template
          .querySelectorAll("c-shirt-list-item")
          .forEach(element => {
            console.log(elements);
          });
      }


      handleOrderItemChange(evt) {
        const orderItemChanges = evt.detail;
        console.log('shirt List handleOrderItemChange'+orderItemChanges);
      }
    
}