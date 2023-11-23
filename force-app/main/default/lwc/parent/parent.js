/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
export default class EventsWithObjectParent extends LightningElement {
     
    @track parentValue='Second Value';
    
    handleClick(){
        //access object parameters and assign the value
        console.log('Event clicked');
       this.parentValue= {"Model__c":"https://kat2k-dev-ed.lightning.force.com/resource/1562585193000/hasback?","Type__c":"Test Drive","Prospect__c":"0012v00002oPCPvAAO","Status__c":"New","Assigned_To_Dealership__c":"2020-01-30T20:00:00.000Z","Outcome__c":"Lost","Consultant__c":"0052v00000geHSSAA2","Id":"00Q2v00001bzBb9EAE","Prospect__r":{"Name":"JEFF","Id":"0012v00002oPCPvAAO"},"Consultant__r":{"Name":"vinayak bule","Id":"0052v00000geHSSAA2"}};
            alert(JSON.stringify(this.parentValue));
    }
    handleClick1(){
        //access object parameters and assign the value
        console.log('Event clicked');
       this.parentValue= 'test';
       //{"Model__c":"https://kat2k-dev-ed--c.visualforce.com/resource/1580135498000/f?","Type__c":"Test Drive","Prospect__c":"0012v00002oPCPvAAO","Status__c":"New","Assigned_To_Dealership__c":"2020-01-30T20:00:00.000Z","Outcome__c":"Lost","Consultant__c":"0052v00000geHSSAA2","Id":"00Q2v00001bzBb9EAE","Prospect__r":{"Name":"JEFF","Id":"0012v00002oPCPvAAO"},"Consultant__r":{"Name":"vinayak bule","Id":"0052v00000geHSSAA2"}};
    
           alert(JSON.stringify(this.parentValue));
    }
}