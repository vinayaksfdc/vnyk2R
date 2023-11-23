/**
 * @File Name          : dataView.js
 * @Description        : Provides data layer automation on top of standard lightning datatable. Can also be used to render data (array of records) in cards.
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Sasank Subrahmanyam V
 * @Last Modified On   : 2/20/2020, 4:22:55 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0      4/4/2019, 12:22:18 PM   Sasank Subrahmanyam V         v1
 * 1.1      18-Oct-2019             Sasank Subrahmanyam V         Fixed the sorting issue by passing the clone of records using spread operator [...recordsListResult]
 * 1.2      19-Oct-2019             Sasank Subrahmanyam V         Fix for Selection of records was affected when implemented c-data-table.
 * 1.3      03-Dec-2019             Sasank Subrahmanyam V         Optimised code by replacing map with forEach
 * 2.0      06-Jan-2019             Sasank Subrahmanyam V         Removing custom table methods and properties
 * 2.1      16-Jan-2020             Sasank Subrahmanyam V         Implemented column filters
 * 2.2      06-Feb-2020             Sasank Subrahmanyam V         Process all rows to flatten the data instead of just for each page and bug fix for flattening data when server call vs data injection
 * 2.3      14-Feb-2020             Sasank Subrahmanyam V         1. showConsoleLogs - show console logs only when enabled. 
 *                                                                2. persistentColumnWidths - LAT Preview - persists column widths per user per client machine
 *                                                                3. recordsListInAllPages and startFromIndex are tracked to support multiple objects. When table rows or cards list per page are injected, pagination should reflect appropriately
 *                                                                4. Tabs are filters should be processed in processConfig (and whenever it dynamically changes)
 *                                                                5. Defaults for minColumnWidth, maxColumnWidth, resizeStep and loadMoreOffset are changed as per console warnings because of datatype conflicts
 *                                                                6. dtableConfig fields are processed even for cards view to get fieldApi's and query
 **/
//#region ***************** IMPORTS *****************************************/
import { LightningElement, api, track } from 'lwc';
import { isNotBlank, getFieldValueFromObject } from 'c/utils';
import getSObjectsMap from '@salesforce/apex/LCC_DataViewMainController.getSObjectsMap';
//#endregion

/**
 * Provides data layer automation on top of standard lightning datatable. Can also be used to render data (array of records) in cards.
 **/
export default class DataView extends LightningElement {

    //#region ***************** EXTERNAL DATA ATTRIBUTES ********************/
    // EXTERNAL DATA ATTRIBUTES USED IN LIGHTNING RECORD PAGES OR LIGHTNING COMPONENT

    /**
     * STRING 
     * When dataview is loaded in record context, recordId is populated. Then, parentFilterField can be used to specify to which field recordId is assigned 
     */
    @api
    parentFilterField;

    /**
     * OBJECT 
     * Provide all the needed attributes of standard lightning:datatable
     */
    @api dtableConfig = {};

    /**
     * STRING 
     * Icon to be rendered in header adjacent to title
     */
    @api iconName;

    /**
     * STRING 
     * Name of the object from which sObjects are to be retrieved.
     */
    @api childObjectName;

    /**
     * STRING 
     * Used in SOQL query, added for ORDER BY
     */
    @api orderBy;

    /**
     * BOOLEAN 
     * Used in SOQL query, added for ASC
     */
    @api sortAscending;

    /**
     * STRING 
     * Used in SOQL query, added for LIMIT
     */
    @api limit;

    /**
     * STRING 
     * Valid values are Datatable and Cards. Default is Datatable.
     */
    @api viewType = "Datatable";

    /**
     * STRING 
     * Array of filters needed below title through dropdown
     */
    @api predefinedFiltersList;

    /**
     * STRING 
     * Array of filters needed as tabs between header and table
     */
    @api predefinedTabsList;

    /**
     * STRING 
     * Valid values are SOQL and SOSL. Default is SOQL.
     */
    @api queryType = "SOQL";

    /**
     * STRING 
     * Directly added as a style around the table. Example: height: 20rem;
     */
    @api tableContainerStyle;

    /**
     * STRING
     * Adds style to column filters. Needed especially when there is numbered or selectable checkboxes in datatable
     */
    @api columnFiltersStyle;

    // OPTIONS

    /**
     * BOOLEAN 
     * If true, sObjects are fetched from server during init of component. This will be false for data injection.
     */
    @api getRecordsMapOnInit;

    /**
     * BOOLEAN 
     * If true, records are refetched when config is modified. This is useful during data injection in which case this should be false.
     */
    @api getRecordsOnConfigChange;

    /**
     * BOOLEAN 
     * If true, data of sObjects is fetched from server. If false, data injection is needed through attribute - rowsData or wiredTo
     */
    @api getRecordsFromServer;

    /**
     * BOOLEAN 
     * If true, caches and maintains local data copy for given filters (search, tabs, filters etc.)
     */
    @api createDataStore;

    /**
     * BOOLEAN 
     * If true, header is rendered, else unrendered
     */
    @api showHeader;

    /**
     * @usage PILOT
     * 
     * BOOLEAN 
     * If true, infinite scrolling is enabled instead of pagination
     */
    @api enableInfiniteScrolling = false;

    /**
     * BOOLEAN 
     * If true, shows the pagination below table
     */
    @api showPaginationBottom = false;

    /**
     * @usage PILOT
     * 
     * BOOLEAN 
     * If true, shows the pagination in header
     */
    @api showPaginationTop = false;

    /**
     * BOOLEAN 
     * If true, narrow search input box is rendered in header
     */
    @api showNarrowResults = false;

    /**
     * BOOLEAN 
     * If true, shows the spinner inside dataview along with dispatching custom event dataviewloading. If false, only the event is dispatched so that parent component can show the waiting to user as per requirement
     */
    @api showDataViewSpinner;

    /**
     * BOOLEAN
     * If true, user defined column widths will be persistent. viewId is mandatory in this case
     */
    @track persistentColumnWidths

    /**
     * BOOLEAN 
     * If true, shows console logs
     */
    @api showConsoleLogs;

    //#endregion

    //#region ***************** private tracked variables *******************/
    @track dtableProps = {};
    @track recordsListInAllPages = [];
    @track recordsListInPage = [];
    @track startFromIndex = 0;
    @track selectedRowsMap = {};
    @track selectedRowsPagesMap = {};
    @track showSpinner = false;
    @track userMessage = "Please wait...";

