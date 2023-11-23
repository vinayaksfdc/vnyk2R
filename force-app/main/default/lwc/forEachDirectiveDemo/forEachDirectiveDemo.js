/* eslint-disable no-console */
/* eslint-disable no-undef */
import { LightningElement, track } from 'lwc';

export default class ForEachDirectiveDemo extends LightningElement {
    @track cities = [
        {
            Id: 1,
            Name: 'Hyderabad',
        },
        {
            Id: 2,
            Name: 'Noida',
        },
        {
            Id: 3,
            Name: 'Pune',
        },
    ];

    removeRow(event){       
        console.log('Access key2:'+event.target.accessKey);
        console.log(event.target.id.split('-')[0]);
        if(this.cities.length>=1){             
             this.cities.splice(event.target.accessKey,1);
            console.log('after splice'+JSON.stringify(this.cities));

            // this.keyIndex-1;
        }
    } 

     
}