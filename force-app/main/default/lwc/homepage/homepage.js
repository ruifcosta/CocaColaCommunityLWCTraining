import { LightningElement,api, wire, track } from 'lwc';
import getAllCartItems from '@salesforce/apex/CartItemController.getAllCartItems';
import getCart from '@salesforce/apex/CartItemController.getCart';
import deleteAllCartItem from '@salesforce/apex/CartItemController.deleteAllCartItem';
import {getCookie, setCookie} from 'c/cookieHandler'
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Homepage extends LightningElement {

    @api showid = false
    @api tile;
    searchTerm = '';
    @track cartId = getCookie("cartid")?getCookie("cartid"):"";
    @api orders;

    wiredOrders;
    @wire(getAllCartItems,{cartOrder: '$cartId' })
    loadOrders(result) {
        console.log("enter")
        this.wiredOrders = result;
        if(result.data){
            this.orders = result.data;
        }else{
            this.orders = null
        };
    }

    handleSort(event){
        console.log(order)
        this.sorted = event.detail;
        this.template.querySelector('c-homepage-products').changeSorted(event.detail);
    }

    handleSearchTerm(event){
        this.searchTerm = event.detail
    }

    refresh(event){
        console.log("refreshEvent");
        console.log(this.cartId)
        const cartId = this.cartId

        window.clearTimeout(this.delayTimeout3);
        this.delayTimeout3 = setTimeout(() => {
            refreshApex(this.wiredOrders)
		}, 300);



    }
 
}