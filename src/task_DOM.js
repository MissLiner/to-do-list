import { content , taskList, priorities, categories, projects } from './index.js';
import { loadTaskListeners } from './event_listeners';
import  formatRelative  from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';

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
                if (category == 'Complete') {
                    categoryTitle.classList.add('complete');
                }
                categoryTitle.textContent = category;
                categoryDiv.appendChild(categoryTitle);
            }

            addCategoryTitle(category);

            function addTasksToCategory(property) {
                for (let i = 0; i < taskList.length; i++) {
                    const taskNumber = taskList[i].index;
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task-div', taskNumber);
                    if (taskList[i]['status'] == 'Complete') {
                        taskDiv.classList.add('complete');
                    }
                    //taskDiv.id = taskList[i].index;

                    const taskBasicDiv = document.createElement('div');
                    taskBasicDiv.classList.add('task-basic-div', taskNumber);

                    const taskDetailDiv = document.createElement('div');
                    //taskDetailDiv.value = taskList[i].index;
                    taskDetailDiv.classList.add('task-detail-div', taskNumber);
                    taskDetailDiv.style = 'display:none !important';
                                        
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
                            //taskSubDiv.id = `task-${key}`;
                            taskSubDiv.classList.add('task-subdiv', `task-${key}`);
                            //taskSubDiv.contentEditable = 'true';
                            if (key === 'duedate' && taskList[i].duedate) {
                                let currentDay = new Date();
                                let dateDue = new Date(parseISO(taskList[i].duedate))
                                let output = formatRelative(dateDue, currentDay);
                                taskSubDiv.textContent = output.slice(0, -12);
                            }
                            else {
                                taskSubDiv.textContent = taskList[i][key];
                            }
                            
                            taskBasicDiv.appendChild(taskSubDiv);
                        }
                        function createExpandBtn() {
                            const expandBtn = document.createElement('button');
                            expandBtn.classList.add('expand-btn');
                            expandBtn.value = taskNumber;
                            expandBtn.title = 'Expand';
                            expandBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-angle-down"></i>');
                            taskBasicDiv.appendChild(expandBtn);
                        }
                        function createDeleteBtn() {
                            const deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-btn');
                            deleteBtn.value = taskNumber;
                            deleteBtn.title = 'Delete';
                            deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt"></i>' );
                            taskBasicDiv.appendChild(deleteBtn);
                        }
                        function createDetails() {
                            function createSubDiv(key) {
                                let keySubDiv = document.createElement('div');
                                keySubDiv.id = key;
                                keySubDiv.classList.add('key-detail-subdiv', 'task-detail-child', `${key}-label`);
                                keySubDiv.textContent = `${key}: `;
                                taskDetailDiv.appendChild(keySubDiv);

                                function createDetailDropDown(categ, arr) {
                                    let subDiv = document.createElement('select');
                                    subDiv.id = categ + i;
                                    subDiv.value = taskNumber;
                                    subDiv.classList.add('task-detail-dropdown', `task-${categ}-select`, 'task-detail-child');
                                    taskDetailDiv.appendChild(subDiv);
                                    createDropdown(arr, categ + i);
                                    
                                    Array.from(subDiv.options).forEach(option => {
                                        if (option.value == taskList[i][categ]) {
                                            subDiv.selectedIndex = option.index;
                                        }
                                    })
                                }

                                if (key === 'priority') {
                                    createDetailDropDown(key, priorities);
                                    return;
                                }
                                if (key === 'category') {
                                    createDetailDropDown(key, categories);
                                    return;
                                }
                                if (key === 'project') {
                                    createDetailDropDown(key, projects);
                                    return;
                                }
                                else {
                                    let subDiv = document.createElement('div');
                                    subDiv.classList.add('task-detail-subdiv', 'task-detail-child', `task-${key}-input`);
                                    subDiv.contentEditable = 'true';
                                    subDiv.textContent = 'hello' + taskList[i][key];
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

function createDropdown(arr, elementID) {
    const mainField = document.getElementById(elementID);
    (function clearDropdown() {
        while (mainField.firstChild) {
            mainField.removeChild(mainField.firstChild);
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