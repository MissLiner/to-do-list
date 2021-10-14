//use factories to create list items
//create separate lists by category/project (defaut on first entry)
// - users can create new projects, choose which project to assign a task to    
//properties for each item -title, description, dueDate, priority. You might also want to include notes or even a checklist.)
//use local storage to save projects and tasks between sessions
//use date-fns to format dates and times

//UI:
// 1. view all projects
// 2. view to-dos in each project (title, due date, color code for priority)
// 3. expand single task to view and edit details
// 4. delete task

//MODULES:


// 3. complete-task
//      1. change task status to completed
//      2. change text and formatting to show it is completed
//      3. create completed task list 
//      4. remove completed task from active task list
//      5. if task is already completed, toggle back to active task list
// 4. Assign priority

import './style.css'; 

const content = document.getElementById('content-div');

//title
const title = document.createElement('h1');
title.id = 'title-div';
title.textContent = 'Can-Do List';
content.appendChild(title);

//default category
const category1 = document.createElement('h2');
category1.classList.add('category-name');
category1.textContent = 'Main List';
content.appendChild(category1);

//new-task-btn
const addTaskBtn = document.createElement('button');
addTaskBtn.id = 'add-task-btn';
addTaskBtn.textContent = 'Add Task';
content.appendChild(addTaskBtn);
addTaskBtn.addEventListener('click', () => console.log('add task'));

//new task pop-up
const newTaskForm = document.createElement('form');
newTaskForm.id = 'new-task-form';
content.appendChild(newTaskForm);
const nameField = document.createElement('input');
nameField.id = 'name-field';
newTaskForm.appendChild(nameField);
const descField = document.createElement('input');
descField.id = 'desc-field';
newTaskForm.appendChild(descField);
const categoryField = document.createElement('input');
categoryField.id = 'category-field';
newTaskForm.appendChild(categoryField);
//add dropdown datalist to category later
const dueDateField = document.createElement('input');
dueDateField.id = 'due-date-field';
dueDateField.type = 'date';
newTaskForm.appendChild(dueDateField);
const priorityField = document.createElement('select');
priorityField.id = 'priority-field';
newTaskForm.appendChild(priorityField);
const priorityLabel = document.createElement('label');
priorityLabel.id = 'priority-label';
priorityLabel.htmlFor = 'priority-field';
newTaskForm.appendChild(priorityLabel);
const notesField = document.createElement('input');
notesField.id = 'notes-field';
newTaskForm.appendChild(notesField);
const submitTaskBtn = document.createElement('input');
submitTaskBtn.id = 'submit-task-btn';
submitTaskBtn.type = 'button'; 
submitTaskBtn.value = 'Submit';
newTaskForm.appendChild(submitTaskBtn);
submitTaskBtn.addEventListener('click', () => console.log('submitted task'));

//        -task
//          -name
//          -description
//          -category?
//          -due date
//          -priority
//          -notes
//          -checkbox
//      4. event listener on checkboxes to trigger complete-task module

