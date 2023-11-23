import { LightningElement } from 'lwc';

export default class SearchLightningDatatable extends LightningElement {
/*     _allData = [
        { id: '1', name: 'Marc Benioff', profession: 'Business Man',},
        { id: '2', name: 'Bill Gates', profession: 'Business Man', },
        { id: '3', name: 'Narendra Modi', profession: 'Politician', },
        { id: '4', name: 'Arnold Schwarzenegger', profession: 'Actor,'}
    ]; */


    _allData = [ {Id: 1, isSelected: true, name: 'Google', website: 'https://google.com'},
        {Id: 2, isSelected: false, name: 'Facebook', website: 'https://facebook.com'},
        {Id: 3, isSelected: true, name: 'DevLife', website: 'https://devlife.tech'},
        {Id: 4, isSelected: false, name: 'Gmail', website: 'https://gmail.com', isDisabled: true}
    ];
    
    data = [];
    columns = [
        { label: 'People I Have Heard Of', fieldName: 'name' }
    ];
    connectedCallback() {
        this.data = [...this._allData];
    }
    updateSearch(event) {
        var regex = new RegExp(event.target.value,'gi')
        this.data = this._allData.filter(
            row => regex.test(row.name)
        );
    }
}