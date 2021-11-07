
import { taskList, categories, projects } from "./index.js"; 
import compareAsc from 'date-fns/compareAsc';
import parseISO from 'date-fns/parseISO';


const newTaskForm = document.getElementById('new-task-form');

//local storage - store

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
            task.statuses = 'Complete';
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

//get taskList
//sort alphabetically
//sort by date
    //get date for each task
//sort by priority
//re-display tasks

function sortList(trigger) {
    switch(trigger.dataset.index) {
        case 'byalpha':
            taskList.sort();
            break;
        case 'bydate':
            for (let i = 0; i < taskList[i].length; i++) {
                let date1 = new Date(parseISO(taskList[i].duedate));
                let date2 = new Date(parseISO(taskList[i+1].duedate));
                taskList.sort(compareAsc(date1, date2));
            }
            break;
        case 'bypriority':
            break;
    }
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