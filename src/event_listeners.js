import { addItemToArr, addNewTaskToList, completeTask, deleteFromArr, updateTask, updateList } from './task_logic';
import { createDropdown, displayTasks, createEditList } from './task_DOM'
import { categories, projects, taskList, priorities, statuses } from './index'
import  formatRelative  from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';

let currentTask;
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
        }
    }
}
function setCurrentSelects(trigger) {
    switch(trigger.dataset.arr) {
        case 'categories':
            currentSelects = queryAll('.task-category-select');
            break;
        case 'priorities':
            currentSelects = queryAll('.task-priority-select');
            break;
        case 'projects':
            currentSelects = queryAll('.task-project-select');
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
    function toggleHidden(elem) {
        if (elem.classList.contains('hidden')) {
            elem.classList.remove('hidden');
        }
        else (elem.classList.add('hidden'));
    }

    //MENU BAR
    const menuBar = getEl('menu-bar');
    const editBtn = getEl('edit-btn');
    const editMenu = getEl('edit-menu');
    const sortBtn = getEl('sort-btn');
    const sortMenu = getEl('sort-menu');
    const helpBtn = getEl('help-btn');

    menuBar.addEventListener('click', (e) => {
        if (e.target === editBtn) {
            toggleHidden(editMenu);
        }
        if (e.target === sortBtn) {
            toggleHidden(sortMenu);
        }
        if (e.target === helpBtn) {
            alert('Help you?!? I\'m barely keeping my own shit together. Sorry buddy!')
        }
    })

    //EDIT LISTS
    const editDiv = getEl('edit-div');
    const addItemBtn = getEl('add-item-btn');

    editMenu.addEventListener('click', (e) => {
        // switch(e.target.id) {
        //     case 'edit-cat-btn':
        //         currentList = categories;
        //         break;
        //     case 'edit-proj-btn':
        //         currentList = projects;
        //         break;
        //     case 'edit-prior-btn':
        //         currentList = priorities;
        //         break;
        //     case 'edit-stat-btn':
        //         currentList = statuses;
        //         break;}
        setCurrentList(e.target);
        createEditList(currentList);
        toggleHidden(editMenu);
        toggleHidden(editDiv);
        displayTasks(viewOptions.value);
    })
    addItemBtn.addEventListener('click', () => {
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

    newTaskBtn.addEventListener('click', () => {
        toggleHidden(newTaskForm);
        newTaskForm.reset();
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        addNewTaskToList();
        toggleHidden(newTaskForm);
        newTaskForm.reset();
        displayTasks(viewOptions.value);
    })

    cancelNewTaskBtn.addEventListener('click', () => {
        toggleHidden(newTaskForm);
        newTaskForm.reset();
    })

    //ADD NEW ITEM
    const categorySelect = getEl('category-select');
    const addItemForm = getEl('add-item-form');
    const submitItemBtn = getEl('submit-item-btn');
    const cancelAddBtn = getEl('cancel-add-btn');
    const addItemField = getEl('add-item-field');
    
//update ad category and add add project forms to be one and attach to list add buttons too!!!!!
    submitItemBtn.addEventListener('click', (e) => {
        const newItem = addItemField.value;
        setCurrentSelects(e.target);
        setCurrentList(e.target);

        addItemToArr(newItem, currentList);
        currentSelects.forEach(select => {
            createDropdown(currentList, select.id);
        })
        updateTask(addItemField);
        addItemField.value = '';
        toggleHidden(addItemForm);
    })

    cancelAddBtn.addEventListener('click', () => {
        addItemField.value = '';
        toggleHidden(addItemForm);
    })

    //ADD NEW PROJECT
    const projectSelect = getEl('project-select');
    const addProjectForm = getEl('add-project-form');
    const addProjectBtn = getEl('add-project-btn');
    const cancelAddProjBtn = getEl('cancel-add-proj-btn');

    projectSelect.addEventListener('change', () => {
        if (projectSelect.value == 'Add new') {
            toggleHidden(addProjectForm);
        }
    })

    addProjectBtn.addEventListener('click', () => {
            const newItem = getEl('add-project-input').value;
            const projectSelects = queryAll('.task-project-select');

            addItemToArr(newItem, projects);
            toggleHidden(addProjectForm);
            createDropdown(projects, 'project-field');
            projectSelects.forEach(select => {
                createDropdown(projects, select.id);
            })
    })

    cancelAddProjBtn.addEventListener('click', () => {
        toggleHidden(addProjectForm);
    })
       
    //CHANGE VIEW
    const viewOptions = getEl('view-options');
    const viewCompletedBtn = getEl('view-completed-btn');
    
    viewOptions.addEventListener('change', () => {
        displayTasks(viewOptions.value);
    })

    viewCompletedBtn.addEventListener('click', ()=> {
        if (viewCompletedBtn.textContent == 'Show Completed Tasks') {
            viewCompletedBtn.textContent = 'Hide Completed Tasks';
        }
        else {
            viewCompletedBtn.textContent = 'Show Completed Tasks';
        }
        const completeDivs = queryAll('.complete');
        completeDivs.forEach(completeDiv => {
            toggleHidden(completeDiv);
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
    function toggleHidden(elem) {
        if (elem.classList.contains('hidden')) {
            elem.classList.remove('hidden');
        }
        else (elem.classList.add('hidden'));
    }


    const viewOptions = getEl('view-options');
   
    //OPEN ADD ITEM FORM
    const allSelects = queryAll('select');
    const addItemForm = getEl('add-item-form');

    allSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (e.target.value === 'Add new') {
                setCurrentList(e.target);
                setCurrentSelects(e.target);
                toggleHidden(addItemForm);
            }
        })
    })
    //ADD CATEGORY
    // const categoryInputs = queryAll('.task-category-select');
    // const addCategoryForm = getEl('add-category-form')

    // categoryInputs.forEach(input => {
    //     input.addEventListener('change', () => {
    //         if (input.value === 'Add new') {
    //             toggleHidden(addCategoryForm);
    //         }
    //         else {
    //             updateTask(input, 'category');
    //         }
    //     })
    // })

    //ADD PROJECT
    // const projectInputs = queryAll('.task-project-select');
    // const addProjectForm = getEl('add-project-form')

    // projectInputs.forEach(input => {
    //     input.addEventListener('change', () => {
    //         if (input.value === 'Add new') {
    //             toggleHidden(addProjectForm);
    //         }
    //         else {
    //             updateTask(input, 'project');
    //         }
    //     })
    // })

    //EDIT LISTS
    const listItems = queryAll('.list-item');

    listItems.forEach(field => {
        field.addEventListener('change', () => {
            updateList(field, currentList);
        })
    })

    //EXPAND/COLLAPSE TASK
    const taskDetailDivs = queryAll('.task-detail-div');
    const taskNameDivs = queryAll('.task-name');
    const taskDateDivs = queryAll('.task-duedate');
    const editDateDivs = queryAll('.edit-date-div');

    function toggleTask() {
        taskNameDivs.forEach(div => {
            if (div.dataset.index == currentTask) {
                div.contentEditable = 'true';
            }
        })
        taskDateDivs.forEach(div => {
            if (div.dataset.index == currentTask) {
                toggleHidden(div);
            } 
        })
        editDateDivs.forEach(div => {
            if (div.dataset.index == currentTask) {
                toggleHidden(div);
            }
        })
        taskDetailDivs.forEach(div => {
            if (div.dataset.index == currentTask) {
                const children = div.childNodes;
                children.forEach(child => {
                    toggleHidden(child);
                })
            }
        })
    }

    queryAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.index == currentTask) {
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

    const taskBasicDivs = queryAll('.task-basic-div');
    const taskSubDivs = queryAll('.task-subdiv');
    let currentBasicDiv;
    let currentDateDiv;

    function colorCode(input) {
        switch(input.value) {
            case '1-High':
                currentBasicDiv.style.color = '#9E3153';
                break;
            case '2-Medium':
                currentBasicDiv.style.color = '#BD6B37';
                break;
            case '3-Low':
                currentBasicDiv.style.color = '#5E8A32';
                break;
        }
    }

    function updateDay(input, div) {
        let currentDay = new Date();
        let dateDue = new Date(parseISO(input.value))
        let output = formatRelative(dateDue, currentDay);
        div.textContent = output.slice(0, -12);
    }

    taskSubDivs.forEach(subdiv => {
        subdiv.addEventListener('change', () => {
            if (subdiv.value == 'Add new') {
                return;
            }
            let property = subdiv.dataset.arr;

            taskBasicDivs.forEach(div => {
                if (div.dataset.index == currentTask) {
                    currentBasicDiv = div;
                }
            })
            taskDateDivs.forEach(div => {
                if (div.dataset.index == currentTask) {
                    currentDateDiv = div;
                }
            })
            if (property == 'priority') {
                colorCode(subdiv);
            }
            if (property == 'duedate') {
                updateDay(subdiv, currentDateDiv);
            }
            updateTask(subdiv, property);
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
                displayTasks(viewOptions.value);
            }
        })
    })

    //COMPLETE TASK
    const checkboxes = queryAll('.task-checkbox')

    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            completeTask(box);
            displayTasks(viewOptions.value);
        })
    })

 
}
export {
    loadBaseListeners,
    loadTaskListeners,
}