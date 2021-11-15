import { content , taskList, priorities, categories, projects, statuses } from './index.js';
import { loadTaskListeners } from './event_listeners';
import  formatRelative  from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import uncheckedBoxRef from './box_unchecked.svg';
import checkedBoxRef from './box_checked.svg';
import borderRef from './form_border_1.svg';
import { caleandar, settings} from './caleandar.js';

function displayTasks() {

    (function clearTaskDisplay() {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    })()

    const viewOptions = document.getElementById('view-options');
    const property = viewOptions.value;

    if (taskList) {
        if (property == 'duedate') {
            let events = [];
            (function createCalendarArr() {
                for (let i = 0; i < taskList.length; i++) {
                    if (taskList[i].statuses == 'Active') {
                        let taskDate = parseISO(taskList[i].duedate, new Date());
                        let name = taskList[i].name;
                        let calObject = {
                        'Date': taskDate,
                        'Title': name,
                        }
                    events.push(calObject);
                    }
                }
              })()
            const calendarDiv = document.createElement('div');
            content.appendChild(calendarDiv);
            caleandar(calendarDiv, events, settings);
        } else {
        function createCategoryDiv(category) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-div');
            content.appendChild(categoryDiv);
        
            function addCategoryTitle(category) {
                const categoryTitle = document.createElement('h2');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category;
                categoryDiv.appendChild(categoryTitle);
                
                if (category == 'Complete') {
                    categoryTitle.classList.add('completed');
                }
            }

            addCategoryTitle(category);

            function addTasksToCategory(property) {
                for (let i = 0; i < taskList.length; i++) {
                    if (taskList[i][property] == category) {
                    const taskNumber = taskList[i].index;
                    const taskDiv = document.createElement('div');
                    taskDiv.id = `task${taskNumber}`;
                    taskDiv.classList.add('task-div', 'task');
                    taskDiv.setAttribute('data-index', taskNumber);;

                    const taskBasicDiv = document.createElement('div');
                    taskBasicDiv.id = 'basic' + taskNumber;
                    taskBasicDiv.classList.add('task-basic-div', 'task');
                    taskBasicDiv.setAttribute('data-index', taskNumber);

                    const taskDetailDiv = document.createElement('div');
                    taskDetailDiv.id='details' + taskNumber;
                    taskDetailDiv.classList.add('task-detail-div', 'task', 'hidden');
                    taskDetailDiv.setAttribute('data-index', taskNumber);

                    const border = new Image();
                    border.src = borderRef;
                    border.id = 'border-task-detail';
                    border.classList.add('hidden');
                    taskDetailDiv.appendChild(border);
                                        
                    categoryDiv.appendChild(taskDiv);
                    taskDiv.appendChild(taskBasicDiv);
                    taskDiv.appendChild(taskDetailDiv);

                    if (taskList[i][property] === category) {
                        function createCheckbox() {
                            const checkbox = new Image();
                            if (taskList[i].statuses == 'Active') {
                                checkbox.src = uncheckedBoxRef;
                            }
                            else {
                                checkbox.src = checkedBoxRef;
                            }
                            const taskCheckbox = document.createElement('div');
                            taskCheckbox.appendChild(checkbox);
                            taskCheckbox.classList.add('task-checkbox', 'task');
                            taskCheckbox.setAttribute('data-index', taskNumber);
                            taskCheckbox.setAttribute('data-arr', 'statuses');
                            taskCheckbox.title = 'Complete';

                            taskBasicDiv.appendChild(taskCheckbox);
                        }
                        function createTaskSubDiv(key) {
                            let taskSubDiv;
                            if (key == 'name') {
                                taskSubDiv = document.createElement('input');
                                taskSubDiv.readOnly = true;
                                taskSubDiv.value = taskList[i].name;
                            }
                            else {
                                taskSubDiv = document.createElement('div');
                            }
                            taskSubDiv.id = key + taskNumber;
                            taskSubDiv.setAttribute('data-arr', key);
                            taskSubDiv.setAttribute('data-index', taskNumber);
                            taskSubDiv.classList.add('task-subdiv', `task-${key}`, 'task');
                            if (key === 'duedate') {
                                const editDateDiv = document.createElement('input');
                                editDateDiv.id = 'edit-date' + taskNumber;
                                editDateDiv.type = 'date';
                                editDateDiv.value = taskList[i].duedate;
                                editDateDiv.setAttribute('data-arr', key);
                                editDateDiv.setAttribute('data-index', taskNumber);
                                editDateDiv.classList.add('task-subdiv', 'edit-date-div', 'task', 'hidden');
                                taskBasicDiv.appendChild(editDateDiv);

                                (function dateToText() {
                                   let currentDay = new Date();
                                    let dateDue = new Date(parseISO(taskList[i].duedate));
                                    let dateDistance = differenceInCalendarDays(dateDue, currentDay);
                                    
                                    if (dateDistance < -7) {
                                        let text = dateDistance + ' days ago';
                                        taskSubDiv.textContent = text.substring(1);
                                    }
                                    else if (dateDistance > 7) {
                                        taskSubDiv.textContent = 'in ' + dateDistance + ' days';
                                    }
                                    else { 
                                        let output = formatRelative(dateDue, currentDay);
                                        taskSubDiv.textContent = output.slice(0, -12);
                                    }
                                })()
                            }
                            else {
                                taskSubDiv.textContent = taskList[i][key];
                            }
                            if (taskList[i].statuses == 'Active') {
                                switch(taskList[i].priorities) {
                                    case '1: High':
                                        taskSubDiv.style.color = '#9E3153';
                                        break;
                                    case '2: Medium':
                                        taskSubDiv.style.color = '#BD6B37';
                                        break;
                                    case '3: Low':
                                        taskSubDiv.style.color = '#5E8A32';
                                        break;
                                }
                            }
                            taskBasicDiv.appendChild(taskSubDiv);
                        }
                        function createExpandBtn() {
                            const expandBtn = document.createElement('button');
                            expandBtn.classList.add('expand-btn', 'task');
                            expandBtn.setAttribute('data-index', taskNumber);
                            expandBtn.title = 'Expand';
                            expandBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-caret-square-down fa-lg"></i>');
                            taskBasicDiv.appendChild(expandBtn);
                        }
                        function createDeleteBtn() {
                            const deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-btn', 'task');
                            deleteBtn.setAttribute('data-index', taskNumber);
                            deleteBtn.setAttribute('data-arr', 'taskList');
                            deleteBtn.title = 'Delete';
                            deleteBtn.insertAdjacentHTML('beforeend', '<i class="far fa-trash-alt fa-lg"></i>' );
                            taskBasicDiv.appendChild(deleteBtn);
                        }
                        function createDetails() {
                            function createSubDiv(key) {
                                let keySubDiv = document.createElement('div');
                                keySubDiv.setAttribute('data-arr', key);
                                keySubDiv.setAttribute('data-index', taskNumber);
                                keySubDiv.classList.add('task-subdiv', 'task-detail-child', `${key}-label`, 'task', 'hidden');
                                keySubDiv.textContent = `${key}`;
                                taskDetailDiv.appendChild(keySubDiv);

                                function createDetailDropDown(categ, arr, label) {
                                    keySubDiv.textContent = label;
                                    let subDiv = document.createElement('select');
                                    subDiv.id = arr.title + taskList[i].index;
                                    subDiv.setAttribute('data-arr', key);
                                    subDiv.setAttribute('data-index', taskNumber);
                                    subDiv.setAttribute('data-arr', arr.title);
                                    subDiv.classList.add('task-subdiv', `task-select`, 'task-detail-child', 'task', `${key}-select`, 'hidden');
                                    taskDetailDiv.appendChild(subDiv);
                                    createDropdown(arr, arr.title + taskList[i].index);
                                    
                                    Array.from(subDiv.options).forEach(option => {
                                        if (option.value == taskList[i][categ]) {
                                            subDiv.selectedIndex = option.index;
                                        }
                                    })
                                }

                                if (key === 'priorities') {
                                    createDetailDropDown(key, priorities, 'Priority:');
                                    return;
                                }
                                if (key === 'categories') {
                                    createDetailDropDown(key, categories, 'Category:');
                                    return;
                                }
                                if (key === 'projects') {
                                    createDetailDropDown(key, projects, 'Project:');
                                    return;
                                }
                                else {
                                    let subDiv = document.createElement('textarea');
                                    if (property == 'notes') {
                                        subDiv.rows = '4';
                                    } else {
                                        subDiv.rows = '1';
                                    }
                            
                                    subDiv.setAttribute('data-arr', key);
                                    subDiv.setAttribute('data-index', taskNumber);
                                    subDiv.classList.add('task-subdiv', 'task-detail-child', `task-${key}-input`, 'task', 'hidden');
                                    subDiv.contentEditable = 'true';
                                    subDiv.value = taskList[i][key];
                                    taskDetailDiv.appendChild(subDiv);
                                }
                            }
                        
                            createSubDiv('description');
                            createSubDiv('categories');
                            createSubDiv('priorities');
                            createSubDiv('projects');
                            createSubDiv('notes');
                        }

                        createCheckbox();
                        createTaskSubDiv('name');
                        createTaskSubDiv('duedate');
                        createExpandBtn();
                        createDeleteBtn();

                        createDetails(taskList[i]);

                    }
                    if (taskList[i].statuses == 'Complete') {
                        const allTaskDivs = document.querySelectorAll('.task');
                    
                        for (let i = 0; i < allTaskDivs.length; i++) {
                            if (allTaskDivs[i].dataset.index == taskNumber) {
                                allTaskDivs[i].classList.add('completed');
                                if (completedToggle.checked) {
                                    allTaskDivs[i].classList.add('hidden');
                                }
                            }
                        }
                    }
                }
            }
            }
            addTasksToCategory(property);
        }
        
        //create category lists for different views
        const completedToggle = document.getElementById('toggle-completed');
        const categoryToggle = document.getElementById('toggle-category');
        let allKeyValues = [];
        let activeKeyValues = [];

        function getUniqueValues(arr, prop) {
            const allValues = [];
            const activeValues = [];
            for (let i = 0; i < arr.length; i++) {
                allValues.push(arr[i][prop]);
                if (arr[i].statuses == 'Active') {
                    activeValues.push(arr[i][prop]);
                }
            }
            allKeyValues = [...new Set(allValues)];
            activeKeyValues = [...new Set(activeValues)];

            allKeyValues = allKeyValues.sort();
            activeKeyValues = activeKeyValues.sort();
        }
        getUniqueValues(taskList, property);

        if (categoryToggle.checked && completedToggle.checked) {
            activeKeyValues.forEach(value => createCategoryDiv(value));
        } 
        else if (categoryToggle.checked) {
            allKeyValues.forEach(value => createCategoryDiv(value));
        }
        else {
            let fullList;
            switch(property) {
                case 'categories':
                    fullList = categories;
                    break;
                case 'projects':
                    fullList = projects;
                    break;
                case 'statuses':
                    fullList = statuses;
                    break;
                case 'priorities':
                    fullList = priorities;
                    break;
            }
            if (property !== 'statuses') {
                createCategoryDiv('None');
            }
            fullList.forEach(value => createCategoryDiv(value));
        }
    }
    loadTaskListeners();
    }
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

