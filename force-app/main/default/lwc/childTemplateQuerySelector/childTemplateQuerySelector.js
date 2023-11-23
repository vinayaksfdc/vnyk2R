import { LightningElement } from 'lwc';

export default class ChildTemplateQuerySelector extends LightningElement {
    coloring;
handleColorAll() {
    this.template.querySelector('c-child').changeColorAll();
    
  }
}