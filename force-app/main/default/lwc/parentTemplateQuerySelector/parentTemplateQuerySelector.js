import { LightningElement } from 'lwc';

export default class ParentTemplateQuerySelector extends LightningElement {
 
imgsrc="https://www.vhv.rs/dpng/d/2-27579_transparent-transparent-background-light-bulb-hd-png-download.png";

handlePhraseChange(event){
    this.template.querySelector('c-child').changeUpperCase(event.target.value);
}
}