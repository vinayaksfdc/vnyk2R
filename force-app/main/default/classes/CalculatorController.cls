public with sharing class CalculatorController {
    public CalculatorController() {

    }
    @AuraEnabled(cacheable=true)
    public static Integer calculate2Numbers(integer firstNumber,integer secondNumber){
     
        return (firstNumber+secondNumber);
    }
}