public with sharing class exploreActionFunctionController {
   
    public string greeting{set;get;}
    public void methodOne(){
        system.debug('greeting---->>>>'+greeting);
    }
}