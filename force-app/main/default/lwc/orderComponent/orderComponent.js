import { LightningElement,api, wire, track } from 'lwc';
import getAllCartItems from '@salesforce/apex/CartItemController.getAllCartItems';
import getCart from '@salesforce/apex/CartItemController.getCart';
import deleteAllCartItem from '@salesforce/apex/CartItemController.deleteAllCartItem';
import {getCookie, setCookie} from 'c/cookieHandler'
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class OrderComponent extends LightningElement {

    @api showid = false
    @api orders
    deleted = false
    @api cartTotal = "0";
    @track cartId = getCookie("cartid")?getCookie("cartid"):"";
    wiredCartTotal
    wiredOrders;
    @wire(getAllCartItems,{cartOrder: '$cartId' })
    loadOrders(result) {
        this.wiredOrders = result;
        console.log(result);
        if(result.data){
            this.orders = result.data;
            refreshApex(this.wiredCartTotal)
        }else{
            this.orders = null
        };
    }


    @wire(getCart,{cartOrder: '$cartId' })
    loadCart(result) {
        this.wiredCartTotal= result
        console.log("cart total");
        console.log(result)
        if(result.data){
            this.cartTotal = result.data.Cart_Total__c;
        }
        if(this.deleted){
            // do something
            this.deleted = false
        }
    }

    deleteItems(){
        const cartId = this.cartId;
        deleteAllCartItem({cartOrder: this.cartId })
        .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'All Cart Items Deleted',
                        variant: 'success',
                    }),
                )
                    this.deleted = true;    
                    refreshApex(this.wiredOrders)
       
                   
    })
        .catch((error) => {
            console.log(error)
        });
    }
}