import { content , taskList } from './index.js';
import { loadTaskListeners } from './event_listeners';


function displayTasks(property) {
    (function clearTaskDisplay() {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        } 
    })()

    if (taskList) {
        function createCategoryDiv(category) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-div');
        
            function addCategoryTitle(category) {
                const categoryTitle = document.createElement('h2');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category;
                categoryDiv.appendChild(categoryTitle);
            } 
            addCategoryTitle(category);

            function addTasksToCategory(property) {
                for (let i = 0; i < taskList.length; i++) {
                    if (taskList[i][property] === category) {
                        function createCheckbox() {
                            const taskCheckbox = document.createElement('input');
                            taskCheckbox.type = 'checkbox';
                            taskCheckbox.classList.add('task-checkbox');
                            taskCheckbox.value = taskList[i].index;
                            taskCheckbox.title = 'Complete';
                            taskBasicDiv.appendChild(taskCheckbox);
                        }
                        function createTaskSubDiv(key) {
                            let taskSubDiv = document.createElement('div');
                            taskSubDiv.classList.add('task-subdiv');
                            taskSubDiv.textContent = taskList[i][key];
                            taskBasicDiv.appendChild(taskSubDiv);
                        }
                        function createExpandBtn() {
                            const expandBtn = document.createElement('button');
                            expandBtn.classList.add('expand-btn');
                            expandBtn.value = taskList[i].index;
                            expandBtn.title = 'Expand';
                            expandBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-angle-down"></i>');
                            taskBasicDiv.appendChild(expandBtn);
                        }
                        function createDeleteBtn() {
                            const deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-btn');
                            deleteBtn.value = taskList[i].index;
                            deleteBtn.title = 'Delete';
                            deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt"></i>' );
                            taskBasicDiv.appendChild(deleteBtn);
                        }
                        function createDetails() {
                            const taskDetailDiv = document.createElement('div');
                            taskDetailDiv.classList.add('task-detail-div', 'hidden');
                        
                            function createSubDiv(key) {
                                let subDiv = document.createElement('div');
                                subDiv.classList.add('task-detail-subdiv');
                                subDiv.textContent = key + ': ' + taskList[i][key];
                                taskDetailDiv.appendChild(subDiv);
                            }
                        
                            createSubDiv('description');
                            createSubDiv('category');
                            createSubDiv('priority');
                            createSubDiv('project');
                            createSubDiv('notes');
                            taskDiv.appendChild(taskDetailDiv);
                        }

                        const taskDiv = document.createElement('div');
                        const taskBasicDiv = document.createElement('div');

                        taskDiv.classList.add('task-div');
                        taskDiv.id = taskList[i].index;

                        taskBasicDiv.classList.add('task-basic-div');

                        createCheckbox();
                        createTaskSubDiv('name');
                        createTaskSubDiv('duedate');
                        createTaskSubDiv('category');
                        createExpandBtn();
                        createDeleteBtn();
                        taskDiv.appendChild(taskBasicDiv);
                        createDetails(taskList[i]);
                        categoryDiv.appendChild(taskDiv);

                        if (taskList[i].status === 'Active') {
                            switch(taskList[i].priority) {
                                case '1-High':
                                    taskDiv.style.color = 'red';
                                    break;
                                case '2-Medium':
                                    taskDiv.style.color = 'orange';
                                    break;
                                case '3-Low':
                                    taskDiv.style.color = 'green';
                                    break;
                            }
                        }
                    }
                }
            }

            addTasksToCategory(property);
            content.appendChild(categoryDiv);
        }
        //create category lists for different views
        let propertyValues = [];

        function getUniqueValues(arr, prop) {
            const allValues = [];
            for (let i = 0; i < arr.length; i++) {
                allValues.push(arr[i][prop]);
            }
            propertyValues = [...new Set(allValues)];
            propertyValues = propertyValues.sort();
        }
        getUniqueValues(taskList, property);

        propertyValues.forEach(value => createCategoryDiv(value));
    }
    loadTaskListeners();
}



function createDropdown(arr, elementID) {
    const mainField = document.getElementById(elementID);
    (function clearDropdown() {
        while (mainField.childElementCount > 2) {
            mainField.removeChild(mainField.lastChild);
        } 
    })()

    arr.forEach(item => {
        const option = document.createElement('option');
        option.class = 'dropdown-item';
        option.value = item;
        option.textContent = item;
        mainField.appendChild(option);

    })
}



export {
    displayTasks,
    createDropdown,
}