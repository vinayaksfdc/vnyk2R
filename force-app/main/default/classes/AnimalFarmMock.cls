@isTest
global class AnimalFarmMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest request){
        HttpResponse	response=new HttpResponse() ;
        response.setHeader('Content-Type','application/json');
        response.setBody('{"animals":["majestic badger","fluffy bunny","scary bear","chicken"]}');
         response.setStatusCode(200);
        return response;
        
    }
}