import { LightningElement,track } from 'lwc';

export default class NavigationLinkExample extends LightningElement {
    @track url;
connectedCallback() {
    this[NavigationMixin.GenerateUrl]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Account',
            actionName: 'home'
        }
    }).then((url) => (this.url = url));
} 
}