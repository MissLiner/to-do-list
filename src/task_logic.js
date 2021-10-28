
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
function changeTaskStatus(trigger, newStatus) {
    taskList.forEach(task => {
        if (task.index == trigger.value) {
            task.status = newStatus;
        }
    })
    storeLists()
}

function completeTask(elem) {
    changeTaskStatus(elem, 'Complete');
    storeLists();
    displayTasks(viewMenu.value);
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

export {
    addNewTaskToList,
    completeTask,
    deleteTask,
    storeLists,
    addItemToArray,
}