import { LightningElement, track, wire } from "lwc";
import getAccounts from "@salesforce/apex/LazyLoadingController.getAccounts";

const columns = [
  { label: "Id", fieldName: "Id", type: "text" },
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Rating", fieldName: "Rating", type: "text" }
];

export default class LazyLoadingLWCDemoImperativeMethod extends LightningElement {
  accounts = [];
  error;
  columns = columns;
  rowLimit = 10;
  rowOffSet = 0;
  knowNewOwner = "0052v00000geHSSAA2";
  @track selectedAccountId;

  loadData() {
    return getAccounts({ limitSize: this.rowLimit, offset: this.rowOffSet })
      .then((result) => {
        let updatedRecords = [...this.accounts, ...result];
        this.accounts = updatedRecords;
        console.log(
          "JSON.stringify(this.accounts)" + JSON.stringify(this.accounts)
        );
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.accounts = undefined;
      });
  }

  loadMoreData(event) {
    console.log("loadMoreData---------------------------executing");
    const currentRecord = this.accounts;
    const { target } = event;
    target.isLoading = true;

    this.rowOffSet = this.rowOffSet + this.rowLimit;
    console.log("this.rowOffSet---------------------------this.rowOffSet");
    this.loadData();
  }

  constructor() {
    super();
    this.template.addEventListener(
      "valuechange",
      this.handleCustomEvent.bind(this)
    );
  }

  handleCustomEvent1(event) {
    console.log(
      "-handleCustomEvent---------------------------------" +
        JSON.stringify(event.detail)
    );
    const selectedOwner = event.detail;
    console.log(selectedOwner.value);
    if (this.openmodel == false) {
      console.log("if executed");
      this.knowOwner = selectedOwner.value;
      console.log("108....................................." + this.openmodel);
      console.log(
        "knowOwner....................................." + this.knowOwner
      );
      this.loadData();
      console.log("executed load data line 177");
    } else {
      console.log("else   executed");
      this.knownewOwner = selectedOwner.value;

      checkPermission({ knownewOwner: this.knownewOwner })

      .then(result => {
      this.hasPermission = result;
      console.log(JSON.stringify('result from haspermission ----------'+result));
      /* if(typeof(result) === "boolean") {
      //  alert("Boolean");
     } else {
    // alert("Not a Boolean");
     } */
     
        console.log('hi::'+result);
         this.error = undefined;
    })
    .catch(error => {
        this.hasPermission = undefined;
        //this.error = error;
    });
      console.log("....................................." + this.openmodel);
      console.log("....................................." + this.knownewOwner);
    }
  }
 

  handleCustomEvent(event) {
    console.log(event.detail);
    this.selectedAccountId = event.detail;
    if(this.selectedAccountId === undefined) { 
      console.log('this.selectedAccountId is undefined'); 
      
   }
    this.loadData();
  }
}