public with sharing class CartItemController {

    @AuraEnabled(cacheable=true)
    public static Cart_Item__c[] getAllCartItems(String cartOrder) {

        Cart_Item__c[] cartitem = [
            SELECT
            Id, Cart__c, Product__r.Name,Product__r.Picture__c, Product__r.Price__c, Quantity__c, Cart_Item_Total__c 
            FROM Cart_Item__c
            where Cart__c = :cartOrder
            ORDER BY Id
        ];
        if(cartitem.size() > 0){
            return cartitem;
        }

        return null;
    }

    @AuraEnabled(cacheable=false)
    public static Cart_Item__c getCartItem(String cartOrder, String productId) {
        Cart_Item__c[] cartitem = [
            SELECT
                Id,
                Product__c,
                Cart_Item_Total__c,
                Quantity__c
            FROM Cart_Item__c
            where Cart__c = :cartOrder
            and Product__c = :productId
            ORDER BY Id
        ];

        if(cartitem.size() > 0){
            return cartitem[0];
        }

        return null;
    }
    @AuraEnabled
    public static String updateCartItem(Cart_Item__c data){
        
        update data;
        return 'Success: Cart Item updated successfully';
    }

    @AuraEnabled(cacheable=true)
    public static Cart__c getCart(String cartOrder) {
        Cart__c[] cartitem = [
            SELECT
                Id,
                Cart_Total__c
            FROM Cart__c
            Where Id = :cartOrder
            ORDER BY Id
        ];
        if(cartitem.size() > 0){
            return cartitem[0];
        }

        return null;
    }
    @AuraEnabled
    public static void deleteCartItem(Cart_Item__c data){
        
        try {
            delete data;
        } catch (DmlException e) {
            // Process exception here
        }
    }

    @AuraEnabled
    public static void deleteAllCartItem(String cartOrder){
        Cart_Item__c[] cartitem = [
            SELECT
                Id,
                Product__c,
                Cart_Item_Total__c,
                Quantity__c
            FROM Cart_Item__c
            where Cart__c = :cartOrder
            ORDER BY Id
        ];
        try {
            delete cartitem;
        } catch (DmlException e) {
            // Process exception here
        }
    }

}
