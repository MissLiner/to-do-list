//use factories to create list items   
//use date-fns to format dates and times

import { loadBaseListeners } from './event_listeners';
import './style.css'; 
import { displayTasks } from './task_DOM';
import { createDropdown } from './task_DOM';

//refactor so that viewoptions.value is contained in displayTasks

let taskList = [];
taskList.title = 'taskList';

function sortTaskList(trigger) {
    switch(trigger.dataset.index) {
        case 'byalpha':
            taskList.sort((a, b) => a.name.localeCompare(b.name));
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
let categories = ['Home', 'Work', 'Self-Care', 'Pets', 'Kids'];
categories.title = 'categories';
let projects = ['Update kitchen', 'AB anxiety'];
projects.title = 'projects';
let priorities = ['1-High', '2-Medium', '3-Low'];
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