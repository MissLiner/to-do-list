import { content , taskList } from './index.js';



function displayActiveTasks() {
    if (taskList) {
    (function clearTaskDisplay() {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        } 
    })()

    function createCategoryDiv(property, category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add = 'category-div';
    
        function addCategoryTitle(text) {
            const categoryTitle = document.createElement('h2');
            categoryTitle.classList.add = 'category-title';
            categoryTitle.textContent = text;
            categoryDiv.appendChild(categoryTitle);
        }
        addCategoryTitle(category);

        function addTasksToCategory(property, category) {
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i][property] === category) {
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

                    if (category === 'active') {
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
                    }

                    categoryDiv.appendChild(taskDiv);
                    console.table(taskList);
                }
            }
        }
        addTasksToCategory(status, category);
    }
}}


export {
    displayActiveTasks
}