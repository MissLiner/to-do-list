
import { taskList, categories, projects } from "./index.js"; 
import { displayTasks } from "./task_DOM.js";


const newTaskForm = document.getElementById('new-task-form');

//local storage - store

function storeList(item) {
    console.log(item.title);
    window.localStorage.setItem(item.title, JSON.stringify(item));
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
    //taskList.sort();
    storeList(taskList);
}

function addItemToArray(item, arr) {
    arr.push(item);
    arr.sort();
    storeList(arr);
}

function updateTask(trigger, property) {
    taskList.forEach(task => {
        if (trigger.classList.contains(task.index)) {
            task[property] = trigger.value;
            storeList(taskList);
        }
    })
}

// 3. complete-task
//      2. change text and formatting to show it is completed
//      5. if task is already completed, toggle back to active task list
function completeTask(trigger) {
    taskList.forEach(task => {
        if (task.index == trigger.value) {
            task.status = 'Complete';
            storeList(taskList);
        }
    })
}

function deleteTask(value) {
    taskList.forEach(task => {
        if (task.index == value) {
            let a = taskList.findIndex(object => object.index == value);
            taskList.splice(a, 1);
        }
    })
    storeList(taskList);
}

function editCategories() {
    
}

export {
    addNewTaskToList,
    completeTask,
    deleteTask,
    storeList,
    addItemToArray,
    updateTask,
}