import { LightningElement,api } from 'lwc';

export default class ParentExample extends LightningElement {
    @api objContactData;
    myContactData;
    showFeeback = false;
    connectedCallBack(){
      this.myContactData = Object.assign({},this.objContactData);
    }
    showFeedbacks(event){
      this.showFeeback =  !this.showFeeback;
    }

    get isContactAvailable(){
      console.log(JSON.stringify(this.myContactData));
      return this.myContactData && this.myContactData.data && this.myContactData.data.length>0? 'YES' : 'No'
    }
}