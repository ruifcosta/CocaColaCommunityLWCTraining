import { LightningElement,api } from 'lwc';
import updateCartItem from '@salesforce/apex/CartItemController.updateCartItem';
import communityURL from '@salesforce/community/basePath';
import deleteCartItem from '@salesforce/apex/CartItemController.deleteCartItem';

export default class OrderItems extends LightningElement {
    @api showid
    @api item;

    get backgroundStyle() { 
        return `background-image: url(${communityURL}/sfsites/c${this.item.Product__r.Picture__c})` ;
    }
}