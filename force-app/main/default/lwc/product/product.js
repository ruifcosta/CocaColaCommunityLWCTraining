import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import communityURL from '@salesforce/community/basePath';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import PRICE_FIELD from '@salesforce/schema/Product2.Price__c';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';
import PICTURE_FIELD from '@salesforce/schema/Product2.Picture__c';
const fields = [NAME_FIELD, PRICE_FIELD,DESCRIPTION_FIELD,FAMILY_FIELD,PICTURE_FIELD];
export default class Product extends LightningElement {
    @api recordId;
    @track product;

    @wire(getRecord, { recordId: "$recordId", fields: fields})
    wiredRecord({ error, data }) {
        if (data) {
            console.log(data)
            this.product = data;
        }
    }

    get backgroundStyle() { 
    console.log(communityURL)
        return `background-image: url(${communityURL}/sfsites/c${this.picture})` ;
    }




    get name() {
        return getFieldValue(this.product, NAME_FIELD);
      }
      get price() {
        return getFieldValue(this.product, PRICE_FIELD);
      }
      get description() {
        return getFieldValue(this.product, DESCRIPTION_FIELD);
      }
      get family() {
        return getFieldValue(this.product, FAMILY_FIELD);
      }
      get picture() {
        return getFieldValue(this.product, PICTURE_FIELD);
      }
}