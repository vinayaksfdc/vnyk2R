import { LightningElement } from 'lwc';

export default class Zx extends LightningElement 
{
    yesSelection()
        {
            this.template.querySelector('.yesBtn').classList.add('dynamicCSS'); 
            this.template.querySelector('.noBtn').classList.remove('dynamicCSS');
        }
        noSelection()
        {
            this.template.querySelector('.noBtn').classList.add('dynamicCSS');
            this.template.querySelector('.yesBtn').classList.remove('dynamicCSS');
    }
}