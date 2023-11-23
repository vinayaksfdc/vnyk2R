/**
 * @File Name          : dataTable.js
 * @Description        : 
 * @Author             : Sasank Subrahmanyam V
 * @Group              : 
 * @Last Modified By   : Swapnil Saurav
 * @Last Modified On   : 4/1/2020, 1:38:30 PM
 * @Modification Log   : Checkbox option added on the dataTable to enable rendering of clickable checkbox as a column.
 * Ver       Date            Author      		    Modification
 * 1.0      10/16/2019      Sasank Subrahmanyam V   Initial Version
 * 1.1      10-Oct-2019     Vijetha                 Added name and favorite in link template
 * 1.2      12-Nov-2019     Chandrasekhar Mokkala   Added richText support   
 * 2.0      31-Mar-2020     Swapnil Saurav          Checkbox option added on the dataTable to enable rendering of clickable checkbox as a column.
**/
import LightningDatatable from 'lightning/datatable';
import link from './link.html';
import richText from './richText.html';
import checkbox from './checkbox.html';
export default class DataTable extends LightningDatatable {
    static customTypes = {
        link: {
            template: link,
            typeAttributes: ['recordId', 'label', 'name', 'wrap', 'target', 'favorite'],
        },
        'rich-text': {
            template: richText
        },
        checkbox: {
            template: checkbox,
            typeAttributes: ['name', 'label', 'recordId', 'checked', 'selectionName']
        }
    };
}