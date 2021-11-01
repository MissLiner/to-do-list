
import { taskList, categories, projects } from "./index.js"; 
import { displayTasks } from "./task_DOM.js";


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
    //taskList.sort();
    storeLists()
    newTaskForm.reset();
}

function addItemToArray(item, arr) {
    arr.push(item);
    arr.sort();
    storeLists();
}

// 3. complete-task
//      2. change text and formatting to show it is completed
//      5. if task is already completed, toggle back to active task list
function completeTask(trigger) {
    taskList.forEach(task => {
        if (task.index == trigger.value) {
            task.status = 'Complete';
        }
    })
    //storeLists()
}

// function completeTask(trigger) {
//     changeTaskStatus(trigger, 'Complete');
//     storeLists();
//     displayTasks(document.getElementById('view-menu').value);
// }

function deleteTask(value) {
    taskList.forEach(task => {
        if (task.index == value) {
            let a = taskList.findIndex(object => object.index == value);
            taskList.splice(a, 1);
        }
    })
}

export {
    addNewTaskToList,
    completeTask,
    deleteTask,
    storeLists,
    addItemToArray,
}