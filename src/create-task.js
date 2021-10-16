// 2. create-task
//      -POP-UP window form
//      -active task array to hold tasks
//      1. assign or create category
//      2. enter name & description
//      3. assign due date
//      4. choose priority level
//      5. add notes
//      6. add completion status
//      7. add new task to screen
//      8. hide create-task pop-up window

//        -task
//          -name
//          -description
//          -category?
//          -due date
//          -priority
//          -notes
//          -checkbox

import { taskList } from "./task-list"; 
//import { newTaskForm } from "./task-list.js";

function addNewTask() {
    const taskList1 = [];
    let taskForm = document.getElementById('new-task-form');
    let newTask = new FormData(taskForm);
    taskList1.unshift(newTask);
    console.log(taskList1);
}

export {
    addNewTask, 
}