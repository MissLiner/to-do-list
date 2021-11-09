//use factories to create list items   
//use date-fns to format dates and times

import { loadBaseListeners } from './event_listeners';
import './style.css'; 
import './caleandar_theme3.css';
// import './caleandar_theme2.css';
// import './caleandar_theme3.css';
import { displayTasks } from './task_DOM';
import { createDropdown } from './task_DOM';
import borderRef from './form_border_1.svg';

//refactor so that viewoptions.value is contained in displayTasks
//figure out what to do about sortTaskList being in index.js
//format circle buttons
//add content to help menu
//adjust colors
//add media queries / make more responsive
//allow users to change order of edit lists
//refactor to use less passing variables between modules
//get select menus to land on new item after adding
//have categories disappear when no items are in them
//add navigation into specific categories
//style new task form and task edit form
//make sure 'add new' isn't saved to the task
//add edit links to calendar to edit tasks form there
//use onblur to close menus when clicking elsewhere QUICK

(function addFormBorder() {
    const borderDiv = document.getElementById('border-div');
    const border = new Image();

    border.src = borderRef;
    border.id = 'border';
    borderDiv.appendChild(border);
})()

let taskList = [];
taskList.title = 'taskList';

function sortTaskList(trigger) {
    switch(trigger.dataset.index) {
        case 'byalpha':
            taskList.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'bydate-earliest':
            taskList.sort((a, b) => b.duedate.localeCompare(a.duedate));
            break;
        case 'bydate-latest':
            taskList.sort((a, b) => a.duedate.localeCompare(b.duedate));
            break;
        case 'bypriority':
            taskList.sort((a, b) => a.priorities.localeCompare(b.priorities));
            break;
    }
}
let categories = ['Home', 'Work', 'Self-Care', 'Pets', 'Kids'];
categories.title = 'categories';
let projects = ['Update kitchen', 'AB anxiety'];
projects.title = 'projects';
let priorities = ['1: High', '2: Medium', '3: Low'];
priorities.title = 'priorities';
let statuses = ['Active', 'Complete'];
statuses.title = 'statuses';

const content = document.getElementById('content-div');

//local storage - retrieve
(function getListFromStorage() {
    if (localStorage.getItem('taskList')) {
        let storedTasks = JSON.parse(window.localStorage.getItem('taskList'));
        taskList = storedTasks;
        taskList.title = 'taskList';
        console.table(taskList);
    }
    if (localStorage.getItem('categories')) {
        let storedCats = JSON.parse(window.localStorage.getItem('categories'));
        categories = storedCats;
        categories.title = 'categories';
    }
    if (localStorage.getItem('projects')) {
        let storedProjects = JSON.parse(window.localStorage.getItem('projects'));
        projects = storedProjects;
        projects.title = 'projects';
    }
})()

loadBaseListeners();
displayTasks('statuses');
createDropdown(categories, 'category-select');
createDropdown(projects, 'project-select');

(function setDate() {
    const newTaskDate = document.getElementById('duedate-select');
    const today = new Date();
    let DD = today.getDate();
    let MM = today.getMonth() + 1;

    if (DD <10) {
        DD = '0' + DD;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    newTaskDate.defaultValue = today.getFullYear() + '-' + MM + '-' + DD;
})()

export {
    taskList,
    content,
    categories,
    priorities,
    projects,
    statuses,
    sortTaskList,
}