public with sharing class zomatoClass {
    //Used to get entityId and entityType
   @AuraEnabled
   public static String getLocation(String locationName) {   
      //Get the base url of Zomato API from custom label        
      List<ZomatoLocation.Location_suggestions> locationList = new List<ZomatoLocation.Location_suggestions>(); 
      String url = System.Label.zomato_Api_url;
              url += +'locations';
      //Get the API key of Zomato from custom label
       String Key = System.Label.zomato_Api_Key;
        system.debug(Key);
       String response;
       // Instantiate a new http object
       Http h = new Http();
       url += '?query='+locationName;
       // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
       HttpRequest req = new HttpRequest();
       req.setEndpoint(url);
       req.setHeader('Content-Type', 'application/json');
       req.setHeader('user-key', Key);
       req.setMethod('GET');
        
       // Send the request, and return a response
       HttpResponse res = h.send(req);
       response = res.getBody();
       if(res.getStatusCode() == 200 && res.getBody() != null){
        ZomatoLocation.Location_suggestions locationClass = new ZomatoLocation.Location_suggestions();
        ZomatoLocation jsonApex = ZomatoLocation.parse(response);
        system.debug('jsonApex::::::'+jsonApex.location_suggestions);
            
        for(ZomatoLocation.Location_suggestions loc : jsonApex.location_suggestions){
            System.debug('location details'+loc);
            string city=loc.city_name;
            system.debug('city Name'+city);
             locationList.add(loc);
            
            //System.debug('Categories:' + category.Categories.id+':'+category.Categories.name);
        }
        system.debug('locationList'+locationList);
          
    }
    system.debug('locationList222'+locationList);
    String locationString = System.JSON.serialize(locationList);
     system.debug('Location City'+locationString);
        system.debug('Location City'+locationString); 
    return locationString;
    
}
// https://developers.zomato.com/api/v2.1/search?q=Hyderabad&count=2

// https://developers.zomato.com/api/v2.1/search?q=Hyderabad?count=2
    @AuraEnabled
    public static void getRestaurant() {   
    //Get the base url of Zomato API from custom label        
    
    List<zomatoSearch.restaurants> restaurantList = new List<zomatoSearch.restaurants>(); 
        
    String url = System.Label.zomato_Api_url;
            url += +'search';
    //Get the API key of Zomato from custom label
        String Key = System.Label.zomato_Api_Key;
        String response;
        // Instantiate a new http object
        Http h = new Http();
        url += '?q='+'Hyderabad';
        url += '?count='+'2';
        system.debug('url'+url);

        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('user-key', Key);
        req.setMethod('GET');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        response = res.getBody();
        if(res.getStatusCode() == 200 && res.getBody() != null){
            zomatoSearch.restaurants restaurantClass = new zomatoSearch.restaurants();
            zomatoSearch jsonApex = zomatoSearch.parse(response);
            system.debug('jsonApex::::::'+jsonApex.restaurants);
                
            for(zomatoSearch.restaurants loc : jsonApex.restaurants){
                System.debug('restaurant details'+loc);
                restaurantList.add(loc);
                
                //System.debug('Categories:' + category.Categories.id+':'+category.Categories.name);
            }
            system.debug('restaurantList'+restaurantList);
        }
        system.debug('locationList222'+restaurantList);
        
        
        
    }
}