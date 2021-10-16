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

import { taskList } from "./index.js"; 

const newTaskForm = document.getElementById('new-task-form');

function addNewTaskObjectToList() {
    let newTask = {};
    let taskFormData = new FormData(newTaskForm);
    for (let key of taskFormData.keys()) {
        newTask[key] = taskFormData.get(key);
    }
    taskList.unshift(newTask);
}



export {
    addNewTaskObjectToList,
}