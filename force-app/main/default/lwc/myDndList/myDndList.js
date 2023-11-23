/* eslint-disable no-mixed-spaces-and-tabs */
import { LightningElement , api} from 'lwc';

export default class MyDndList extends LightningElement {
    @api tasklist=[{   
        taskid: "ta1",
        name:"Angular",
        category:"wip"
    },  
    
    {   
        taskid: "ta2",
        name:"React", 
        category:"wip"
    },  

    {   
        taskid: "ta3",
        name:"Vue", 
        category:"complete"
    },
    
    {
        taskid: "ta4",
        name: "Lightning Web Component",
        category: "complete"
    }
];
    @api category;
    
    

    handleItemDrop(evt) {
        const id = this.draggingid;
        const category = evt.detail;
 
        const tasks = this.tasklist.filter((task) => {
			if (task.taskid === id) {
			    task.category = category;           
			}              
			return task;       
		});

        this.tasklist = tasks;
        this.distributeTasks();
    }

    handleDrop() {
        const event = new CustomEvent('itemdrop', {
            detail: this.category
        });
        
        this.dispatchEvent(event);
    }
}