    @track predefinedFiltersObject = {};
    @track predefinedTabsObject = {};
    @track tableFiltersMap = {
        listFilters: [],
        clientFilters: '',
        serverFilters: '',
        columnWidths: []
    };
    @track datatableWidth;

    @track error;
    @track stack;
    //#endregion

    //#region ***************** Private untracked variables *****************/
    recordsListFull = [];
    recordsListFullMap = {};

    paginationInfo = {
        oldPage: 0,
        currentPage: 0,
        currentPageContext: 0,
        totalPages: 0
    };

    _initDoneLocal = false;
    _noRecordsLocal = "NO RECORDS FOUND FROM SERVER";

    _soslMinCharsError = "Please enter atleast 2 characters to search";
    _baseDatatableTag = "C-DATA-TABLE";
    //#endregion
    //#region ***************** Change handlers *****************************/

    /**
     * STRING 
     * This is set as attribute on dataview. Useful for identification of dataview from parent component.
     * Mandatory when persistentColumnWidths is true
     */
    @api
    get viewId() {
        return this._viewId;
    }
    set viewId(value) {
        this._viewId = value;
        this.setAttribute('view-id', value);
    }

    /**
     * STRING
     * This is assigned to parent field as filter for getting child records to a given parent record. This is also set as attribute on dataview.
     */
    @api
    get recordId() {
        return this._recordId;
    }
    set recordId(value) {
        this._recordId = value;
        this.setAttribute('record-id', value);
        if (this._initDoneLocal && value) {
            this.doDataReset();
            this.doTableRefresh();
            this.getRecords();
        }
    }

    /**
     * STRING
     * Heading in main header above table. This is also set as attribute on dataview.
     */
    @api
    get mainHeading() {
        return this._mainHeading;
    }
    set mainHeading(value) {
        this._mainHeading = value;
        this.setAttribute('main-heading', value);
    }

    /**
 * OBJECT
 * Contains all the messages to be shown to user in different contexts of dataview like when no records available, while searching etc.
 */
    @api
    get userMessages() {
        if (isNotBlank(this._userMessages)) return this._userMessages;
        return {
            init: 'Please wait...',
            noRecords: 'NO RECORDS FOUND',
            search: 'Searching...',
            narrowSearchPlaceholder: "Narrow results"
        };
    }
    set userMessages(value) {
        if (typeof value === "string") {
            value = value.replace(/'/g, '"');
            this._userMessages = JSON.parse(value);
        } else {
            this._userMessages = value;
        }
    }

    /**
 * STRING
 * Number of records per page in pagination. Default is 5.
 */
    @api
    get pageSize() {
        if (!isNotBlank(this._pageSize)) this._pageSize = 5;
        return parseInt(this._pageSize, 10);
    }
    set pageSize(value) {
        this._pageSize = value;
    }

    /**
    * STRING
    * Added directly in SOQL query in WHERE clause. This can be given with/without the parent filter field.
    */
    @api
    get additionalConditions() {
        if (this._additionalConditions) return this._additionalConditions;
        return "";
    }
    set additionalConditions(value) {
        this._additionalConditions = value;
        if (this._initDoneLocal) {
            this.doDataReset();
            this.getRecords();
        }
    }

    /**
    * STRING
    * Whenever the search term is changed in parent, it triggers the search in dataview.
    */
    @api
    get soslSearchTerm() {
        return this._soslSearchTerm;
    }
    set soslSearchTerm(value) {
        this._soslSearchTerm = value;
        this.doDataReset();
        if (typeof value === "string" && (value.length > 1) && this._initDoneLocal) this.getRecords();
        else this.showHideSpinner(false, this._soslMinCharsError);
    }

    /**
    * OBJECT
    * Used for data injection from parent component. This can be provided directly either as wired property defined in parent component or as response from wired function parameter.
    */
    @api
    get wiredTo() {
        return this._wiredTo;
    }
    set wiredTo(value) {
        this._wiredTo = value;
        if (this.wiredTo.data) {
            if (this.showConsoleLogs) console.log("dataView setData => ", JSON.stringify(this.wiredTo.data));
            this.doDataReset();
            this.processRecordsResult([].concat(this.wiredTo.data));
            this.handleError(undefined);
        }
        else if (this.wiredTo.error) this.handleError(this.wiredTo.error);
    }

    /**
    * ARRAY/LIST
    * Used for data injection from parent component. The array of records to be displayed in dataview.
    */
    @api
    get rowsData() {
        return this._recordsData;
    }
    set rowsData(value) {
        if (this.showConsoleLogs) console.log("dataView recordsData => ", JSON.stringify(value));
        if (!this._initDoneLocal) this.processAllConfigurations();
        this.doDataReset();
        this._recordsData = value;
        this.processRecordsResult(this._recordsData);
    }

    /**
     * OBJECT
     * Provide all the configuration attributes of dataview.
     */
    @api
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
        if (this._initDoneLocal) {
            this.processConfig();
            if (this.getRecordsOnConfigChange && this.getRecordsFromServer) this.getRecords();
        }
    }

    //#endregion
    //#region ***************** PUBLIC API METHODS **************************/

    /**
     * This will reinitialise dataview
     */
    @api
    refresh() {
        this.processAllConfigurations();
    }

    /**
    * To fetch the data again from server. This will not work for data injection.
    */
    @api
    refreshData() {
        this.doDataReset();
        return this.getRecords();
    }

    /**
     * Returns selected rows as map.
     */
    @api
    getSelectedData() {
        return this.selectedRowsMap;
    }

    /**
     * For selecting the data programmatically from parent component. Map of key-field to row should be given.
     */
    @api
    setSelectedData(dataMap) {
        this.selectedRowsMap = dataMap;
    }

    /**
     * For programmatically setting tabs and filters
     */
    @api
    setView(viewInfo) {
        if (viewInfo.action === "setTab") {
            this.predefinedTabChanged(null, viewInfo.selectedTabLabel);
        } else if (viewInfo.action === "setFilter") {
            this.predefinedFilterChanged(null, viewInfo.selectedFilterLabel);
        }
    }

    /**
     * Invoke SOSL search programmatically by giving new search keyword as parameter.
     */
    @api
    doSoslSearch(searchTerm) {
        this.soslSearchTerm = searchTerm;
    }
    //#endregion
    //#region ***************** INIT ****************************************/
    connectedCallback() {
        if (!this._initDoneLocal) this.processAllConfigurations();
    }

