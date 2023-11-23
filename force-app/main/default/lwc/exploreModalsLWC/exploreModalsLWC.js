import { LightningElement, api } from "lwc";

export default class ExploreModalsLWC extends LightningElement {
  @api recordId;

  handlePopup() {
    this.template.querySelector("section").classList.remove("slds-hide");
    this.template
      .querySelector("div.modalBackdrops")
      .classList.remove("slds-hide");
  }

  handleSkip() {
    this.template.querySelector("section").classList.add("slds-hide");
    this.template
      .querySelector("div.modalBackdrops")
      .classList.add("slds-hide");
  }
}