public with sharing class simpleController
{
 @AuraEnabled
 public static String serverEcho (String firstName) 
 {
  return('Hello from the server'+ firstName); 
 }
}