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
import { addNewTaskObjectToList } from './create-task';

let taskList = [];

const content = document.getElementById('content-div');
const newTaskBtn = document.getElementById('new-task-btn');
const submitTaskBtn = document.getElementById('submit-task-btn');
const clearStorageBtn = document.getElementById('clear-storage-btn');

(function getListFromStorage() {
    if (localStorage.getItem('taskList')) {
        let storedList = JSON.parse(window.localStorage.getItem('taskList'));
        taskList = storedList;
    }
})()

//display list
function displayTasks() {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    } 
    if (taskList) {
        console.log(taskList);
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].status === 'active') {
                let taskDiv = document.createElement('div');
                taskDiv.classList.add('task-div');
                let taskCheckbox = document.createElement('input');
                taskCheckbox.type = 'checkbox';
                taskDiv.appendChild(taskCheckbox);

                for (let key in taskList[i]) {
                    let taskSubDiv = document.createElement('div');
                    taskSubDiv.classList.add('task-sub-div');
                    taskSubDiv.textContent = taskList[i][key];
                    taskDiv.appendChild(taskSubDiv);
                }
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.value = taskList[i].index;
                deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt"></i>' );
                taskDiv.appendChild(deleteBtn);
                content.appendChild(taskDiv);
            }
        }
    }
}
displayTasks();

newTaskBtn.addEventListener('click', () => {
    newTaskForm.classList.remove('hidden');
});

const newTaskForm = document.getElementById('new-task-form');
newTaskForm.addEventListener('submit', () => {
    event.preventDefault();
    addNewTaskObjectToList();
    newTaskForm.classList.add('hidden');
    console.log(taskList);
    displayTasks();
})

//delete task
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
        taskList.forEach(task => {
            if (task.index == button.value) {
                task.status = 'deleted';
            }
        })
        displayTasks();
    })
})

//store task list
document.addEventListener('click', () => {
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
})

//clear local storage
clearStorageBtn.addEventListener('click', () => {
    localStorage.clear();
})

// add check boxes to complete tasks
// event listener on checkboxes to trigger complete-task module

export {
    taskList,
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