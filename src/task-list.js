//        -task
//          -name
//          -description
//          -category?
//          -due date
//          -priority
//          -notes
//          -checkbox

// const taskList = [
//     {
//         name: 'name',
//         description: 'description',
//         category: 'category',
//         due: 'due date',
//         priority: 'priority',
//         notes: 'notes',
//         status: 'status',
//     }
// ];

// export {
//     taskList,
// }

function buildPage() {

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

}
export {
    buildPage,
}