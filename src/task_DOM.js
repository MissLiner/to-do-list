import { content , taskList, priorities, categories, projects } from './index.js';
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
            content.appendChild(categoryDiv);
        
            function addCategoryTitle(category) {
                const categoryTitle = document.createElement('h2');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category;
                categoryDiv.appendChild(categoryTitle);
            }

            addCategoryTitle(category);

            function addTasksToCategory(property) {
                for (let i = 0; i < taskList.length; i++) {
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task-div');
                    taskDiv.id = taskList[i].index;

                    const taskBasicDiv = document.createElement('div');
                    taskBasicDiv.classList.add('task-basic-div');

                    const taskDetailDiv = document.createElement('div');
                    taskDetailDiv.value = taskList[i].index;
                    taskDetailDiv.classList.add('task-detail-div');
                    taskDetailDiv.style = 'display:none';
                                        
                    categoryDiv.appendChild(taskDiv);
                    taskDiv.appendChild(taskBasicDiv);
                    taskDiv.appendChild(taskDetailDiv);

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
                            function createSubDiv(key) {
                                let keySubDiv = document.createElement('div');
                                keySubDiv.classList.add('key-detail-subdiv');
                                keySubDiv.textContent = `${key}: `;
                                taskDetailDiv.appendChild(keySubDiv);

                                function createDetailDropDown(categ, arr) {
                                    let subDiv = document.createElement('select');
                                    subDiv.id = categ + i;
                                    subDiv.classList.add('task-detail-dropdown');
                                    taskDetailDiv.appendChild(subDiv);
                                    createDropdown(arr, categ + i, 0);
                                    
                                    Array.from(subDiv.options).forEach(option => {
                                        if (option.value == taskList[i][categ]) {
                                            console.log('hi');
                                            subDiv.selectedIndex = option.index;
                                        }
                                    })
                                }

                                if (key === 'priority') {
                                    createDetailDropDown(key, priorities);
                                }
                                if (key === 'category') {
                                    createDetailDropDown(key, categories);
                                }
                                if (key === 'project') {
                                    createDetailDropDown(key, projects);
                                }
                                else {
                                    let subDiv = document.createElement('div');
                                    subDiv.classList.add('task-detail-subdiv');
                                    subDiv.contentEditable = 'true';
                                    subDiv.textContent = taskList[i][key];
                                    taskDetailDiv.appendChild(subDiv);
                                }
                            }
                        
                            createSubDiv('description');
                            createSubDiv('category');
                            createSubDiv('priority');
                            createSubDiv('project');
                            createSubDiv('notes');
                        }

                        createCheckbox();
                        createTaskSubDiv('name');
                        createTaskSubDiv('duedate');
                        createTaskSubDiv('category');
                        createExpandBtn();
                        createDeleteBtn();

                        createDetails(taskList[i]);

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

function createDropdown(arr, elementID, ignoreNum) {
    const mainField = document.getElementById(elementID);
    (function clearDropdown() {
        if (mainField.childElementCount) {
        while (mainField.childElementCount > ignoreNum) {
            mainField.removeChild(mainField.lastChild);
        } 
        }
    })()
    const options = ['None', 'Add new'];
    function createOptions(arr) {
        arr.forEach(item => {
            const option = document.createElement('option');
            option.class = 'dropdown-item';
            option.value = item;
            option.textContent = item;
            mainField.appendChild(option);
        })
    }
        createOptions(options);
        createOptions(arr);
}

export {
    displayTasks,
    createDropdown,
}