import { LightningElement } from 'lwc';
 
const lstHoliday = [];
//remember that in JS month is 0 to 11
lstHoliday.push(new Date(2020, 6, 3));   //Independence Day
lstHoliday.push(new Date(2020, 8, 7));   //Labor Day
lstHoliday.push(new Date(2020, 11, 25)); //Christmas Day
lstHoliday.push(new Date(2020, 5, 17));  //Custom holiday
//add more holidays here..
 
export default class BusinessDateCalculator extends LightningElement {
 
    sDateVal = ''; // class properity, bind with lightning input field
 
    //connectedCallback function will execute on component load 
    connectedCallback(){
        
        var oDate = new Date(); // today date
        var noOfDaysToAdd = 1; // number of days need to add in current date
        var count = 0;
      
       // run a loop until we get working date excluding weekends and holidays 
        while (count < noOfDaysToAdd) {
            oDate.setDate(oDate.getDate()+1)
            // here 0 is sunday and 6 is saturday 
            if (oDate.getDay() != 0 && oDate.getDay() != 6 && !this.isHoliday(oDate)) { 
                count++;
            }
        }
        
        var dd = oDate.getDate();
        var mm = oDate.getMonth() + 1; //remember that month is 0 to 11  
        var yyyy = oDate.getFullYear();
        
        if(dd < 10){dd = '0' + dd;}  // prepend '0' for single digit date
        
        if(mm < 10){mm = '0' + mm;}  // prepend '0' for single digit month
        
        this.sDateVal = yyyy+'-'+mm+'-'+dd; //set next business date to js class property
        
    }
 
    /*function to check each date in holiday list*/
    isHoliday(currentDate){
        var hasHoliday = false;
        for ( var i = 0; i < lstHoliday.length; i++) {
            if (this.compare(currentDate, lstHoliday[i])) { //If days are not holidays
                hasHoliday = true;
                break;
            }
        }
        return hasHoliday;
    }
 
   /*genric function to compare 2 dates*/ 
    compare(dCurrentDate, dHolidayDate){    
        var isEqual = false;
        if(dCurrentDate.getDate() == dHolidayDate.getDate() && dCurrentDate.getMonth() == dHolidayDate.getMonth() && dCurrentDate.getFullYear() == dHolidayDate.getFullYear()) {
            isEqual = true;
        }
        return isEqual;
    }  
 
}