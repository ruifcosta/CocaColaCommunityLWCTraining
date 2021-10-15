import { LightningElement,api, wire, track } from 'lwc';
import getAllCartItems from '@salesforce/apex/CartItemController.getAllCartItems';
import {getCookie, setCookie} from 'c/cookieHandler'

export default class ProductDetail extends LightningElement {


    @track cartId = getCookie("cartid")?getCookie("cartid"):"";
    @api orders;
    @api recordId;
    wiredOrders;
    @wire(getAllCartItems,{cartOrder: '$cartId' })
    loadOrders(result) {
        this.wiredOrders = result;
        if(result.data){
            this.orders = result.data;
        };
    }
}