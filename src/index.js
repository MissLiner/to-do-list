//use factories to create list items
//create separate lists by category/project (defaut on first entry)
// - users can create new projects, choose which project to assign a task to    
//use date-fns to format dates and times

//UI:
// 1. view all projects
// 2. view to-dos in each project (title, due date, color code for priority)
// 3. expand single task to view and edit details
// 4. delete task

// 4. Assign priority

import { loadBaseListeners } from './event_listeners';
import './style.css'; 
//import { addNewTaskToList, changeTaskStatus } from './task_logic';
import { displayTasks } from './task_DOM'
//import { taskList } from './task_logic'
//import { loadEventListeners } from './event_listeners';

let taskList = [];
const content = document.getElementById('content-div');

//local storage - retrieve
(function getListFromStorage() {
    if (localStorage.getItem('taskList')) {
        let storedList = JSON.parse(window.localStorage.getItem('taskList'));
        taskList = storedList;
        console.table(taskList);
    }
})()

loadBaseListeners();
displayTasks('status');

export {
    taskList,
    content
}

//default category (should I move to HTML?)
// const category1 = document.createElement('h2');
// category1.classList.add('category-name');
// category1.textContent = 'Main List';
// content.prepend(category1);

//title
// const title = document.createElement('h1');
// title.id = 'title-div';
// title.textContent = 'Can-Do List';
// content.appendChild(title);
//new-task-btn
// const addTaskBtn = document.createElement('button');
// addTaskBtn.id = 'add-task-btn';
// addTaskBtn.textContent = 'Add Task';
// content.appendChild(addTaskBtn);
//new task pop-up
// const newTaskForm = document.createElement('form');
// newTaskForm.id = 'new-task-form';
// content.appendChild(newTaskForm);
// const nameField = document.createElement('input');
// addTaskField(nameField);
// nameField.name = 'name';
// newTaskForm.appendChild(nameField);
// const descField = document.createElement('input');
// descField.name = 'description';
// newTaskForm.appendChild(descField);
// const categoryField = document.createElement('input');
// categoryField.name = 'category';
// newTaskForm.appendChild(categoryField);
// //add dropdown datalist to category later
// const dueDateField = document.createElement('input');
// dueDateField.name = 'duedate';
// dueDateField.type = 'date';
// newTaskForm.appendChild(dueDateField);
// const priorityField = document.createElement('select');
// priorityField.name = 'priority';
// newTaskForm.appendChild(priorityField);
// const priorityLabel = document.createElement('label');
// priorityLabel.id = 'priority-label';
// priorityLabel.htmlFor = 'priority-field';
// newTaskForm.appendChild(priorityLabel);
// const notesField = document.createElement('input');
// notesField.name = 'notes';
// newTaskForm.appendChild(notesField);
// const submitTaskBtn = document.createElement('input');
// submitTaskBtn.id = 'submit-task-btn';
// submitTaskBtn.type = 'button'; 
// submitTaskBtn.value = 'Submit';
// newTaskForm.appendChild(submitTaskBtn);