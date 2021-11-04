import { addItemToArray, addNewTaskToList, completeTask, deleteTask, updateTask } from './task_logic';
import { createDropdown, displayTasks, createEditList } from './task_DOM'
import { categories, projects, taskList } from './index'
import  formatRelative  from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';

let currentTask;

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
    editMenu.addEventListener('click', (e) => {
        createEditList(e.target);
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

    //ADD NEW CATEGORY
    const categorySelect = getEl('category-select');
    const addCategoryForm = getEl('add-category-form');
    const addCategoryBtn = getEl('add-category-btn');
    const cancelAddCatBtn = getEl('cancel-add-cat-btn');
    const addCategoryField = getEl('add-category-field');


    categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'Add new') {
            toggleHidden(addCategoryForm);
        }
    })

    addCategoryBtn.addEventListener('click', () => {
        const newItem = addCategoryInput.value;
        const categorySelects = queryAll('.task-category-select');

        addItemToArray(newItem, categories);
        categorySelects.forEach(select => {
            createDropdown(categories, select.id);
        })
        updateTask(addCategoryField);
        addCategoryField.value = '';
        toggleHidden(addCategoryForm);
    })

    cancelAddCatBtn.addEventListener('click', () => {
        addCategoryField.value = '';
        toggleHidden(addCategoryForm);
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

            addItemToArray(newItem, projects);
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
    //DELETE FORM
    const cancelDelBtn = getEl('cancel-del-btn');
    const confirmDelBtn = getEl('confirm-del-btn');
    const deleteDialog = getEl('delete-dialog');
    //const viewOptions = getEl('view-options');

    cancelDelBtn.addEventListener('click', () => {
        toggleHidden(deleteDialog);
    })
    confirmDelBtn.addEventListener('click', () => {
        deleteTask(currentTask);
        displayTasks(viewOptions.value);
        toggleHidden(deleteDialog);
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

    //ADD CATEGORY
    const categoryInputs = queryAll('.task-category-select');
    const addCategoryForm = getEl('add-category-form')

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                toggleHidden(addCategoryForm);
            }
            else {
                updateTask(input, 'category');
            }
        })
    })

    //ADD PROJECT
    const projectInputs = queryAll('.task-project-select');
    const addProjectForm = getEl('add-project-form')

    projectInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                toggleHidden(addProjectForm);
            }
            else {
                updateTask(input, 'project');
            }
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
                currentBasicDiv.style.color = 'red';
                break;
            case '2-Medium':
                currentBasicDiv.style.color = 'orange';
                break;
            case '3-Low':
                currentBasicDiv.style.color = 'green';
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
            let property = subdiv.dataset.property;

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

    //OPEN DELETE FORM
    const deleteDialog = getEl('delete-dialog');
    const deleteBtns = queryAll('.delete-btn');

    deleteBtns.forEach(button => {
        button.addEventListener('click', () => {
            toggleHidden(deleteDialog);
            currentTask = button.dataset.index;
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