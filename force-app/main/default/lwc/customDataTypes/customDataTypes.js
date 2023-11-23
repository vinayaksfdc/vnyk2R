import LightningDatatable from 'lightning/datatable';
import customPicture from './custom1.html';
export default class CustomDataTypes extends LightningDatatable {
    static customTypes = {
        customPictureType: {
            template: customPicture,
            standardCellLayout: true,
            typeAttributes: ['pictureUrl']
        }
        // Other Custom Types
    };
}