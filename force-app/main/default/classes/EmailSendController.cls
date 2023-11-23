public class EmailSendController {
    @AuraEnabled 
       public static void sendMailMethod(String mMail ,String mSubject ,String mbody){
       system.debug('mMail'+mMail);



        List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
     
        // Step 1: Create a new Email
          Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
       
       // Step 2: Set list of people who should get the email
          List<String> sendTo = new List<String>();
          // splitting the string to list of emails
          sendTo=mMail.split(',');
         // sendTo.add(mMail);

          mail.setToAddresses(sendTo);
       
       // Step 3: Set who the email is sent from
          mail.setReplyTo('noreply@gmail.com'); // change it with your mail address.
          mail.setSenderDisplayName('salesforce User'); 
       
       // Step 4. Set email contents - you can use variables!
         mail.setSubject(mSubject);
         mail.setHtmlBody(mbody);
       
       // Step 5. Add your email to the master list
         mails.add(mail);
       
     // Step 6: Send all emails in the master list
        Messaging.sendEmail(mails);
      }   

      @AuraEnabled 
      public static void sendMailMethodhello(String mMail){
      system.debug('mMail'+mMail);
          
          sendMailMethod(mMail,'test','mbody');
      }   
   }