public with sharing class ProductsController {

        @AuraEnabled(Cacheable=true)
        public static Product2[] getAllProducts() {
            return [
                SELECT
                    Id,
                    Name,
                    Price__c,
                    Picture__c,
                    Family
                FROM Product2
                ORDER BY Name
            ];
        }
        @AuraEnabled(Cacheable=true)
        public static Product2[] searchProducts(String searchTerm) {
            // Return all products when no search term
            searchTerm = searchTerm.trim();
            if (searchTerm == '') {
                return getAllProducts();
            }
            // Prepare query paramters
            searchTerm = '%' + searchTerm + '%';
            // Execute search query
            return [
                SELECT
                    Id,
                    Name,
                    Price__c,
                    Picture__c,
                    Family
                FROM Product2
                WHERE Name LIKE :searchTerm
                ORDER BY Name
                LIMIT 50
            ];
        }
}