let currentArr;
function createEditList(arr) {
    const editContentDiv = document.getElementById('edit-content-div');

    while (editContentDiv.firstChild) {
        editContentDiv.removeChild(editContentDiv.firstChild);
    }
    const listTitle = document.createElement('h2');
    listTitle.id = 'list-title';
    listTitle.classList.add('list-child');
    editContentDiv.appendChild(listTitle);

    const list = document.createElement('ul');
    list.id = 'list';
    list.classList.add('list-child');
    editContentDiv.appendChild(list);

    function addDeleteBtn(element, item) {
        const deleteBtn = document.createElement('button');
        element.appendChild(deleteBtn);
        deleteBtn.classList.add('delete-btn', 'del-item-btn');
        deleteBtn.setAttribute('data-index', item);
        deleteBtn.setAttribute('data-arr', arr.title);
        deleteBtn.title = 'Delete';
        deleteBtn.textContent = 'X';
    }

    function createList(arr) {
        listTitle.textContent = arr.title;
        arr.forEach(item => {
            const listItemDiv = document.createElement('div');
            listItemDiv.classList.add('list-item-div');
            list.appendChild(listItemDiv);
            addDeleteBtn(listItemDiv, item);

            const listItem = document.createElement('input');
            listItemDiv.appendChild(listItem);
            listItem.setAttribute('data-index', item);
            listItem.classList.add('list-item', 'list-child');
            listItem.maxLength = '20';
            listItem.value = item;
        })
    }
    createList(arr);
}

export {
    displayTasks,
    createDropdown,
    createEditList,
    currentArr,
}