    processAllConfigurations() {
        this.validate();

        if (this.config && Object.keys(this.config).length > 0) {
            this.processConfig();
        } else if (this.dtableConfig && Object.keys(this.dtableConfig).length > 0) {
            this.processDtableConfig();
        }

        this.userMessage = this.userMessages.init;

        if (this.getRecordsMapOnInit) this.getRecords();

        this.dispatchEvent(new CustomEvent('dataviewinit', {
            bubbles: true
        }));

        this._originTagRowSelectionLocal = this._baseDatatableTag; // initialising to the expected source tag
        this._initDoneLocal = true;
    }

    validate = () => {
        if (this.queryType === "SOSL" && this.enableInfiniteScrolling) {
            this.handleError("You cannot have infinite scrolling in SOSL query.");
        }
    }

    invoke = function (callback, ...params) {
        try {
            this.error = null;
            return callback.call(this, ...params);
        } catch (err) {
            return this.handleError(err);
        }
    }

    handleError(err) {
        if (err) {
            console.error("error => ", err);
            this.error = err + ". Please check console for details.";
            return err;
        }
        this.error = undefined;
        return null;
    }
    //#endregion

    //#region ***************** PRIVATE METHODS *****************************/

    registerHeaderActionsComponent = event => {
        this._headerActionsComponent = event.detail;
        if (this._headerActionsComponent.hasOwnProperty("setRecordId")) {
            this._headerActionsComponent.setRecordId(this.recordId);
        }
    }

    registerCardsComponent = event => {
        this._cardsComponent = event.detail;
    }

    //#endregion

