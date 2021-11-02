//use factories to create list items   
//use date-fns to format dates and times

import { loadBaseListeners } from './event_listeners';
import './style.css'; 
import { displayTasks } from './task_DOM';
import { createDropdown } from './task_DOM';

let taskList = [];
taskList.title = 'taskList';
let categories = ['Home', 'Work', 'Self-Care', 'Pets', 'Kids'];
categories.title = 'categories';
let projects = ['Update kitchen', 'AB anxiety'];
projects.title = 'projects';
let priorities = ['1-High', '2-Medium', '3-Low'];

const content = document.getElementById('content-div');

//local storage - retrieve
(function getListFromStorage() {
    if (localStorage.getItem('taskList')) {
        let storedTasks = JSON.parse(window.localStorage.getItem('taskList'));
        taskList = storedTasks;
        console.table(taskList);
    }
    if (localStorage.getItem('categories')) {
        let storedCats = JSON.parse(window.localStorage.getItem('categories'));
        categories = storedCats;
    }
    if (localStorage.getItem('projects')) {
        let storedProjects = JSON.parse(window.localStorage.getItem('projects'));
        projects = storedProjects;
    }
})()

loadBaseListeners();
displayTasks('status');
createDropdown(categories, 'category-field');
createDropdown(projects, 'project-field');

export {
    taskList,
    content,
    categories,
    priorities,
    projects,
}