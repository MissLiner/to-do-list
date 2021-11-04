import { content , taskList, priorities, categories, projects, statuses } from './index.js';
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
                    if (taskList[i][property] == category) {
                    const taskNumber = taskList[i].index;
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task-div');
                    taskDiv.setAttribute('data-index', taskNumber);;
                    if (taskList[i]['status'] == 'Complete') {
                        taskDiv.classList.add('complete');
                        if (document.getElementById('view-completed-btn').textContent == 'Show Completed Tasks') {
                            taskDiv.classList.add('hidden');
                        }
                    }

                    const taskBasicDiv = document.createElement('div');
                    taskBasicDiv.classList.add('task-basic-div');
                    taskBasicDiv.setAttribute('data-index', taskNumber);;

                    const taskDetailDiv = document.createElement('div');
                    taskDetailDiv.classList.add('task-detail-div');
                    taskDetailDiv.setAttribute('data-index', taskNumber);
                                        
                    categoryDiv.appendChild(taskDiv);
                    taskDiv.appendChild(taskBasicDiv);
                    taskDiv.appendChild(taskDetailDiv);

                    if (taskList[i][property] === category) {
                        function createCheckbox() {
                            const taskCheckbox = document.createElement('input');
                            taskCheckbox.type = 'checkbox';
                            taskCheckbox.classList.add('task-checkbox');
                            taskCheckbox.setAttribute('data-index', taskNumber);
                            taskCheckbox.title = 'Complete';
                            if (taskList[i].status == 'Complete') {
                                taskCheckbox.checked = 'true';
                            }
                            taskBasicDiv.appendChild(taskCheckbox);
                        }
                        function createTaskSubDiv(key) {
                            let taskSubDiv = document.createElement('div');
                            taskSubDiv.setAttribute('data-property', key);
                            taskSubDiv.setAttribute('data-index', taskNumber);
                            taskSubDiv.classList.add('task-subdiv', `task-${key}`);
                            if (key === 'duedate') {
                                const editDateDiv = document.createElement('input');
                                editDateDiv.type = 'date';
                                editDateDiv.value = taskList[i].duedate;
                                editDateDiv.setAttribute('data-property', key);
                                editDateDiv.setAttribute('data-index', taskNumber);
                                editDateDiv.classList.add('task-subdiv', 'edit-date-div', 'hidden');
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
                            expandBtn.setAttribute('data-index', taskNumber);
                            expandBtn.title = 'Expand';
                            expandBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-caret-square-down fa-lg"></i>');
                            taskBasicDiv.appendChild(expandBtn);
                        }
                        function createDeleteBtn() {
                            const deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-btn');
                            deleteBtn.setAttribute('data-index', taskNumber);
                            deleteBtn.title = 'Delete';
                            deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt fa-lg"></i>' );
                            taskBasicDiv.appendChild(deleteBtn);
                        }
                        function createDetails() {
                            function createSubDiv(key) {
                                let keySubDiv = document.createElement('div');
                                keySubDiv.id = key;
                                keySubDiv.setAttribute('data-property', key);
                                keySubDiv.setAttribute('data-index', taskNumber);
                                keySubDiv.classList.add('task-subdiv', 'task-detail-child', `${key}-label`, 'hidden');
                                keySubDiv.textContent = `${key}: `;
                                taskDetailDiv.appendChild(keySubDiv);

                                function createDetailDropDown(categ, arr) {
                                    let subDiv = document.createElement('select');
                                    subDiv.id = arr.title + i;
                                    subDiv.setAttribute('data-property', key);
                                    subDiv.setAttribute('data-index', taskNumber);
                                    subDiv.classList.add('task-subdiv', `task-${categ}-select`, 'task-detail-child', 'hidden');
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
                                    subDiv.setAttribute('data-index', taskNumber);
                                    subDiv.classList.add('task-subdiv', 'task-detail-child', `task-${key}-input`, 'hidden');
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
                                    taskDiv.style.color = '#BD0034';
                                    break;
                                case '2-Medium':
                                    taskDiv.style.color = '#D68301';
                                    break;
                                case '3-Low':
                                    taskDiv.style.color = '#75990D';
                                    break;
                            }
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

function createEditList(trigger) {
    const editDiv = document.getElementById('edit-div');

    while (editDiv.firstChild) {
        editDiv.removeChild(editDiv.firstChild);
    }
    const listTitle = document.createElement('h3');
    listTitle.id = 'list-title';
    editDiv.appendChild(listTitle);

    const list = document.createElement('ul');
    list.id = 'list';
    editDiv.appendChild(list);

    function createList(arr) {
        listTitle.textContent = arr.title;
        arr.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-item');
            listItem.textContent = item;
            list.appendChild(listItem);
        })
    }

    switch(trigger.id) {
        case 'edit-cat-btn':
            createList(categories);
            break;
        case 'edit-proj-btn':
            createList(projects);
            break;
        case 'edit-prior-btn':
            createList(priorities);
            break;
        case 'edit-stat-btn':
            createList(statuses);
            break;
        case 'edit-list-btn':
            break;
    }
}

export {
    displayTasks,
    createDropdown,
    createEditList,
}