    //#region ***************** Lightning Datatable Methods *****************/
    handleDtableRowAction = event => {
        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: {
                action: event.detail.action,
                row: event.detail.row
            }
        }));
    }
    handleDtableCancel = event => { }
    handleDtableResize = event => {
        if (this.showConsoleLogs) console.log("handleDtableResize => ", JSON.stringify(event.detail));
        if (this.tableFiltersMap.listFilters.length > 0) {
            if (this.persistentColumnWidths) {
                if (!this.viewId) {
                    console.warn('There is no viewId to store the new widths.');
                } else {
                    localStorage.setItem(this.viewId, JSON.stringify(event.detail.columnWidths));
                }
            }
            this.tableFiltersMap.columnWidths = event.detail.columnWidths.map(width => 'width:' + width + 'px;');

            this.tableFiltersMap.listFilters = this.tableFiltersMap.listFilters.map(filter => {
                filter.style = this.tableFiltersMap.columnWidths[filter.id];
                return filter;
            });

            this.datatableWidth = event.detail.columnWidths.reduce((total, currWidth) => {
                return currWidth + total;
            }, 0);
            this.datatableWidth = `width:${this.datatableWidth + 32}px;`;
        }
    }
    handleDtableRowSelection = event => {
        if (this._originTagRowSelectionLocal === this._baseDatatableTag) {
            this.selectedRowsMap = {};
            this.selectedRowsPagesMap[this.paginationInfo.currentPage] = event.detail.selectedRows;
            Object.values(this.selectedRowsPagesMap).forEach(rowsList => {
                rowsList.forEach(row => {
                    this.selectedRowsMap[row.Id] = row;
                });
            });
            let detail = {
                selectedRows: Object.values(this.selectedRowsMap),
                selectedRowsMap: this.selectedRowsMap
            };
            if (this._headerActionsComponent && this._headerActionsComponent.hasOwnProperty("setSelectedData")) {
                this._headerActionsComponent.setSelectedData(detail);
            }
            this.dispatchEvent(new CustomEvent('rowselection', {
                detail: detail
            }));
        } else {
            this._originTagRowSelectionLocal = event.target.tagName;
        }
    }
    handleDtableSave = event => { }
    handleDtableSort = event => {
        this.selectedRowsMap = {};
        this.selectedRowsPagesMap = {};

        this.dtableProps.sortedBy = event.detail.fieldName;
        this.dtableProps.sortedDirection = event.detail.sortDirection;

        this.recordsListInAllPages.sort((a, b) => {
            if (!a[this.dtableProps.sortedBy]) return 1;
            if (!b[this.dtableProps.sortedBy]) return -1;
            if (this.dtableProps.sortedDirection === "asc") {
                if (a[this.dtableProps.sortedBy] < b[this.dtableProps.sortedBy]) return -1;
                else if (a[this.dtableProps.sortedBy] > b[this.dtableProps.sortedBy]) return 1;
                if (a.Id < b.Id) return -1;
                return 1;
            }
            if (a[this.dtableProps.sortedBy] < b[this.dtableProps.sortedBy]) return 1;
            else if (a[this.dtableProps.sortedBy] > b[this.dtableProps.sortedBy]) return -1;
            if (a.Id > b.Id) return -1;
            return 1;
        });

        this.startFromIndex = 0;
        this.processRecordsListPagination();
    }

    //#endregion
    //#region ***************** Slicing and Dicing **************************/

    //for global search - client side search
    narrowRecordsList = (event) => {
        this.recordsListInAllPages.length = 0;
        this._searchStr = event.target.value;

        this.recordsListFull.forEach(item => {
            this._recordStr = JSON.stringify(item).toLowerCase();
            if (this._recordStr.indexOf(this._searchStr.toLowerCase()) > -1) {
                this.recordsListInAllPages.push(item);
            }
        });

        if (this.showConsoleLogs) console.log("All Pages info => ", this.recordsListInAllPages.length, JSON.stringify(this.recordsListInAllPages));

        if (this.recordsListInAllPages.length > 0) {
            this.startFromIndex = 0;
            this.processRecordsListPagination();
            this.showHideSpinner(false, "");
        } else {
            this.recordsListInPage.length = 0;
            this.showHideSpinner(false, this.userMessages.noRecords);
        }
    }

    //INVOKED WHEN FREE TEXT SEARCH CHANGES IN TABLE COLUMNS
    columnFilterKeyUp = (event) => {
        this._currentFilterIdLocal = parseInt(event.currentTarget.dataset.id, 10);
        let tableFieldsFiltersMap = this.tableFiltersMap.listFilters;

        tableFieldsFiltersMap.find(filterItem => filterItem.id === this._currentFilterIdLocal).filterValue = event.target.value;

        let _clientFilters = {};
        let _serverFilters = "";

        this.tableFiltersMap.listFilters
            .filter(listFilterItem => isNotBlank(listFilterItem.filterValue))
            .forEach(listFilterItem => {
                if (listFilterItem.filterType.toLowerCase() === "client") {
                    _clientFilters[listFilterItem.field] = listFilterItem.filterValue;
                } else if (listFilterItem.filterType.toLowerCase() === "server") {
                    _serverFilters += " AND " + listFilterItem.field + " LIKE '%" + listFilterItem.filterValue + "%'";
                }
            });

        this.tableFiltersMap.clientFilters = _clientFilters;
        this.tableFiltersMap.serverFilters = _serverFilters;

        const _currentFilter = tableFieldsFiltersMap[event.currentTarget.dataset.index];

        if (_currentFilter.filterType.toLowerCase() === "client") {
            if (isNotBlank(_clientFilters) && Object.keys(_clientFilters).length > 0) {
                this._recordsListInAllPagesLocal = this.recordsListFull.filter(recordItem => {
                    return !Object.keys(_clientFilters).find(fieldApi => {
                        const fieldValue = getFieldValueFromObject(recordItem, fieldApi);
                        return (!isNotBlank(fieldValue) || !fieldValue.toLowerCase().includes(_clientFilters[fieldApi].toLowerCase()));
                    });
                });
            } else {
                this._recordsListInAllPagesLocal = [...this.recordsListFull];
            }

            this.recordsListInAllPages.length = 0;

            if (this._recordsListInAllPagesLocal.length > 0) {
                this.recordsListInAllPages = this._recordsListInAllPagesLocal;
                this.processRecordsListPagination();
                this.showHideSpinner(false, "");
            } else {
                this.showHideSpinner(false, this.userMessages.noRecords);
                // event.target.value = event.target.value.slice(0, -1);
            }

            if (this.recordsListInPage.length === 0) {
                this.doTableRefresh();
            }
        } else if (_currentFilter.filterType.toLowerCase() === "server") {
            if (this.getRecordsFromServer) {
                //event.detail.filter.isLoading = true;
                this.getRecords(true)
                    .then(
                        result => {
                            this.showHideSpinner(false, "");
                            //event.detail.filter.isLoading = false;
                        },
                        error => {
                            if (error === this._noRecordsLocal) {
                                this.showHideSpinner(false, this.userMessages.noRecords);
                                //event.detail.filter.value = event.detail.filter.value.slice(0, -1);
                                //this.columnFilterChanged(event);
                            }
                            //event.detail.filter.isLoading = false;
                        }
                    );
            } else {
                this.dispatchEvent(new CustomEvent('dataviewcolumnfilterchanged', {
                    detail: {
                        tableFiltersMap: this.tableFiltersMap
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }

    handlePredefinedFilterLabel = () => {
        this.template.querySelector('[data-predefined-filter]').click();
    }

    predefinedFilterChanged = (event, selectedLabel) => {
        this.predefinedFiltersObject.options.forEach(opt => { opt.checked = false });
        let selectedOption = selectedLabel ?
            this.predefinedFiltersObject.options.find(opt => opt.label === selectedLabel) :
            this.predefinedFiltersObject.options.find(opt => opt.value === event.detail.value);
        selectedOption.checked = true;

        if (selectedOption.value.trim() !== this.predefinedFiltersObject.selectedOption.value) {
            this.doDataReset();

            this.predefinedFiltersObject.selectedOption.default = selectedOption.label.trim();
            this.predefinedFiltersObject.selectedOption.label = selectedOption.label.trim();
            this.predefinedFiltersObject.selectedOption.value = selectedOption.value.trim();

            let details = {
                predefinedFiltersObject: this.predefinedFiltersObject,
                predefinedTabsObject: this.predefinedTabsObject
            };

            //log
            if (this.showConsoleLogs) console.log("(predefinedFilterChanged Invoked) details => " + JSON.stringify(details));

            if (this.getRecordsFromServer) this.getRecords();

            this.dispatchEvent(new CustomEvent('dataviewfilterchanged', {
                detail: {
                    details: details
                }
            }));
        }
    }

    predefinedTabChanged = (event, selectedLabel) => {
        this._selectedTabEl = this.template.querySelector(".slds-tabs_default__content.slds-show");

        this.predefinedTabsObject.options.forEach(opt => { opt.checked = false });
        let selectedOption = this.predefinedTabsObject.options.find(opt => opt.label === (selectedLabel || this._selectedTabEl.value));
        selectedOption.checked = true;

        if (selectedOption.value.trim() !== this.predefinedTabsObject.selectedOption.value) {
            this.doDataReset();

            this.predefinedTabsObject.selectedOption.default = selectedOption.label.trim();
            this.predefinedTabsObject.selectedOption.label = selectedOption.label.trim();
            this.predefinedTabsObject.selectedOption.value = selectedOption.value.trim();

            let details = {
                predefinedFiltersObject: this.predefinedFiltersObject,
                predefinedTabsObject: this.predefinedTabsObject
            };

            //log
            if (this.showConsoleLogs) console.log("(predefinedTabChanged Invoked) details => " + JSON.stringify(details));

            if (this.getRecordsFromServer) this.getRecords();

            this.dispatchEvent(new CustomEvent('dataviewfilterchanged', {
                detail: {
                    details: details
                }
            }));
        }
    }

    //#endregion
    //#region ***************** Records getters and process *****************/

    /**
     * If data-store is enabled, it will return depending on whether data-list is already available for given combination of filters
     *
     * @param {*} [rejectOnNoRecords=null] - if true, Promise will be rejected when no records are found
     * @returns Promise with resolving to SUCCESS string or rejected with message _noRecordsLocal property
     * @memberof DataView
     */
    getRecords(rejectOnNoRecords = null) {
        return new Promise((resolve, reject) => {
            this.showHideSpinner(true, this.userMessages.search);

            this._serverFiltersLocal = this.tableFiltersMap.serverFilters;
            this._additionalConditionsLocal = isNotBlank(this._serverFiltersLocal) ? (this.additionalConditions + this._serverFiltersLocal) : this.additionalConditions;
            this._predefinedFilterLocal = isNotBlank(this.predefinedFiltersObject.selectedOption) ? this.predefinedFiltersObject.selectedOption.value.trim() : "";
            this._predefinedTabLocal = isNotBlank(this.predefinedTabsObject.selectedOption) ? this.predefinedTabsObject.selectedOption.value.trim() : "";

            //Formation of conditional filter strings based on query type
            this._additionalConditionsLocal = isNotBlank(this._additionalConditionsLocal) ?
                (this._additionalConditionsLocal + (isNotBlank(this._predefinedFilterLocal) ?
                    (' AND ' + this._predefinedFilterLocal + (isNotBlank(this._predefinedTabLocal) ?
                        (' AND ' + this._predefinedTabLocal) : '')) :
                    (isNotBlank(this._predefinedTabLocal) ? (' AND ' + this._predefinedTabLocal) : ''))) : (isNotBlank(this._predefinedFilterLocal) ?
                        (this._predefinedFilterLocal + (isNotBlank(this._predefinedTabLocal) ?
                            (' AND ' + this._predefinedTabLocal) : '')) :
                        (isNotBlank(this._predefinedTabLocal) ? (this._predefinedTabLocal) : ''));

            if (this.queryType === 'SOQL') {
                this._searchKeyLocal = this._additionalConditionsLocal + (this.parentFilterField ? ("_" + this.parentFilterField + "-" + this.recordId) : "");
            } else if (this.queryType === 'SOSL') {
                this._searchKeyLocal = this.soslSearchTerm;
            }

            if (!this.recordsListFullMap.hasOwnProperty(this._searchKeyLocal)) {
                if (this.getRecordsFromServer) {
                    const params = {
                        recordId: this.recordId,
                        childObjectName: this.childObjectName,
                        fields: this.fields,
                        whereCondition: this.parentFilterField,
                        additionalConditions: this._additionalConditionsLocal,
                        userFilterConditions: "",
                        orderBy: this.orderBy,
                        sortAscending: this.sortAscending,
                        limitRecords: this.limit,
                        queryType: this.queryType,
                        soslSearchTerm: this.soslSearchTerm,
                        getQueryLocator: this.enableInfiniteScrolling
                    };
                    getSObjectsMap({
                        params: params
                    })
                        .then(result => {
                            if (this.showConsoleLogs) console.log("result => ", JSON.stringify(result));
                            this.error = undefined;
                            if (rejectOnNoRecords && result.records.length === 0) return reject(this._noRecordsLocal);
                            this.processRecordsResult(result.records);
                            return resolve("SUCCESS");
                        })
                        .catch(error => {
                            this.showHideSpinner(false, "");
                            if (error.body && error.body.message) this.handleError(error.body.message);
                            else this.handleError(error);

                            // for better memory management
                            if (Array.isArray(this.recordsListInAllPages)) {
                                this.recordsListInAllPages.length = 0;
                            }
                            this.recordsListFull = undefined;

                            // for better memory management
                            if (Array.isArray(this.recordsListInAllPages)) {
                                this.recordsListInAllPages.length = 0;
                            }
                            this.recordsListInAllPages = undefined;
                            return reject("ERROR");
                        });
                } else {
                    if (rejectOnNoRecords && this.recordsListInjected.length === 0) return reject(this._noRecordsLocal);
                    this.processRecordsResult(this.recordsListInjected);
                    return resolve("SUCCESS");
                }
            } else {
                if (rejectOnNoRecords && this.recordsListFullMap[this._searchKeyLocal].length === 0) return reject(this._noRecordsLocal);
                this.processRecordsResult(this.recordsListFullMap[this._searchKeyLocal]);
                return resolve("SUCCESS");
            }
        });
    }

    /**
     * Process records and load recordsListFull & recordsListInAllPages. Also if data store is enabled, store the records with key as filters combination
     *
     * @param {*} recordsListResult - is passed either from server return or else from data injection
     * @memberof DataView
     */
    processRecordsResult(recordsListResult) {
        this.showHideSpinner(false, "");

        if (this.createDataStore) {
            this.recordsListFullMap[this._searchKeyLocal] = [...recordsListResult];
        }

        if (recordsListResult && recordsListResult.length > 0) {
            // for better memory management
            if (Array.isArray(this.recordsListFull)) {
                this.recordsListFull.length = 0;
            }
            this.recordsListFull = [...recordsListResult];

            // for better memory management
            if (Array.isArray(this.recordsListInAllPages)) {
                this.recordsListInAllPages.length = 0;
            }
            this.recordsListInAllPages = [...recordsListResult];

            //log
            if (this.showConsoleLogs) console.log("recordsListResult => ");
            if (this.showConsoleLogs) console.table(recordsListResult);

            this.processAllRows();
        } else {
            this.doDataReset();
            this.showHideSpinner(false, this.userMessages.noRecords);
        }
    }

    processAllRows() {
        // for better memory management
        if (Array.isArray(this.dtableProps.selectedRows)) {
            this.dtableProps.selectedRows.length = 0;
        }
        if (this.viewType === "Datatable") {
            this.recordsListInAllPages = this.recordsListInAllPages.map(thisRow => {
                if (!this.getRecordsFromServer) thisRow = { ...thisRow };
                if (this.selectedRowsMap.hasOwnProperty(thisRow.Id))
                    this.dtableProps.selectedRows.push(thisRow.Id);
                this.dtableProps.columns.map(col => {
                    if (col.hasOwnProperty("fieldApi")) {
                        let fieldApi = col.fieldApi;
                        if (fieldApi.includes('('))
                            fieldApi = fieldApi.substring(fieldApi.indexOf('(') + 1, fieldApi.indexOf(')'));
                        thisRow[col.fieldName] = getFieldValueFromObject(thisRow, fieldApi);
                    }
                    return null;
                });
                return thisRow;
            });
        }
        this.processRecordsListPagination();
    }

    processRecordsListPagination(lastSetOfRecords = null, lastNumberOfRecords = null) {
        // for better memory management
        if (Array.isArray(this.recordsListInPage)) {
            this.recordsListInPage.length = 0;
        }
        if (lastSetOfRecords) {
            this.recordsListInPage = this.recordsListInAllPages.slice(lastNumberOfRecords);
        } else {
            this.recordsListInPage = this.recordsListInAllPages.slice(this.startFromIndex, this.pageSize + this.startFromIndex);
        }

        if (this.viewType === "Cards") this._cardsComponent.setRecordsList(this.recordsListInPage);
    }

    showHideSpinner(showSpinner, userMessage) {
        if (this.showDataViewSpinner) {
            this.showSpinner = showSpinner;
            this.dtableProps.isLoading = showSpinner;
        }

        this.userMessage = userMessage;

        this.dispatchEvent(new CustomEvent('dataviewloading', {
            detail: { showSpinner, userMessage },
            bubbles: true,
            composed: true
        }));
    }

    //PAGINATION - INVOKED WHEN PAGE SIZE IS CHANGED
    doTableRefresh() {
        this.startFromIndex = 0;
    }

    doDataReset() {
        if (this.showNarrowResults && this.template.querySelector(".id-narrow-results"))
            this.template.querySelector(".id-narrow-results").value = "";
        this.dtableProps.sortedBy = "";
        this.dtableProps.sortedDirection = "";
        this.recordsListInAllPages.length = 0;
        this.recordsListFull.length = 0;
        this.recordsListInPage.length = 0;
        this.startFromIndex = 0;
    }

    //#endregion
    //#region ***************** INIT METHODS ********************************/

    processConfig() {
        if (this.config.hasOwnProperty("parent-filter-field") || this.config.hasOwnProperty("parentFilterField"))
            this.parentFilterField = this.config["parent-filter-field"] || this.config.parentFilterField;
        if (this.config.hasOwnProperty("icon-name") || this.config.hasOwnProperty("iconName"))
            this.iconName = this.config["icon-name"] || this.config.iconName;
        if (this.config.hasOwnProperty("child-object-name") || this.config.hasOwnProperty("childObjectName"))
            this.childObjectName = this.config["child-object-name"] || this.config.childObjectName;
        if (this.config.hasOwnProperty("order-by") || this.config.hasOwnProperty("orderBy"))
            this.orderBy = this.config["order-by"] || this.config.orderBy;
        if (this.config.hasOwnProperty("sort-ascending") || this.config.hasOwnProperty("sortAscending"))
            this.sortAscending = this.config["sort-ascending"] || this.config.sortAscending;
        if (this.config.hasOwnProperty("limit"))
            this.limit = this.config.limit;
        if (this.config.hasOwnProperty("view-type") || this.config.hasOwnProperty("viewType"))
            this.viewType = this.config["view-type"] || this.config.viewType;

        if (this.config.hasOwnProperty("predefined-filters-list") || this.config.hasOwnProperty("predefinedFiltersList")) {
            if (this.config.hasOwnProperty("predefinedFiltersList"))
                this.predefinedFiltersList = [...this.config.predefinedFiltersList];
            else
                this.predefinedFiltersList = [...this.config["predefined-filters-list"]]

            this.getPredefinedFilters();
        }

        if (this.config.hasOwnProperty("predefined-tabs-list") || this.config.hasOwnProperty("predefinedTabsList")) {
            if (this.config.hasOwnProperty("predefinedTabsList"))
                this.predefinedTabsList = [...this.config.predefinedTabsList];
            else
                this.predefinedTabsList = [...this.config["predefined-tabs-list"]];

            this.getPredefinedTabs();
        }

        if (this.config.hasOwnProperty("query-type") || this.config.hasOwnProperty("queryType"))
            this.queryType = this.config["query-type"] || this.config.queryType;
        if (this.config.hasOwnProperty("table-container-style") || this.config.hasOwnProperty("tableContainerStyle"))
            this.tableContainerStyle = this.config["table-container-style"] || this.config.tableContainerStyle;
        if (this.config.hasOwnProperty("container-style") || this.config.hasOwnProperty("containerStyle"))
            this.containerStyle = this.config["container-style"] || this.config.containerStyle;
        if (this.config.hasOwnProperty("table-style") || this.config.hasOwnProperty("tableStyle"))
            this.tableStyle = this.config["table-style"] || this.config.tableStyle;

        // EXTERNAL DATA ATTRIBUTES USED IN LIGHTNING COMPONENT
        if (this.config.hasOwnProperty("get-records-map-on-init") || this.config.hasOwnProperty("getRecordsMapOnInit"))
            this.getRecordsMapOnInit = this.config["get-records-map-on-init"] || this.config.getRecordsMapOnInit;
        if (this.config.hasOwnProperty("get-records-on-config-change") || this.config.hasOwnProperty("getRecordsOnConfigChange"))
            this.getRecordsOnConfigChange = this.config["get-records-on-config-change"] || this.config.getRecordsOnConfigChange;
        if (this.config.hasOwnProperty("get-records-from-server") || this.config.hasOwnProperty("getRecordsFromServer"))
            this.getRecordsFromServer = this.config["get-records-from-server"] || this.config.getRecordsFromServer;
        if (this.config.hasOwnProperty("create-data-store") || this.config.hasOwnProperty("createDataStore"))
            this.createDataStore = this.config["create-data-store"] || this.config.createDataStore;

        // OPTIONS
        if (this.config.hasOwnProperty("show-header") || this.config.hasOwnProperty("showHeader"))
            this.showHeader = this.config["show-header"] || this.config.showHeader;
        if (this.config.hasOwnProperty("enable-infinite-scrolling") || this.config.hasOwnProperty("enableInfiniteScrolling"))
            this.enableInfiniteScrolling = this.config["enable-infinite-scrolling"] || this.config.enableInfiniteScrolling;
        if (this.config.hasOwnProperty("show-pagination-bottom") || this.config.hasOwnProperty("showPaginationBottom"))
            this.showPaginationBottom = this.config["show-pagination-bottom"] || this.config.showPaginationBottom;
        if (this.config.hasOwnProperty("show-pagination-top") || this.config.hasOwnProperty("showPaginationTop"))
            this.showPaginationTop = this.config["show-pagination-top"] || this.config.showPaginationTop;
        if (this.config.hasOwnProperty("show-narrow-results") || this.config.hasOwnProperty("showNarrowResults"))
            this.showNarrowResults = this.config["show-narrow-results"] || this.config.showNarrowResults;
        if (this.config.hasOwnProperty("show-data-view-spinner") || this.config.hasOwnProperty("showDataViewSpinner"))
            this.showDataViewSpinner = this.config["show-data-view-spinner"] || this.config.showDataViewSpinner;
        // if (this.config.hasOwnProperty("persistent-column-widths") || this.config.hasOwnProperty("persistentColumnWidths"))
        //     this.persistentColumnWidths = this.config["persistent-column-widths"] || this.config.persistentColumnWidths;

        if (this.config.hasOwnProperty("main-heading") || this.config.hasOwnProperty("mainHeading"))
            this.mainHeading = this.config["main-heading"] || this.config.mainHeading;
        if (this.config.hasOwnProperty("record-id") || this.config.hasOwnProperty("recordId"))
            this.recordId = this.config["record-id"] || this.config.recordId;
        if (this.config.hasOwnProperty("view-id") || this.config.hasOwnProperty("viewId"))
            this.viewId = this.config["view-id"] || this.config.viewId;
        if (this.config.hasOwnProperty("user-messages") || this.config.hasOwnProperty("userMessages"))
            this.userMessages = this.config["user-messages"] || this.config.userMessages;
        if (this.config.hasOwnProperty("page-size") || this.config.hasOwnProperty("pageSize"))
            this.pageSize = this.config["page-size"] || this.config.pageSize;
        if (this.config.hasOwnProperty("additional-conditions") || this.config.hasOwnProperty("additionalConditions"))
            this.additionalConditions = this.config["additional-conditions"] || this.config.additionalConditions;
        if (this.config.hasOwnProperty("sosl-search-term") || this.config.hasOwnProperty("soslSearchTerm"))
            this.soslSearchTerm = this.config["sosl-search-term"] || this.config.soslSearchTerm;

        if (this.config.hasOwnProperty("dtable-config") || this.config.hasOwnProperty("dtableConfig") && this.viewType === "Datatable") {
            if (this.config.dtableConfig) {
                this.dtableConfig = { ...this.config.dtableConfig };
            } else {
                this.dtableConfig = { ...this.config["dtable-config"] };
            }
            this.processDtableConfig();
            this.processFieldsConfig();
        }

    }

    processDtableConfig() {
        this.dtableProps.columns = [...this.dtableConfig.columns];
        if (this.persistentColumnWidths && this.viewId && localStorage.getItem(this.viewId)) {
            this.dtableProps.columns = this.dtableProps.columns.map((col, ind) => {
                col = { ...col };
                col.initialWidth = parseInt(JSON.parse(localStorage.getItem(this.viewId))[ind], 10);
                return col;
            });
        }
        this.dtableProps.sortedBy = "";
        this.dtableProps.sortedDirection = "";
        if (this.dtableConfig.hasOwnProperty("hideCheckboxColumn") || this.dtableConfig.hasOwnProperty("hide-checkbox-column"))
            this.dtableProps.hideCheckboxColumn = this.dtableConfig.hideCheckboxColumn || this.dtableConfig["hide-checkbox-column"];
        else this.dtableProps.hideCheckboxColumn = false;
        if (this.dtableConfig.hasOwnProperty("showRowNumberColumn") || this.dtableConfig.hasOwnProperty("show-row-number-column"))
            this.dtableProps.showRowNumberColumn = this.dtableConfig.showRowNumberColumn || this.dtableConfig["show-row-number-column"];
        else this.dtableProps.showRowNumberColumn = false;
        if (this.dtableConfig.hasOwnProperty("rowNumberOffset") || this.dtableConfig.hasOwnProperty("row-number-offset"))
            this.dtableProps.rowNumberOffset = this.dtableConfig.rowNumberOffset || this.dtableConfig["row-number-offset"];
        else this.dtableProps.rowNumberOffset = 0;
        if (this.dtableConfig.hasOwnProperty("resizeColumnDisabled") || this.dtableConfig.hasOwnProperty("resize-column-disabled"))
            this.dtableProps.resizeColumnDisabled = this.dtableConfig.resizeColumnDisabled || this.dtableConfig["resize-column-disabled"];
        else this.dtableProps.resizeColumnDisabled = false;
        if (this.dtableConfig.hasOwnProperty("minColumnWidth") || this.dtableConfig.hasOwnProperty("min-column-width"))
            this.dtableProps.minColumnWidth = this.dtableConfig.minColumnWidth || this.dtableConfig["min-column-width"];
        else this.dtableProps.minColumnWidth = 50;
        if (this.dtableConfig.hasOwnProperty("maxColumnWidth") || this.dtableConfig.hasOwnProperty("max-column-width"))
            this.dtableProps.maxColumnWidth = this.dtableConfig.maxColumnWidth || this.dtableConfig["max-column-width"];
        else this.dtableProps.maxColumnWidth = 1000;
        if (this.dtableConfig.hasOwnProperty("resizeStep") || this.dtableConfig.hasOwnProperty("resize-step"))
            this.dtableProps.resizeStep = this.dtableConfig.resizeStep || this.dtableConfig["resize-step"];
        else this.dtableProps.resizeStep = 10;
        if (this.dtableConfig.hasOwnProperty("defaultSortDirection") || this.dtableConfig.hasOwnProperty("default-sort-direction"))
            this.dtableProps.defaultSortDirection = this.dtableConfig.defaultSortDirection || this.dtableConfig["default-sort-direction"];
        else this.dtableProps.defaultSortDirection = "asc";
        if (this.dtableConfig.hasOwnProperty("enableInfiniteLoading") || this.dtableConfig.hasOwnProperty("enable-infinite-loading"))
            this.dtableProps.enableInfiniteLoading = this.dtableConfig.enableInfiniteLoading || this.dtableConfig["enable-infinite-loading"];
        else this.dtableProps.enableInfiniteLoading = false;
        if (this.dtableConfig.hasOwnProperty("loadMoreOffset") || this.dtableConfig.hasOwnProperty("load-more-offset"))
            this.dtableProps.loadMoreOffset = this.dtableConfig.loadMoreOffset || this.dtableConfig["load-more-offset"];
        else this.dtableProps.loadMoreOffset = 20;
        if (this.dtableConfig.hasOwnProperty("isLoading") || this.dtableConfig.hasOwnProperty("is-loading"))
            this.dtableProps.isLoading = this.dtableConfig.isLoading || this.dtableConfig["is-loading"];
        else this.dtableProps.isLoading = false;
        if (this.dtableConfig.hasOwnProperty("maxRowSelection") || this.dtableConfig.hasOwnProperty("max-row-selection"))
            this.dtableProps.maxRowSelection = this.dtableConfig.maxRowSelection || this.dtableConfig["max-row-selection"];
        else this.dtableProps.maxRowSelection = 1000;
        if (this.dtableConfig.hasOwnProperty("selectedRows") || this.dtableConfig.hasOwnProperty("selected-rows")) {
            if (this.dtableConfig.hasOwnProperty("selectedRows"))
                this.dtableProps.selectedRows = [...this.dtableConfig.selectedRows];
            else
                this.dtableProps.selectedRows = [...this.dtableConfig["selected-rows"]];
        }
        else this.dtableProps.selectedRows = [];
        if (this.dtableConfig.hasOwnProperty("errors"))
            this.dtableProps.errors = this.dtableConfig.errors;
        else this.dtableProps.errors = null;
        if (this.dtableConfig.hasOwnProperty("draftValues") || this.dtableConfig.hasOwnProperty("draft-values"))
            this.dtableProps.draftValues = this.dtableConfig.draftValues || this.dtableConfig["draft-values"];
        else this.dtableProps.draftValues = null;
        if (this.dtableConfig.hasOwnProperty("hideTableHeader") || this.dtableConfig.hasOwnProperty("hide-table-header"))
            this.dtableProps.hideTableHeader = this.dtableConfig.hideTableHeader || this.dtableConfig["hide-table-header"];
        else this.dtableProps.hideTableHeader = false;
        if (this.dtableConfig.hasOwnProperty("suppressBottomBar") || this.dtableConfig.hasOwnProperty("suppress-bottom-bar"))
            this.dtableProps.suppressBottomBar = this.dtableConfig.suppressBottomBar || this.dtableConfig["suppress-bottom-bar"];
        else this.dtableProps.suppressBottomBar = false;

    }

    processFieldsConfig() {
        this._fieldsLocal = [];
        this._hasColumnFilterLocal = this.dtableProps.columns.find(field => field.hasOwnProperty("filterType"));
        this.dtableProps.columns.forEach((column, fInd) => {
            if (column.hasOwnProperty("fieldApi")) this._fieldsLocal.push(column.fieldApi);

            if (this._hasColumnFilterLocal) {
                this.tableFiltersMap.listFilters.push({
                    field: column.fieldName,
                    heading: column.label,
                    placeholder: "Search " + column.label,
                    class: (isNotBlank(column.filterType) && column.filterType !== "no") ? "" : "slds-hidden",
                    filterType: (isNotBlank(column.filterType)) ? column.filterType : "no",
                    filterValue: "",
                    id: fInd
                });
            }
        });

        this.fields = this._fieldsLocal.join(",");
    }

    getPredefinedTabs() {
        if (this.predefinedTabsList) {
            let optionsList = JSON.parse(JSON.stringify(this.predefinedTabsList));
            optionsList.forEach(opt => { opt.checked = false });

            let optionsMap = {};
            optionsMap.defaultOption = optionsList.find(optionItem => optionItem.default);
            if (!optionsMap.defaultOption) {
                optionsMap.defaultOption = optionsList[0];
            }
            optionsMap.defaultOption.checked = true;

            this.predefinedTabsObject = {
                options: optionsList,
                selectedOption: {
                    default: optionsMap.defaultOption.label,
                    label: optionsMap.defaultOption.label,
                    value: optionsMap.defaultOption.value
                }
            };
        }
    }

    getPredefinedFilters() {
        if (this.predefinedFiltersList) {
            let optionsList = JSON.parse(JSON.stringify(this.predefinedFiltersList));
            optionsList.forEach(opt => { opt.checked = false });

            let optionsMap = {};
            optionsMap.defaultOption = optionsList.find(optionItem => optionItem.default);
            if (!optionsMap.defaultOption) {
                optionsMap.defaultOption = optionsList[0];
            }
            optionsMap.defaultOption.checked = true;

            this.predefinedFiltersObject = {
                options: optionsList,
                selectedOption: {
                    default: optionsMap.defaultOption.label,
                    label: optionsMap.defaultOption.label,
                    value: optionsMap.defaultOption.value
                }
            };
        }
    }
    //#endregion
    //#region ***************** PAGINATION METHODS **************************/

    //PAGINATION - SHOW PREVIOUS PAGE
    showPreviousPage(event) {
        if (this.startFromIndex > 0) {
            if (this.selectedRowsPagesMap.hasOwnProperty(this.paginationInfo.currentPage) && this.selectedRowsPagesMap[this.paginationInfo.currentPage].length > 0)
                this._originTagRowSelectionLocal = event.target.tagName;
            this.startFromIndex = this.startFromIndex - this.pageSize;
            this.processRecordsListPagination();
        }
    }

    //PAGINATION - SHOW NEXT PAGE
    showNextPage(event) {
        if (this.startFromIndex + this.pageSize < this.recordsListInAllPages.length) {
            if (this.selectedRowsPagesMap.hasOwnProperty(this.paginationInfo.currentPage) && this.selectedRowsPagesMap[this.paginationInfo.currentPage].length > 0)
                this._originTagRowSelectionLocal = event.target.tagName;
            this.startFromIndex = this.startFromIndex + this.pageSize;
            this.processRecordsListPagination();
        }
    }

    //PAGINATION - INVOKED WHEN PAGE SIZE IS CHANGED
    pageSizeChanged = () => {
        this.doTableRefresh();
        this.processRecordsListPagination();
    }

    //#endregion
    //#region ***************** GETTERS *************************************/
    get viewTypeDatatable() {
        return this.viewType === "Datatable";
    }
    get viewTypeCards() {
        return this.viewType === "Cards";
    }
    get paginationBottomInfo() {
        if (Array.isArray(this.recordsListInAllPages) && this.recordsListInAllPages.length > 0) {
            this.paginationInfo.currentPage = (((this.startFromIndex + 1) / this.pageSize) - (((this.startFromIndex + 1) % this.pageSize) / this.pageSize) + ((((this.startFromIndex + 1) % this.pageSize) === 0) ? 0 : 1));
            this.paginationInfo.totalPages = (((this.recordsListInAllPages.length / this.pageSize) - ((this.recordsListInAllPages.length % this.pageSize) / this.pageSize)) + (((this.recordsListInAllPages.length % this.pageSize) === 0) ? 0 : 1));
            return 'Page ' + this.paginationInfo.currentPage + ' of ' + this.paginationInfo.totalPages;
        }
        return 'Page 0 of 0';
    }

    get showPaginationBottomInfo() {
        return this.showPaginationBottom && !this.enableInfiniteScrolling;
    }
    get showPaginationTopInfo() {
        return this.showPaginationTop && !this.enableInfiniteScrolling;
    }

    get recordsInfo() {
        if (Array.isArray(this.recordsListInAllPages) && this.recordsListInAllPages.length > 0) {
            this._endIndex = this.startFromIndex + this.pageSize;
            return 'Showing ' + (this.startFromIndex + 1) + " to " + ((this._endIndex > this.recordsListInAllPages.length) ? this.recordsListInAllPages.length : this._endIndex) + " of " + this.recordsListInAllPages.length + " records";
        }
        return 'Showing 0 of 0 records';
    }
    get showMessage() {
        return isNotBlank(this.userMessage) || this.showSpinner;
    }
    get filtersDisabled() {
        return this.showMessage && this.userMessage !== this.userMessages.noRecords;
    }
    get showPredefinedFilters() {
        return Object.keys(this.predefinedFiltersObject).length > 0;
    }
    get showPredefinedTabs() {
        return Object.keys(this.predefinedTabsObject).length > 0;
    }
    get columnFiltersStyleAuto() {
        if (this.columnFiltersStyle) return this.columnFiltersStyle;
        if (!this.dtableConfig.hideCheckboxColumn && !this.dtableConfig.showRowNumberColumn) return 'padding-left:32px;';
        if (!this.dtableConfig.hideCheckboxColumn && this.dtableConfig.showRowNumberColumn) return 'padding-left:84px;';
        return '';
    }
}