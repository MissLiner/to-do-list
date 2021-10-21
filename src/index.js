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

import './style.css'; 
import { addNewTaskToList, changeTaskStatus } from './task_logic';
import { displayActiveTasks } from './task_DOM'

let taskList = [];

const content = document.getElementById('content-div');
const newTaskBtn = document.getElementById('new-task-btn');
const clearStorageBtn = document.getElementById('clear-storage-btn');
const newTaskForm = document.getElementById('new-task-form');

//local storage - retrieve
(function getListFromStorage() {
    if (localStorage.getItem('taskList')) {
        let storedList = JSON.parse(window.localStorage.getItem('taskList'));
        taskList = storedList;
    }
})()

//local storage - store
function storeTaskList() {
    window.localStorage.clear();
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
}

//local storage - clear
clearStorageBtn.addEventListener('click', () => {
    localStorage.clear();
})

//display - tasks
displayActiveTasks('status');

//display - new task form
newTaskBtn.addEventListener('click', () => {
    newTaskForm.classList.remove('hidden');
});

//task listener - add new task
newTaskForm.addEventListener('submit', () => {
    event.preventDefault();
    newTaskForm.classList.add('hidden');

    addNewTaskToList();
    storeTaskList();
    displayActiveTasks('status');
})

//task listener - delete task
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
        changeTaskStatus(button, 'deleted');
        storeTaskList();
        displayActiveTasks('status');
    })
})

//task listener - complete task
document.querySelectorAll('.task-checkbox').forEach((box) => {
    box.addEventListener('change', () => {
        changeTaskStatus(box, 'complete');
        storeTaskList();
        displayActiveTasks('status');
    })
})

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