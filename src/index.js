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

// 2. create-task
//      -POP-UP window form
//      -active task array to hold tasks
//      1. assign or create category
//      2. enter name & description
//      3. assign due date
//      4. choose priority level
//      5. add notes
//      6. add completion status
//      7. add new task to screen
//      8. hide create-task pop-up window
// 3. complete-task
//      1. change task status to completed
//      2. change text and formatting to show it is completed
//      3. create completed task list 
//      4. remove completed task from active task list
//      5. if task is already completed, toggle back to active task list
// 4. Assign priority

import './style.css';

const content = document.getElementById('content-div');

//App title
const title = document.createElement('h1');
title.id = 'title-div';
title.textContent = 'Can-Do List';
content.appendChild(title);

//Button to add new task
const addTaskBtn = document.createElement('button');
addTaskBtn.id = 'add-task-btn';
addTaskBtn.textContent = 'Add Task';
content.appendChild('addTaskBtn');

//          a. event listener to trigger add-task module
//        -default category title (click to edit?)
//        -task
//          -name
//          -description
//          -category?
//          -due date
//          -priority
//          -notes
//          -checkbox
//      3. Hidden add-task pop-up
//          -name
//          -description
//          -category?
//          -due date
//          -priority
//          -notes
//      4. event listener on checkboxes to trigger complete-task module

