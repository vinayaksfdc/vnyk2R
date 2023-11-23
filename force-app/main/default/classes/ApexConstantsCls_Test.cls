@istest  class ApexConstantsCls_Test {
        public static final INTEGER val4=ApexConstantsCls.DEFAULT_SIZE; 
        public static final STRING val5= ApexConstantsCls.INITIAL_SUBMIT;
        public static final STRING val6 = ApexConstantsCls.ERROR_MESSAGE;
    
     static TestMethod void Product2Extension_UnitTest1(){
        Test.startTest();
	Integer val = val4 ; 
	String val2 = val5; 
	String val4 = val6; 
	
        System.assertEquals(val2,'Draft');
         	  system.assertEquals(ApexConstantsCls.RELATIONSHIP_PS,'Product and Services');
            system.assertEquals(ApexConstantsCls.RELATIONSHIP_S,'Services');
            system.assertEquals(ApexConstantsCls.TYPE_OTHER,'Other Services');
            system.assertEquals(ApexConstantsCls.STATUS_ACTIVE,'Active');
            system.assertEquals(ApexConstantsCls.STATUS_INACTIVE,'Inactive');
            system.assertEquals(ApexConstantsCls.PAGE_BANNER_NEWS,'Page Banner News');
            system.assertEquals(ApexConstantsCls.TOP_BANNER_NEWS,'Top Banner News');
            system.assertEquals(ApexConstantsCls.DEFAULT_VALUE,'Default');
            system.assertEquals(ApexConstantsCls.APPROVER_VALUE,'Approver');
            system.assertEquals(ApexConstantsCls.YES_VALUE,'Yes');
            system.assertEquals(ApexConstantsCls.COUNTRY_GLOBAL,'Global');
            system.assertEquals(ApexConstantsCls.PRODUCT_CONTENT_NCT,'NCT');
            system.assertEquals(ApexConstantsCls.PRODUCT_ACCESS_MDT_HELP_DESK,'Help Desk');
            system.assertEquals(ApexConstantsCls.STATUS_PENDING,'Pending Approval');
            system.assertEquals(ApexConstantsCls.STATUS_APPROVED,'Approved');
            system.assertEquals(ApexConstantsCls.STATUS_REJECTED,'Rejected');
            system.assertEquals(ApexConstantsCls.STATUS_CLOSED,'Closed');
            system.assertEquals(ApexConstantsCls.TYPE_CDB,'CDB');
            system.assertEquals(ApexConstantsCls.TYPE_CARES,'CARES');
            system.assertEquals(ApexConstantsCls.PIC_VALUE,'PIC');
            system.assertEquals(ApexConstantsCls.HD_VALUE,'Help Desk');
            system.assertEquals(ApexConstantsCls.NCT_VALUE,'NCT');
            system.assertEquals(ApexConstantsCls.NCP_chACCESS_TYPE,'CH');
            system.assertEquals(ApexConstantsCls.NCP_chhwsACCESS_TYPE,'CHHWS');
            system.assertEquals(ApexConstantsCls.MANAGE_SUPPORT,'ManageSupport');
            system.assertEquals(ApexConstantsCls.SUCCESS_VALUE,'Success');
            system.assertEquals(ApexConstantsCls.BUSINESS_HOUR_NCP,'Support Portal');
            system.assertEquals(ApexConstantsCls.PARTNER_PORTAL_ACCESS_TYPE,'Partner Portal');
            system.assertEquals(ApexConstantsCls.USER_NCP_RELATIONS_PARTNER,'Partner');
            system.assertEquals(ApexConstantsCls.SUPPLIER_PORTAL_ACCESS_TYPE,'Supply Chain Portal');
            system.assertEquals(ApexConstantsCls.USER_NCP_RELATIONS_SUPPLIER,'Supplier');
            system.assertEquals(ApexConstantsCls.SERVICE_CONTRACT_RT_DEVNAME_PARENT,'NCP_Parent_Service_Contract');
            system.assertEquals(ApexConstantsCls.SERVICE_CONTRACT_RT_DEVNAME_CHILD,'NCP_Child_Service_Contract');
            system.assertEquals(ApexConstantsCls.SERVICE_CONTRACT_RT_DEVNAME_OTHER,'Other_Services_Child_Service_Contract');
            system.assertEquals(ApexConstantsCls.CASE_RT_DEVNAME_ENTITLEMENT,'NCP_Upgrade_Customer_Entitlements');
            system.assertEquals(ApexConstantsCls.CASE_SUBJECT,'Upgrade Services Request');
            system.assertEquals(ApexConstantsCls.CASE_PRIORITY,'Medium');
            system.assertEquals(ApexConstantsCls.EMAIL_TEMPLATE_TEAM,'NCP_Case_creation_for_Case_team');
            system.assertEquals(ApexConstantsCls.EMAIL_TEMPLATE_KEYUSER,'NCP_Case_creation_for_KeyUser');
            system.assertEquals(ApexConstantsCls.EMAIL_TEMPLATE_INTERNAL,'NCP_Internal_Case_creation');
            system.assertEquals(ApexConstantsCls.EMAIL_TEMPLATE_SW_INTEGRATOR_EMAIL,'NCP_SW_IntegratorEmail');
            system.assertEquals(ApexConstantsCls.PROFILE_LOGIN_CUSTOMERS,'Customers Login');
            system.assertEquals(ApexConstantsCls.PROFILE_CUSTOMERS,'Customers');
            system.assertEquals(ApexConstantsCls.PROFILE_CUSTOMER_COMMUNITY_PLUS,'Customer Community Plus User');
            system.assertEquals(ApexConstantsCls.PROFILE_LOGIN_CUSTOMER_COMMUNITY_PLUS,'Customer Community Plus Login User');
            system.assertEquals(ApexConstantsCls.BUSINESS_PARTNER_ROLE,'SW Integrator');
            system.assertEquals(ApexConstantsCls.ACCOUNT_RT_DEVNAME_CUSTOMER,'Customer');
            system.assertEquals(ApexConstantsCls.ACCOUNT_RT_DEVNAME_LEGALENTITY,'Legal_Entity');
            system.assertEquals(ApexConstantsCls.FAVORITE_PRODUCTS_LIST_VIEW,'Favorite Products');
            system.assertEquals(ApexConstantsCls.MY_ENTITLED_LIST_VIEW,'My Entitled Products');
            system.assertEquals(ApexConstantsCls.ALL_SERVICES_LIST_VIEW,'All Services Products');
            system.assertEquals(ApexConstantsCls.RAW_CAUSE_OWNER,'Owner');
            system.assertEquals(ApexConstantsCls.RAW_CAUSE_MANUAL,'Manual');
            system.assertEquals(ApexConstantsCls.ACCESS_LEVEL_READ,'Read');
        test.stopTest();
    }
}