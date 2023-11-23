public with sharing class shirtController {
   static Integer PAGE_SIZE = 9;

    public class Filters {
        @AuraEnabled
        public String searchKey { get; set; }
        @AuraEnabled
        public Decimal maxPrice { get; set; }
        @AuraEnabled
        public String[] brands { get; set; }
        @AuraEnabled
        public String[] materials { get; set; }
        @AuraEnabled
        public String[] types { get; set; }
         
    }

    @AuraEnabled(Cacheable=true)
    public static PagedResult getProducts(Filters filters, Integer pageNumber,String recordTypeId) {
        system.debug('recordTypeId');
        system.debug('filters'+filters);
        String key, whereClause = '';
        Decimal maxPrice;
        String[] brands, materials, types, criteria = new List<String>{};
        if (filters != null) {
            maxPrice = filters.maxPrice;
            materials = filters.materials;
            types = filters.types;
            if (!String.isEmpty(filters.searchKey)) {
                key = '%' + filters.searchKey + '%';
                criteria.add('Name LIKE :key');
            }
            if (filters.maxPrice >= 0) {
                maxPrice = filters.maxPrice;
                criteria.add('Price__c <= :maxPrice');
            }
            if (filters.brands != null) {
                brands = filters.brands;
                criteria.add('brand__c IN :brands');
            }
            if (filters.types != null) {
                types = filters.types;
                criteria.add('Type__c IN :types');
            }
            if (filters.materials != null) {
                materials = filters.materials;
                criteria.add('Material__c IN :materials');
            }
            if (criteria.size() > 0) {
                whereClause = 'WHERE ' + String.join(criteria, ' AND ');

                //RecordType='0122v000001vKBgAAM'
            }
            whereClause = 'WHERE RecordTypeid='+'\'0122v000001vKAOAA2\'';
            system.debug('whereClause'+whereClause);
        }
        else {
           whereClause = 'WHERE RecordTypeid='+'\'0122v000001vKAOAA2\'';
        }
        Integer pageSize = shirtController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;
        PagedResult result = new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = Database.countQuery(
            'SELECT count() FROM Product__c ' + whereClause
        );
        system.debug('SELECT count() FROM Product__c ' + whereClause);
        
         system.debug('SELECT Id, Name, Price__c, Description__c, Color__c, Brand__c, Picture_URL__c,Size__c, Material__c FROM Product__c ' +
            whereClause +
            ' ORDER BY Name LIMIT :pageSize OFFSET :offset');
        result.records = Database.query(
            'SELECT Id, Name, Price__c, Description__c, Color__c, Brand__c, Picture_URL__c,Size__c, Material__c FROM Product__c ' +
            whereClause +
            ' ORDER BY Name LIMIT :pageSize OFFSET :offset' 
        );
       
        System.debug(result.records);
        return result;
    }

    @AuraEnabled(Cacheable=true)
    public static Product__c[] getSimilarProducts(Id productId, Id familyId) {
        return [
            SELECT
                Id,
                Name,
                Price__c,
                Description__c,
                Category__c,
                Type__c,
                Picture_URL__c,
                Material__c
            FROM Product__c
            WHERE Product_Family__c = :familyId AND Id != :productId
        ];
    }

      @AuraEnabled(Cacheable=true)
    public static Order_Item__c[] getOrderItems(Id orderId) {
        return [
            SELECT
                Id,
                Qty_S__c,
                Qty_M__c,
                Qty_L__c,
                Price__c,
                Product__r.Name,
                Product__r.Price__c,
                Product__r.Picture_URL__c
            FROM Order_Item__c
            WHERE Order__c = :orderId
            WITH SECURITY_ENFORCED
        ];
    }
}