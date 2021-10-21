import { content , taskList } from './index.js';


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
                taskCheckbox.classList.add('task-checkbox');
                taskCheckbox.value = taskList[i].index;
                taskDiv.appendChild(taskCheckbox);

                function createTaskSubDiv(key) {
                    let taskSubDiv = document.createElement('div');
                    taskSubDiv.classList.add('task-sub-div');
                    taskSubDiv.textContent = taskList[i][key];
                    taskDiv.appendChild(taskSubDiv);
                }

                createTaskSubDiv('name');
                createTaskSubDiv('duedate');
                createTaskSubDiv('category');

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

export {
    displayTasks
}