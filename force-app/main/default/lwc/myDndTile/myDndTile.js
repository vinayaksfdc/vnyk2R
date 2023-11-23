/* eslint-disable no-console */
import { LightningElement,api } from 'lwc';

export default class MyDndTile extends LightningElement {
    
   // @track car;
   @api tasknameDrag;
   areDetailsVisible = false;
 
   




   handleDrop(event) {
       event.preventDefault();
       this.areDetailsVisible = true;
       // Product__c from LDS
       const task = JSON.parse(event.dataTransfer.getData('task'));
       console.log('task'+task);
       
       this.tasknameDrag=task;
       
   }

   /** Handles for dragging events. */
   handleDragOver(event) {
       event.preventDefault();
   }

}