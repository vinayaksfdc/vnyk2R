import { LightningElement,wire } from 'lwc';

/* import GET_DATA from '@salesforce/apex/ClassName.methodName';
import DELETE from '@salesforce/apex/ClassName.methodName1'; */
import refreshApex from '@salesforce/apex';

export default class GrandChildExample extends LightningElement {
   /*  @api contactId;
      feedbackList = [];
      wiredResult;
      wire(GET_DATA, {contactId : '$contactId'})
      feedbacks(result){
          this.wiredResult = result;
          if(result.data){
              this.feedbackList = result.data;
          }
      }
      
      deleteFeedback(event){
          let feedbackId = event.target.getAttribute('data-id');
          DELETE({feebackId : this.feedbackId})
          .then(result=>{
              return refreshApex(this.wiredResult);
              this.dispatchEvent(new CustomEvent('feedback',bubbles:true,composed:true));
          })
      } */
}