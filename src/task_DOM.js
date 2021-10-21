import { content , taskList } from './index.js';


function displayActiveTasks() {
    (function clearTaskDisplay() {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        } 
    })()

    if (taskList) {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].status === 'active') {
                function createCheckbox() {
                    const taskCheckbox = document.createElement('input');
                    taskCheckbox.type = 'checkbox';
                    taskCheckbox.classList.add('task-checkbox');
                    taskCheckbox.value = taskList[i].index;
                    taskDiv.appendChild(taskCheckbox);
                }
                function createTaskSubDiv(key) {
                    let taskSubDiv = document.createElement('div');
                    taskSubDiv.classList.add('task-sub-div');
                    taskSubDiv.textContent = taskList[i][key];
                    taskDiv.appendChild(taskSubDiv);
                }
                function createDeleteBtn() {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.value = taskList[i].index;
                    deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt"></i>' );
                    taskDiv.appendChild(deleteBtn);
                }

                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task-div');

                createCheckbox();
                createTaskSubDiv('name');
                createTaskSubDiv('duedate');
                createTaskSubDiv('category');
                createDeleteBtn();

                switch(taskList[i].priority) {
                    case '1':
                        taskDiv.style.color = 'red';
                        break;
                    case '2':
                        taskDiv.style.color = 'orange';
                        break;
                    case '3':
                        taskDiv.style.color = 'green';
                        break;
                    case '4':
                        taskDiv.style.color = 'blue';
                }

                content.appendChild(taskDiv);
                console.table(taskList);
            }
        }
    }
}

export {
    displayActiveTasks
}