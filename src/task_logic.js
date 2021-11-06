
import { taskList, categories, projects } from "./index.js"; 
import { displayTasks } from "./task_DOM.js";


const newTaskForm = document.getElementById('new-task-form');

//local storage - store

function storeList(item) {
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

function addItemToArr(item, arr) {
    arr.push(item);
    arr.sort();
    storeList(arr);
}

function removeItemFromArr(item, arr) {
    arr.forEach(value => {
        if (value == item) {
            let a = arr.findIndex(object => object == value)
            arr.splice(a, 1);
        }
    })
    storeList(arr);
}

function updateTask(trigger, property) {
    taskList.forEach(task => {
        if (trigger.dataset.index == task.index) {
            task[property] = trigger.value;
            storeList(taskList);
        }
    })
}

function updateList(trigger, arr) {
    arr.forEach(item => {
        if (item == trigger.dataset.index) {
            arr.splice(item.indexOf, 1, trigger.value);
        }
        trigger.dataset.index = trigger.value;
        storeList(arr);
    })
}
function completeTask(trigger) {
    taskList.forEach(task => {
        if (trigger.dataset.index == task.index) {
            task.status = 'Complete';
            storeList(taskList);
        }
    })
}

function deleteFromArr(value, arr) {
    arr.forEach(item => {
        if (item.index == value || item == value) {
            let a = arr.findIndex(object => object == value);
            arr.splice(a, 1);
        }
    })
    storeList(arr);
}

export {
    addNewTaskToList,
    completeTask,
    deleteFromArr,
    storeList,
    addItemToArr,
    removeItemFromArr,
    updateTask,
    updateList,
}