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
    function hide(element) {
        element.classList.add('hidden');
    }
    function show(element) {
        element.classList.remove('hidden');
    }
    function hideAndClear(form) {
        hide(form);
        form.reset();
    }

    //MENU BAR
    const menuBar = getEl('menu-bar');
    const editBtn = getEl('edit-btn');
    const editMenu = getEl('edit-menu');
    const sortBtn = getEl('sort-btn');
    const sortMenu = getEl('sort-menu');
    const helpBtn = getEl('help-btn');

    function toggleHidden(elem) {
        if (elem.classList.contains('hidden')) {
            elem.classList.remove('hidden');
        }
        else (elem.classList.add('hidden'));
    }

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
        if (newTaskForm.classList.contains('hidden')) {
            show(newTaskForm);
        }
        else {
            hideAndClear(newTaskForm);
        }
    });

    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();

        addNewTaskToList();
        hideAndClear(newTaskForm);
        displayTasks(viewOptions.value);
    })

    cancelNewTaskBtn.addEventListener('click', () => hideAndClear(newTaskForm));

    //ADD NEW CATEGORY
    const categoryInput = getEl('category-field');
    const addCategoryForm = getEl('add-category-form');
    const addCategoryBtn = getEl('add-category-btn');
    const cancelAddCatBtn = getEl('cancel-add-cat-btn');
    const addCategoryInput = getEl('add-category-input');


    categoryInput.addEventListener('change', () => {
        if (categoryInput.value === 'Add new') {
            show(addCategoryForm);
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
        hide(addCategoryForm);
    })
    cancelAddCatBtn.addEventListener('click', () => {
        addCategoryInput.value = '';
        hide(addCategoryForm);
    })

    //ADD NEW PROJECT
    const projectInput = getEl('project-field');
    const addProjectForm = getEl('add-project-form');
    const addProjectBtn = getEl('add-project-btn');
    const cancelAddProjBtn = getEl('cancel-add-proj-btn');

    projectInput.addEventListener('change', () => {
        if (projectInput.value == 'Add new') {
            show(addProjectForm);
        }
    })

    addProjectBtn.addEventListener('click', () => {
            const newItem = getEl('add-project-input').value;
            const projectInputs = queryAll('.task-project-select');

            addItemToArray(newItem, projects);
            hide(addProjectForm);
            createDropdown(projects, 'project-field');
            projectInputs.forEach(input => {
                createDropdown(projects, input.id);
            })
    })
    cancelAddProjBtn.addEventListener('click', () => {
        hide(addProjectForm);
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
            if (completeDiv.classList.contains('hidden')) {
                show(completeDiv);
            }
            else {
                hide(completeDiv);
            }
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
    function hide(element) {
        element.classList.add('hidden');
    }
    function show(element) {
        element.classList.remove('hidden');
    }

    let currentTask;

    //ADD CATEGORY
    const categoryInputs = queryAll('.task-category-select');
    const addCategoryForm = getEl('add-category-form')

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                show(addCategoryForm);
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
                show(addProjectForm);
            }
            else {
                updateTask(input, 'project');
            }
        })
    })

    //EXPAND TASK
    const taskDetailDivs = queryAll('.task-detail-div');
    const taskNameDivs = queryAll('.task-name');
    const taskDateDivs = queryAll('.task-duedate');
    const editDateDivs = queryAll('.edit-date-div');

    function expandTask() {
        taskNameDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                div.contentEditable = 'true';
            }
        })
        taskDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                hide(div);
            } 
        })
        editDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                show(div);
            }
        })
        taskDetailDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                const children = div.childNodes;
                children.forEach(child => {
                    show(child);
                })
            }
        })
    }

    function collapseTask() {
        taskNameDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                div.contentEditable = 'false';
            }
        })
        taskDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                show(div);
            } 
        })
        editDateDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                hide(div);
            }
        })
        taskDetailDivs.forEach(div => {
            if (div.classList.contains(currentTask)) {
                const children = div.childNodes;
                children.forEach(child => {
                    hide(child);
                })
            }
        })
    }

    queryAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.value == currentTask) {
                collapseTask();
                currentTask = 'none';
            }
            else {
                taskList.forEach(task => {
                    currentTask = task.index;
                    collapseTask();
                })
                currentTask = button.value;
                expandTask();
            }
        })
    })

    //EDIT TASK
    const taskBasicDivs = queryAll('.task-basic-div');
    const taskSubDivs = queryAll('.task-subdiv');

    function colorCode(input, div) {
        switch(input.value) {
            case '1-High':
                div.style.color = 'red';
                break;
            case '2-Medium':
                div.style.color = 'orange';
                break;
            case '3-Low':
                div.style.color = 'green';
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
            
            let currentBasicDiv;
            taskBasicDivs.forEach(div => {
                if (div.classList.contains(currentTask)) {
                    currentBasicDiv = div;
                }
            })
            if (subdiv.dataset.property == 'priority') {
                colorCode(subdiv, currentBasicDiv);
            }

            let currentDateDiv;
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
            show(deleteDialog);
            currentTask = button.value;
        })
    })

    getEl('abort-del-btn').addEventListener('click', () => {
        hide(deleteDialog);
    })

    const viewOptions = getEl('view-options');
    getEl('confirm-del-btn').addEventListener('click', () => {
        deleteTask(currentTask);
        displayTasks(viewOptions.value);
        hide(deleteDialog);
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