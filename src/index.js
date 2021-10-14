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
import { addNewTask } from './create-task';
import { buildPage } from './task-list';

const taskList = [
    {
        name: 'name',
        description: 'description',
        category: 'category',
        due: 'due date',
        priority: 'priority',
        notes: 'notes',
        status: 'status',
    }
];

buildPage();
submitTaskBtn.addEventListener('click', () => addNewTask());

// add check boxes to complete tasks
// event listener on checkboxes to trigger complete-task module

export {
    newTaskForm,
}
