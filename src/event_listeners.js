import { addItemToArr, addNewTaskToList, toggleComplete, deleteFromArr, updateTask, updateList } from './task_logic';
import { createDropdown, displayTasks, createEditList } from './task_DOM'
import { categories, projects, taskList, priorities, statuses, sortTaskList } from './index'

let currentTask = 'none';
let currentList;
let currentSelects;
let currentProperty;

function queryAll(selector) {
    return document.querySelectorAll(selector);
}

function getEl(id) {
    return document.getElementById(id);
}

function toggleHidden(...args) {
    args.forEach(arg => {
        if (arg.classList.contains('hidden')) {
            arg.classList.remove('hidden');
        }
        else (arg.classList.add('hidden'));
    })
}

function setCurrentList(trigger) {
    const allLists = [taskList, categories, priorities, projects, statuses];

    for (let list of allLists) {
        if (list.title == trigger.dataset.arr) {
            currentList = list;
            return;
        }
    }
}
function setCurrentSelects(trigger) {
    switch(trigger.dataset.arr) {
        case 'categories':
            currentSelects = queryAll('.task-categories-select, .category-select');
            break;
        case 'priorities':
            currentSelects = queryAll('.task-priorities-select');
            break;
        case 'projects':
            currentSelects = queryAll('.task-projects-select, .project-select');
            break;
        case 'statuses':
            currentSelects = queryAll('.task-status-select');
            break;
    }
}

function toggleTask() {
    const taskDiv = getEl(`task${currentTask}`)
    const details = getEl(`details${currentTask}`);
    const name = getEl(`name${currentTask}`);
    const date = getEl(`duedate${currentTask}`);
    const editDate = getEl(`edit-date${currentTask}`);
    const children = details.childNodes;

    taskDiv.classList.contains('expanded') ? 
        taskDiv.classList.remove('expanded') : taskDiv.classList.add('expanded');

    name.readOnly ? name.readOnly = false : name.readOnly = true;

    toggleHidden(date, editDate, details);
    children.forEach(child => {
        toggleHidden(child);
    })
}

function loadBaseListeners() {

    //MENU BAR
    const menuBar = getEl('menu-bar');
    const editMenu = getEl('edit-menu');
    const sortMenu = getEl('sort-menu');
    const editBtn = getEl('edit-btn');
    const sortBtn = getEl('sort-btn');
    const helpBtn = getEl('help-btn');

    function addClickOutListener(element) {
        window.addEventListener('click', function hideElement(e) {
                toggleHidden(element);
        }, {
        once: true
        })
    }   

    menuBar.addEventListener('click', (e) => {
        setCurrentSelects(e.target);

        switch(e.target) {
            case editBtn:
                toggleHidden(editMenu);
                addClickOutListener(editMenu);
                e.stopPropagation();
                break;
            case sortBtn:
                toggleHidden(sortMenu);
                addClickOutListener(sortMenu);
                e.stopPropagation();
                break;
            case helpBtn:
                alert('Help you?!? I\'m barely keeping my own shit together. Sorry buddy!');
                break;
        }
    })

    //EDIT LISTS
    const editDiv = getEl('edit-div');
    const addItemBtn = getEl('add-item-btn');

    editMenu.addEventListener('click', (e) => {
        setCurrentList(e.target);
        createEditList(currentList);
        toggleHidden(editDiv);
        if (!editDiv.contains(addItemForm)) {
            editDiv.appendChild(addItemForm);
            if (!addItemForm.classList.contains('hidden')) {
                toggleHidden(addItemForm);
            }
        }
        displayTasks();
        if (currentTask !== 'none') { toggleTask() };
    })
    addItemBtn.addEventListener('click', (e) => {
        if (!e.target.parentNode.contains(addItemForm)) {
        editDiv.appendChild(addItemForm);
        }
        toggleHidden(addItemBtn);
        toggleHidden(addItemForm);
    })

    //CLOSE LIST
    const exitPopupBtn = getEl('exit-popup-btn');

    exitPopupBtn.addEventListener('click', () => {
        toggleHidden(editDiv);
        if (!addItemForm.classList.contains('hidden')) {
            toggleHidden(addItemForm);
            toggleHidden(addItemBtn);
        }
    })

    //ADD NEW TASK
    const newTaskBtn = getEl('new-task-btn');
    const newTaskForm = getEl('new-task-form');
    const cancelNewTaskBtn = getEl('cancel-new-task-btn');
    const filter = getEl('filter');

    newTaskBtn.addEventListener('click', () => {
        currentList = taskList;
        toggleHidden(newTaskForm, filter);
        newTaskForm.reset();
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        addNewTaskToList();
        toggleHidden(newTaskForm, filter);
        newTaskForm.reset();
        displayTasks();
        if (currentTask !== 'none') { toggleTask() };
        
    })

    cancelNewTaskBtn.addEventListener('click', () => {
        toggleHidden(newTaskForm, filter);
        newTaskForm.reset();
    })

    //ADD NEW ITEM TO LIST
    const addItemForm = getEl('add-item-form');
    const submitItemBtn = getEl('submit-item-btn');
    const cancelAddBtn = getEl('cancel-add-btn');
    const addItemField = getEl('add-item-field');
    
    submitItemBtn.addEventListener('click', (e) => {
        toggleHidden(addItemForm);
        if (!editDiv.contains(addItemForm)) {
            editDiv.appendChild(addItemForm);
        }
        if (addItemBtn.classList.contains('hidden')) {
            toggleHidden(addItemBtn);
        }
        const newItem = addItemField.value;
        addItemField.value = '';
        setCurrentList(e.target);
        addItemToArr(newItem, currentList);
        createEditList(currentList);
        updateTask(currentTask, currentProperty, newItem);
        console.table(taskList);

        displayTasks();
        if (currentTask !== 'none') { toggleTask() };
    })

    cancelAddBtn.addEventListener('click', () => {
        addItemField.value = '';
        if (!editDiv.contains(addItemForm)) {
            editDiv.appendChild(addItemForm);
        }
        toggleHidden(addItemForm)
        if (addItemBtn.classList.contains('hidden')) {
            toggleHidden(addItemBtn);
        };
        displayTasks();
        toggleTask();
    })
       
    //CHANGE VIEW
    const viewOptions = getEl('view-options');
    const completedToggle = getEl('toggle-completed');
    
    viewOptions.addEventListener('change', () => {
        displayTasks();
        currentTask = 'none';
    })

    completedToggle.addEventListener('click', ()=> {
        // if (completedToggle.textContent == 'show all tasks') {
        //     completedToggle.textContent = 'show active only';
        // }
        // else {
        //     completedToggle.textContent = 'show all tasks';
        // }
        displayTasks();
        if (currentTask !== 'none') { toggleTask() };
    })
    //SORT TASKS
    const sortBtns = queryAll('.sort-btn');

    sortBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            sortTaskList(e.target);
            displayTasks();
            toggleHidden(sortMenu);
        })
    })
}

