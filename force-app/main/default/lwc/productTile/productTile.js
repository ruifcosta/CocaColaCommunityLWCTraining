import { LightningElement,api, wire } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CART_OBJECT from '@salesforce/schema/Cart__c';
import templateTile from './templateTile.html'
import templateList from './templateList.html'
import communityURL from '@salesforce/community/basePath';
import getCartItem from '@salesforce/apex/CartItemController.getCartItem';
import updateCartItem from '@salesforce/apex/CartItemController.updateCartItem';
import CARTITEM_OBJECT from '@salesforce/schema/Cart_Item__c';
import {getCookie, setCookie} from 'c/cookieHandler'
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class ProductTile extends NavigationMixin(LightningElement) {
   
    @api product
    @api tile
    cartId;

    render() {
        return this.tile ? templateTile : templateList;
    }

    get backgroundStyle() { 
        return `background-image: url(${communityURL}/sfsites/c${this.product.Picture__c})` ;
    }

    addCart(event){
        const productId = event.target.value;
        const cookie = getCookie("cartid");
        if(cookie == ""){
            this.cartId = null;
        }else{
            this.cartId = cookie;
        }
        if(!this.cartId){
        // we have to create an object of fields to enter data

        const fields = {
            
        };
    
        // It's the final object to send CreateRecord method to create
        const recordInput = { apiName: CART_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(cart => {
                console.log(cart.id)
                this.cartId = cart.id;
                setCookie("cartid",cart.id);
            })
            .catch(error => {
                console.log(error)
            })
        }


    getCartItem({cartOrder: this.cartId, productId: productId})
    .then((result) =>{
        console.log(result)
        if(result){
            this.increaseCartItemQuantity(result);

        }else {
            console.log("else")
            this.createCartItem(productId);
            
        }
        const refreshEvent = new CustomEvent('refresh',{ bubbles: true, composed: true });

        // Dispatches the event.
        this.dispatchEvent(refreshEvent);

    }).catch(error=>{
        console.log(error);
    })

        // Calling createRecord method of uiRecordApi
        // createRecord(recordInput)
        //     .then(cart =>{

        //         this.dispatchEvent(
        //             new ShowToastEvent({
        //                 title: 'Success',
        //                 message: 'New Order has been created',
        //                 variant: 'success',
        //             }),
        //         );
        //     })
        //     .catch(error => {
        //         this.dispatchEvent(
        //             new ShowToastEvent({
        //                 title: 'Error while creating Order',
        //                 message: error.body.message,
        //                 variant: 'error',
        //             }),
        //         );
        //     });
    
    }

    redirectToDetails(event){

        // const productLink = communityURL + '/product/ ' + event.target.value;
       // window.location.href= productLink
        const recordId = event.target.value;
       this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
                      recordId: recordId,
                      objectApiName: "Product2",
                      actionName: "view"
        },
        state: {
            filterName: 'Default'
        }
    }); 
    }

    increaseCartItemQuantity(updatedCartItem){
        console.log(updateCartItem)
        const copy = Object.assign({}, updatedCartItem);
        copy.Quantity__c = updatedCartItem.Quantity__c + 1;

        
        updateCartItem({data: copy})
        .then(result=> {
            this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Item added',
                                variant: 'success',
                            }),
                        );
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    createCartItem(productId){
            const fields = {
                Cart__c: this.cartId,
                Product__c: productId,
                Quantity__c: 1
            };
            const recordInput = { apiName: CARTITEM_OBJECT.objectApiName, fields };

            createRecord(recordInput)
                .then(cartItem => {
                    this.dispatchEvent(
                                    new ShowToastEvent({
                                        title: 'Success',
                                        message: 'Item added To Cart!',
                                        variant: 'success',
                                    }),
                                );
                })
                .catch(error => {
                    console.log(error)
                })
    }

}