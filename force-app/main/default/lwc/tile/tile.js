/* eslint-disable no-undef */
/* eslint-disable no-console */
import { LightningElement,api,track } from 'lwc';

export default class Tile extends LightningElement {
    @api car;
    @track carSelectedId;

   
    handleCarSelect(event){
        event.preventDefault();
      //  console.log('car id'+this.car.Id);
        const carId = this.car.Id;
         const carSelect = new CustomEvent('carselect', {detail:carId});
         this.dispatchEvent(carSelect);
     //  fireEvent(this.pageRef, 'carselect', this.car.Id);
 
    }
    handleDragStart(event) {
        event.dataTransfer.setData('car', JSON.stringify(this.car));
    }

    
}