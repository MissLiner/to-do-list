import {
    addItemToArr, 
    addNewTaskToList, 
    toggleComplete, 
    deleteFromArr, 
    updateTask, 
    updateList 
} from './task_logic';
import { 
    createDropdown, 
    displayTasks, 
    createEditList 
} from './task_DOM'
import { 
    categories, 
    projects, 
    taskList, 
    priorities, 
    statuses, 
    sortTaskList } from './index'

let currentTask = 'none';
let currentList;
let currentProperty;
let currentSelect;

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
// function setCurrentSelects(trigger) {
//     switch(trigger.dataset.arr) {
//         case 'categories':
//             currentSelects = queryAll('.task-categories-select, .category-select');
//             break;
//         case 'priorities':
//             currentSelects = queryAll('.task-priorities-select');
//             break;
//         case 'projects':
//             currentSelects = queryAll('.task-projects-select, .project-select');
//             break;
//         case 'statuses':
//             currentSelects = queryAll('.task-status-select');
//             break;
//     }
// }

function toggleTask() {
    if (currentTask !== 'none') {
        const taskDiv = getEl(`task${currentTask}`)
        const details = getEl(`details${currentTask}`);
        const name = getEl(`name${currentTask}`);
        const date = getEl(`duedate${currentTask}`);
        const editDate = getEl(`edit-date${currentTask}`);
        const children = details.childNodes;

        taskDiv.classList.contains('expanded') ? //dothis - proper use of ternary?
        taskDiv.classList.remove('expanded') : taskDiv.classList.add('expanded');

        name.readOnly ? name.readOnly = false : name.readOnly = true;

        toggleHidden(date, editDate, details);
        children.forEach(child => {
            toggleHidden(child);
        })
    }
}

function loadBaseListeners() {

    //MENU BAR (dothis - ask for feedback on this part)
    const menuBar = getEl('menu-bar');
    const editMenu = getEl('edit-menu');
    const sortMenu = getEl('sort-menu');
    const editBtn = getEl('edit-btn');
    const sortBtn = getEl('sort-btn');
    const helpBtn = getEl('help-btn');

    function addClickOutListener(element, target) {
        document.addEventListener('click', (e) => {
                toggleHidden(element);
                if (e.target === target) {
                    e.stopPropagation();
                }
        }, {
        once: true,
        capture: true
        })
    }   
    function toggleMenu(menu, event) {
        if (!menu.classList.contains('hidden')) {
            return;
        } else {
            toggleHidden(menu);
            addClickOutListener(menu, event.target);
            event.stopPropagation();
        }
    }
    function controlMenuBar(event) {
        switch(event.target) {
            case editBtn:
                toggleMenu(editMenu, event);
                break;
            case sortBtn:
                toggleMenu(sortMenu, event);
                break;
            case helpBtn:
                alert('Help you?!? I\'m barely keeping my own shit together. Sorry buddy!');
                break;
        }
    }
    menuBar.addEventListener('click', (e) => controlMenuBar(e));

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
    const editDivExitBtn = getEl('edit-div-exit-btn');

    editDivExitBtn.addEventListener('click', () => {
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
        const categorySelect = getEl('category-select');
        const projectSelect = getEl('project-select');
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
        currentList == projects ? 
            createDropdown(projects, projectSelect.id) : createDropdown(categories, categorySelect.id);
        displayTasks();

        if (currentTask !== 'none') { toggleTask() };
    })

    cancelAddBtn.addEventListener('click', () => {
        addItemField.value = '';
        if (!editDiv.contains(addItemForm)) {
            editDiv.appendChild(addItemForm);
        }
        toggleHidden(addItemForm);
        if (addItemBtn.classList.contains('hidden')) {
            toggleHidden(addItemBtn);
        };
        displayTasks();
            toggleTask();
    })
       
    //CHANGE VIEW
    const viewOptions = getEl('view-options');
    const completedToggle = getEl('toggle-completed');
    const categoryToggle = getEl('toggle-category');
    const toggleDiv = getEl('toggle-div');
    
    viewOptions.addEventListener('change', () => {
        displayTasks();

        if (viewOptions.value == 'duedate') {
            toggleHidden(toggleDiv);
        }
        else if (toggleDiv.classList.contains('hidden')) {
            toggleHidden(toggleDiv);
        }
        currentTask = 'none';
    })

    completedToggle.addEventListener('click', ()=> {
        displayTasks();
        if (currentTask !== 'none') { toggleTask() };
    })
    categoryToggle.addEventListener('click', () => {
        displayTasks();
        if (currentTask != 'none') { toggleTask() };
    })
    //SORT TASKS
    const sortBtns = queryAll('.sort-btn');

    sortBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            sortTaskList(e.target);
            displayTasks();
        })
    })
}

function loadTaskListeners() {
   
    //OPEN ADD ITEM FORM
    const allSelects = queryAll('.task-select', );
    const addItemForm = getEl('add-item-form');

    allSelects.forEach(select => {
        if (!select.classList.contains('has-listener')) {
            select.classList.add('has-listener');
            select.addEventListener('change', (e) => {
                if (e.target.value === 'Add new') {
                    if (addItemForm.classList.contains('hidden')) {
                        const parentNode = e.target.parentNode;
                        parentNode.appendChild(addItemForm);
                        toggleHidden(addItemForm);
                    } else {
                        //reset original select to task value
                        taskList.forEach(task => {
                            if (task.index == currentTask) {
                                const options = Array.from(currentSelect.options);
                                options.forEach(option => {
                                    if (option.value == task[currentProperty]) {
                                        currentSelect.selectedIndex = option.index;
                                        return;
                                    }
                                })
                                return;
                            }
                        })
                    }
                    currentProperty = e.target.dataset.array;
                    currentSelect = e.target;
                    setCurrentList(e.target);
                }
            })
        }
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
        if (!button.classList.contains('has-listener')) {
            button.classList.add('has-listener');
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
        }
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