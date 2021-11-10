
import { taskList, categories, projects } from "./index.js"; 

const newTaskForm = document.getElementById('new-task-form');

function storeList(item) {
    window.localStorage.setItem(item.title, JSON.stringify(item));
}

function addNewTaskToList() {
    let newTask = {};
    let taskFormData = new FormData(newTaskForm);
    for (let key of taskFormData.keys()) {
        console.log(key);
        newTask[key] = taskFormData.get(key);
    }
    newTask.index = Date.now();
    newTask.statuses = 'Active';
    taskList.unshift(newTask);
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
            return;
        }
        storeList(taskList);
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
function toggleComplete(trigger) {
    taskList.forEach(task => {
        if (trigger.dataset.index == task.index) {
            if (task.statuses == 'Active') {
                task.statuses = 'Complete';
            }
            else {
                task.statuses = 'Active';
            }
            storeList(taskList);
        }
    })
    const subDivs = document.querySelectorAll('.task-subdiv');

    subDivs.forEach(div => {
        if (div.dataset.index == trigger.dataset.index) {
            div.classList.add('completed');
        }
    })
}

function deleteFromArr(value, arr) {
    arr.forEach(item => {
        if (item.index == value) {
            let a = arr.findIndex(object => object.index == value);
            arr.splice(a, 1);
        }
        else if (item == value) {
            let a = arr.findIndex(object => object == value);
            arr.splice(a, 1);
        }
    })
    storeList(arr);
}

export {
    addNewTaskToList,
    toggleComplete,
    deleteFromArr,
    storeList,
    addItemToArr,
    removeItemFromArr,
    updateTask,
    updateList,
}