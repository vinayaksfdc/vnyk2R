/* eslint-disable no-console */
import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;

    @wire(CurrentPageReference) pageRef;

    handleCarSelect(event){
        event.preventDefault();
        console.log('car id'+this.car.Id);
        const carId = this.car.Id;
        

        const carSelect = new CustomEvent('carselect', {detail:carId});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carselect', this.car.Id);
    }

    get isCarSelected(){
        if(this.car.Id === this.carSelectedId){
            return "tile selected";
        }
        return "tile";
    }
}