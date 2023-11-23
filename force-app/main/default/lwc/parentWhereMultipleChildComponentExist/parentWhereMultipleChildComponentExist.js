import { LightningElement } from "lwc";

export default class ParentWhereMultipleChildComponentExist extends LightningElement {
  handleClick() {
    this.template
      .querySelectorAll("c-reusable-child-component")
      .forEach(element => {
        element.checkValidity();
      });
  }
}