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
                        if (document.getElementById('view-completed-btn').textContent == 'Show Completed Tasks') {
                            taskDiv.classList.add('hidden');
                        }
                    }
                    //taskDiv.id = taskList[i].index;

                    const taskBasicDiv = document.createElement('div');
                    taskBasicDiv.classList.add('task-basic-div', taskNumber);

                    const taskDetailDiv = document.createElement('div');
                    //taskDetailDiv.value = taskList[i].index;
                    taskDetailDiv.classList.add('task-detail-div', taskNumber);
                                        
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
                            taskSubDiv.setAttribute('data-property', key);
                            taskSubDiv.classList.add('task-subdiv', `task-${key}`, taskNumber);
                            if (key === 'duedate') {
                                const editDateDiv = document.createElement('input');
                                editDateDiv.type = 'date';
                                editDateDiv.value = taskList[i].duedate;
                                editDateDiv.setAttribute('data-property', key);
                                editDateDiv.classList.add('task-subdiv', 'edit-date-div', taskNumber, 'hidden');
                                taskBasicDiv.appendChild(editDateDiv);

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
                                keySubDiv.setAttribute('data-property', key);
                                keySubDiv.classList.add('task-subdiv', 'task-detail-child', `${key}-label`, taskNumber, 'hidden');
                                keySubDiv.textContent = `${key}: `;
                                taskDetailDiv.appendChild(keySubDiv);

                                function createDetailDropDown(categ, arr) {
                                    let subDiv = document.createElement('select');
                                    subDiv.id = arr.title + i;
                                    subDiv.value = taskNumber;
                                    subDiv.setAttribute('data-property', key);
                                    subDiv.classList.add('task-subdiv', `task-${categ}-select`, 'task-detail-child', taskNumber, 'hidden');
                                    taskDetailDiv.appendChild(subDiv);
                                    createDropdown(arr, arr.title + i);
                                    
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
                                    subDiv.setAttribute('data-property', key);
                                    subDiv.classList.add('task-subdiv', 'task-detail-child', `task-${key}-input`, taskNumber, 'hidden');
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
        // let currentIndex;
        // taskList.forEach((task, i) => {
        //     if (i == elementID.match(/(\d+)/)) {
        //         currentIndex = i;
        //     }
        // })
        // mainField.selectedIndex = taskList[currentIndex];
}

export {
    displayTasks,
    createDropdown,
}