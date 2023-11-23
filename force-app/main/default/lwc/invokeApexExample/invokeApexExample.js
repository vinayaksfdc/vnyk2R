import { LightningElement,api,wire}  from 'lwc';
  import getAccounts from '@salesforce/apex/AccountController.getAccounts';
 
 import {
     FlowAttributeChangeEvent,
     FlowNavigationNextEvent,
 } from 'lightning/flowSupport';
 
  
 
 export default class InvokeApexExample   extends LightningElement {
     @api 
  
     AccList=[];
     
  
 
 
    
 }