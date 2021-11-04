import { addItemToArray, addNewTaskToList, completeTask, deleteTask, updateTask } from './task_logic';
import { createDropdown, displayTasks } from './task_DOM'
import { categories, projects, taskList } from './index'
import  formatRelative  from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';

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

    menuBar.addEventListener('click', () => {
        if (event.target === editBtn) {
            toggleHidden(editMenu);
        }
        if (event.target === sortBtn) {
            toggleHidden(sortMenu);
        }
        if (event.target === helpBtn) {
            alert('Help you?!? I\'m barely keeping my own shit together. Sorry buddy!')
        }
    })

    //ADD NEW TASK
    const newTaskBtn = getEl('new-task-btn');
    const newTaskForm = getEl('new-task-form');
    const cancelNewTaskBtn = getEl('cancel-new-task-btn');

    newTaskBtn.addEventListener('click', () => {
        toggleHidden(newTaskForm);
        newTaskForm.reset();
    });

    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();

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
    const categoryInput = getEl('category-field');
    const addCategoryForm = getEl('add-category-form');
    const addCategoryBtn = getEl('add-category-btn');
    const cancelAddCatBtn = getEl('cancel-add-cat-btn');
    const addCategoryInput = getEl('add-category-input');


    categoryInput.addEventListener('change', () => {
        if (categoryInput.value === 'Add new') {
            toggleHidden(addCategoryForm);
        }
    })

    addCategoryBtn.addEventListener('click', () => {
        const newItem = addCategoryInput.value;
        const categoryInputs = queryAll('.task-category-select');

        addItemToArray(newItem, categories);
        categoryInputs.forEach(input => {
            createDropdown(categories, input.id);
        })
        addCategoryInput.textContent = '';
        toggleHidden(addCategoryForm);
    })
    cancelAddCatBtn.addEventListener('click', () => {
        addCategoryInput.value = '';
        toggleHidden(addCategoryForm);
    })

    //ADD NEW PROJECT
    const projectInput = getEl('project-field');
    const addProjectForm = getEl('add-project-form');
    const addProjectBtn = getEl('add-project-btn');
    const cancelAddProjBtn = getEl('cancel-add-proj-btn');

    projectInput.addEventListener('change', () => {
        if (projectInput.value == 'Add new') {
            toggleHidden(addProjectForm);
        }
    })

    addProjectBtn.addEventListener('click', () => {
            const newItem = getEl('add-project-input').value;
            const projectInputs = queryAll('.task-project-select');

            addItemToArray(newItem, projects);
            toggleHidden(addProjectForm);
            createDropdown(projects, 'project-field');
            projectInputs.forEach(input => {
                createDropdown(projects, input.id);
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

    let currentTask;

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
            if (div.classList.contains(currentTask)) {
                div.contentEditable = 'true';
            }
        })
        taskDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                toggleHidden(div);
            } 
        })
        editDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                toggleHidden(div);
            }
        })
        taskDetailDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                const children = div.childNodes;
                children.forEach(child => {
                    toggleHidden(child);
                })
            }
        })
    }

    queryAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.value == currentTask) {
                toggleTask();
                currentTask = 'none';
            }
            else {
                toggleTask();
                currentTask = button.value;
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
            let property = subdiv.dataset.property;
            updateTask(subdiv, property);
            
            taskBasicDivs.forEach(div => {
                if (div.classList.contains(currentTask)) {
                    currentBasicDiv = div;
                }
            })
            if (property == 'priority') {
                colorCode(subdiv);
            }
            taskDateDivs.forEach(div => {
                if (div.classList.contains(currentTask)) {
                    currentDateDiv = div;
                }
            })
            if (subdiv.dataset.property == 'duedate') {
                updateDay(subdiv, currentDateDiv);
            }
        })
    })

    //DELETE TASK
    const deleteDialog = getEl('delete-dialog');

    queryAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            toggleHidden(deleteDialog);
            currentTask = button.value;
        })
    })

    getEl('abort-del-btn').addEventListener('click', () => {
        toggleHidden(deleteDialog);
    })

    const viewOptions = getEl('view-options');
    getEl('confirm-del-btn').addEventListener('click', () => {
        deleteTask(currentTask);
        displayTasks(viewOptions.value);
        toggleHidden(deleteDialog);
    })

    //COMPLETE TASK
    queryAll('.task-checkbox').forEach(box => {
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