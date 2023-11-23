/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import clickableEmail from './clickableEmail.html'
  

export default class MyDatatable extends LightningElement {
     static  customTypes={
        clickableEmail:{
          template:clickableEmail,
          standardCellLayout:true,
          typeAttributes

        }

     }
     
}