function loadTaskListeners() {
   
    //OPEN ADD ITEM FORM
    const allSelects = queryAll('select');
    const addItemForm = getEl('add-item-form');

    allSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (e.target.value === 'Add new') {
                const parentNode = e.target.parentNode;

                //if (!parentNode.contains(addItemForm)) {
                parentNode.appendChild(addItemForm);
                //}
                toggleHidden(addItemForm);
                currentProperty = e.target.dataset.array;
                setCurrentList(e.target);
                setCurrentSelects(e.target);
            }
        })
    })

    //EDIT LISTS
    const listItems = queryAll('.list-item');

    listItems.forEach(field => {
        field.addEventListener('change', () => {
            updateList(field, currentList);
        })
    })

    //EXPAND/COLLAPSE TASK
    const expandBtns = queryAll('.expand-btn');
    
    expandBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (currentTask == 'none') {
                currentTask = button.dataset.index;
                toggleTask();
            }
            else if (button.dataset.index == currentTask) {
                toggleTask();
                currentTask = 'none';
            }
            else {
                toggleTask();
                currentTask = button.dataset.index;
                toggleTask();
            }
        })
    })

    //EDIT TASK
    const taskSubDivs = queryAll('.task-subdiv');

    taskSubDivs.forEach(subdiv => {
        subdiv.addEventListener('change', (e) => {
            currentProperty = subdiv.dataset.arr;
            if (subdiv.value == 'Add new') {
                return;
            } 
            else {
                updateTask(currentTask, currentProperty, e.target.value);
                displayTasks();
                toggleTask();
            }
        })
    })

    //DELETE ITEMS
    const deleteBtns = queryAll('.delete-btn');
  
    deleteBtns.forEach(button => {
        button.addEventListener('click', () => {
            let lastTask = currentTask;
            currentTask = button.dataset.index;
            setCurrentList(button);
            const confirmDelete = confirm('Are you sure you want to delete this item?');
            if (confirmDelete == true) {
                if (currentList !== taskList) {
                    deleteFromArr(currentTask, currentList);
                    createEditList(currentList);
                }
                else {
                    deleteFromArr(currentTask, currentList);
                }
                currentTask = lastTask;
                displayTasks();
                toggleTask();
                currentTask = 'none';
                
            }
        })
    })

    //COMPLETE TASK
    const checkboxes = queryAll('.task-checkbox')

    checkboxes.forEach(box => {
        box.addEventListener('click', () => {
            toggleComplete(box);
            displayTasks();
        })
    })
}
export {
    loadBaseListeners,
    loadTaskListeners,
}