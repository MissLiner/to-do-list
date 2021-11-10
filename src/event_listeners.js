import { addItemToArr, addNewTaskToList, toggleComplete, deleteFromArr, updateTask, updateList } from './task_logic';
import { createDropdown, displayTasks, createEditList } from './task_DOM'
import { categories, projects, taskList, priorities, statuses, sortTaskList } from './index'

let currentTask = 'none';
let currentList;
let currentSelects;

function queryAll(selector) {
    return document.querySelectorAll(selector);
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

function loadBaseListeners() {
    function getEl(id) {
        return document.getElementById(id);
    }
    function queryAll(selector) {
        return document.querySelectorAll(selector);
    }
    function toggleHidden(...args) {
        args.forEach(arg => {
            if (arg.classList.contains('hidden')) {
                arg.classList.remove('hidden');
            }
            else (arg.classList.add('hidden'));
        })
    }

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
        displayTasks();
    })
    addItemBtn.addEventListener('click', () => {
        editDiv.appendChild(addItemForm);
        toggleHidden(addItemBtn);
        toggleHidden(addItemForm);
    })

    //CLOSE LIST
    const exitPopupBtn = getEl('exit-popup-btn');

    exitPopupBtn.addEventListener('click', () => {
        toggleHidden(editDiv);
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

        //categories pops up twice when reopened after add new item
    
    submitItemBtn.addEventListener('click', (e) => {
        toggleHidden(addItemForm);

        if (addItemBtn.classList.contains('hidden')) {
            toggleHidden(addItemBtn);
        }
        const newItem = addItemField.value;
        setCurrentList(e.target);

        addItemToArr(newItem, currentList);
        currentSelects.forEach(select => {
            createDropdown(currentList, select.id);
        })
        createEditList(currentList);
        updateTask(e.target);

        if (currentList == 'taskList') {
            const currentSelect = getEl(currentList.title + currentTask);
            currentSelect.value = newItem; //dothis - dropdown value after addnewitem
        }
        addItemField.value = '';
        displayTasks();
    })

    cancelAddBtn.addEventListener('click', () => {
        addItemField.value = '';
        let parentNode = addItemForm.parentNode;
        parentNode.removeChild(addItemForm);
        toggleHidden(addItemForm)
        if (addItemBtn.classList.contains('hidden')) {
            toggleHidden(addItemBtn);
        };
    })
       
    //CHANGE VIEW
    const viewOptions = getEl('view-options');
    const viewCompletedBtn = getEl('view-completed-btn');
    
    viewOptions.addEventListener('change', () => {
        displayTasks();
    })

    viewCompletedBtn.addEventListener('click', ()=> {
        if (viewCompletedBtn.textContent == 'show all tasks') {
            viewCompletedBtn.textContent = 'show active only';
        }
        else {
            viewCompletedBtn.textContent = 'show all tasks';
        }
        displayTasks();
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
    function getEl(id) {
        return document.getElementById(id);
    }
    function queryAll(selector) {
        return document.querySelectorAll(selector);
    }
    function toggleHidden(...args) {
        args.forEach(arg => {
            if (arg.classList.contains('hidden')) {
                arg.classList.remove('hidden');
            }
            else (arg.classList.add('hidden'));
        })
    }
   
    //OPEN ADD ITEM FORM
    const allSelects = queryAll('select');
    const addItemForm = getEl('add-item-form');

    allSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (e.target.value === 'Add new') {
                const parentNode = e.target.parentNode;

                parentNode.appendChild(addItemForm);
                toggleHidden(addItemForm);

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

        toggleHidden(date, editDate);
        children.forEach(child => {
            toggleHidden(child);
        })
    }
    
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
        subdiv.addEventListener('change', () => {
            let property = subdiv.dataset.arr;
            if (subdiv.value == 'Add new') {
                return;
            } 
            else {
                updateTask(subdiv, property);
                displayTasks();
                toggleTask();
            }
        })
    })

    //DELETE ITEMS
    const deleteBtns = queryAll('.delete-btn');
  
    deleteBtns.forEach(button => {
        button.addEventListener('click', () => {
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
                currentTask = 'none';
                displayTasks();
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