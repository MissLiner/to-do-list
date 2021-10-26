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

import { taskList, categories, projects } from "./index.js"; 


const newTaskForm = document.getElementById('new-task-form');

//local storage - store
function storeLists() {
    window.localStorage.clear();
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    window.localStorage.setItem('categories', JSON.stringify(categories));
    window.localStorage.setItem('projects', JSON.stringify(projects));
}

function addNewTaskToList() {
    let newTask = {};
    let taskFormData = new FormData(newTaskForm);
    for (let key of taskFormData.keys()) {
        newTask[key] = taskFormData.get(key);
    }
    newTask.index = Date.now();
    newTask.status = 'Active';
    taskList.unshift(newTask);
    storeLists()
    newTaskForm.reset();
}

function changeTaskStatus(trigger, newStatus) {
    taskList.forEach(task => {
        if (task.index == trigger.value) {
            task.status = newStatus;
        }
    })
    storeLists()
}

function deleteTask(value) {
    taskList.forEach(task => {
        if (task.index == value) {
            let a = taskList.findIndex(object => object.index === value.index);
            taskList.splice(a, 1);
        }
    })
    storeLists()
}

function addItemToArray(item, arr) {
    arr.push(item);
    arr.sort();
    storeLists();
}



// 3. complete-task
//      1. change task status to completed
//      2. change text and formatting to show it is completed
//      3. create completed task list 
//      4. remove completed task from active task list
//      5. if task is already completed, toggle back to active task list
function completeTask() {
    taskList
}


export {
    addNewTaskToList,
    changeTaskStatus,
    deleteTask,
    storeLists,
    addItemToArray,
}