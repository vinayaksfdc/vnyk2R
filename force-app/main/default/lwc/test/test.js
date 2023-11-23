import { LightningElement , track} from 'lwc';

export default class Test extends LightningElement {
    @track errorList =[
        {
            id:"input-text" ,
            type:"",
            error:"Name is compulsary"
        },
        {
            id:"input-checkbox" ,
            type:"",
            error:"Checkbox is compulsary"
        },
        {
            id:"input-password" ,
            type:"",
            error:"Password is compulsary"
        },
        {
            id:"input-radio" ,
            type:"",
            error:"Single radio is compulsary"
        },
        {
            id:"input-toggle" ,
            type:"toggle",
            error:"Toggle is compulsary"
        },
        {
            id:"select" ,
            type:"",
            error:"Select is compulsary"
        },
        {
            id:"textarea" ,
            type:"textarea",
            error:"Textarea is compulsary"
        },
        {
            id:'checkboxGroup',
            type:'checkbox-group',
            error:"Checkbox group is compulsary"
        },
        {
            id:'radioButtonGroup',
            type:'radiobutton-group',
            error:"Radiobutton group is compulsary"
        }
    ];
}