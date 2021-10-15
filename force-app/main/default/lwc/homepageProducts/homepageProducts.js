import { LightningElement,api, wire, track } from 'lwc';
import searchProducts from '@salesforce/apex/ProductsController.searchProducts';
import getAllProducts from '@salesforce/apex/ProductsController.getAllProducts';
import { refreshApex } from '@salesforce/apex';

export default class HomepageProducts extends LightningElement {
        @track sorted
        @api
        changeSorted(strString) {
             this.sorted = strString;
             let newAwway = Object.assign([], this.products);
             if(this.sorted == "namesorted"){
                 newAwway = newAwway.sort((a, b) => a.Name.localeCompare(b.Name))
             }else{
                 newAwway = newAwway.sort((a, b) => parseFloat(a.Price__c) - parseFloat(b.Price__c));
                 
             }
             this.products = newAwway
        }
        @api searchTerm = '';
        @track products;
        @api tile;

        @wire(searchProducts, {searchTerm: '$searchTerm'})
        loadProducts({ error, data }) {
            
            if(data){
                this.products = data;
                 let newAwway = Object.assign([], this.products);
                if(this.sorted == "namesorted"){
                    newAwway = newAwway.sort((a, b) => a.Name.localeCompare(b.Name))
                }else{
                    newAwway = newAwway.sort((a, b) => parseFloat(a.Price__c) - parseFloat(b.Price__c));
                    
                }
                this.products = newAwway
            }
        }



        


}