public with sharing class actionFunctionExample {
    public string message {get; set;}
    
    public string nextActionName {get; set;}

    public void actionForButton() {
        message = 'Default Message';
    }
    
    public void messageForEvenOrOdd() {
        if (Math.mod(System.Today().Day(), 2) == 0)
        	message = 'Good Day. Today\' day is Even';
        else 
        	message = 'Good Day. Today\' day is Odd';    
    }
}