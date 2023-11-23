import { LightningElement,wire } from 'lwc';
import getlocation from '@salesforce/apex/zomatoClass.getLocation';
export default class SearchRestaurants extends LightningElement {

  /*  

    
   cityName;

   @wire(getlocation, { locationName: '$cityName' })
   location;

   handleLocationChange() {
       this.cityName = this.template.querySelector(
           'lightning-input'
       ).value;
       console.log('cityName'+this.cityName);
   }


    */
   
   city;
   location;
   error;
   handleLocationChange(event)
   {
       this.city=event.target.value;
       console.log(event.target.value);
   }

  
   selectLocation()
   {
       getlocation({ locationName: this.city })
       .then(result => {
        this.location = result;
        this.error = undefined;
    })
    .catch(error => {
        this.error = error;
        this.city = undefined;
    });
   }

   
}