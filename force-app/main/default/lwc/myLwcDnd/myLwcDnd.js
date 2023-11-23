/* eslint-disable no-console */
/* eslint-disable no-undef */
import { LightningElement, track } from 'lwc';
import { tasks } from 'c/data';

export default class Lwcdnd extends LightningElement {
    @track tasklist = tasks;
    @track leftTasks = [];
    @track rightTasks = [];
 
    connectedCallback() {
        this.distributeTasks();
    }

    distributeTasks() {
        let curLeftTasks = [];
        let curRightTasks = [];
        this.tasklist.forEach(function(t){
            if(t.category === "wip") {
                curLeftTasks.push(t);
                console.log('curLeftTasks'+JSON.stringify(curLeftTasks));
            } else {
                curRightTasks.push(t);
                console.log('curRightTasks'+JSON.stringify(curRightTasks));
            }
        });

        this.leftTasks = curLeftTasks;
        this.rightTasks = curRightTasks;
    }
}