import { addItemToArray, addNewTaskToList, completeTask, deleteTask, storeLists } from './task_logic';
import { createDropdown, displayTasks } from './task_DOM'
import { categories, projects } from './index'

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
    //ADD NEW TASK
    const newTaskBtn = getEl('new-task-btn');
    const newTaskForm = getEl('new-task-form');
    const cancelNewTaskBtn = getEl('cancel-new-task-btn');

    newTaskBtn.addEventListener('click', () => {
        if (newTaskForm.classList.contains('hidden')) {
            newTaskForm.classList.remove('hidden');
        }
        else {
            hide(newTaskForm);
        }
    });

    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();
        hide(newTaskForm);

        addNewTaskToList();
        storeLists();
        displayTasks(viewOptions.value);
    })

    cancelNewTaskBtn.addEventListener('click', () => hide(newTaskForm));

    //ADD NEW CATEGORY
    const categoryInput = getEl('category-field');
    const addCategoryForm = getEl('add-category-form');
    const addCategoryBtn = getEl('add-category-btn');
    const cancelAddCatBtn = getEl('cancel-add-cat-btn');
    const addCategoryInput = getEl('add-category-input');


    categoryInput.addEventListener('change', () => {
        if (categoryInput.value === 'add-new') {
            addCategoryForm.classList.remove('hidden');
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
            addProjectForm.classList.remove('hidden');
        }
    })

    addProjectBtn.addEventListener('click', () => {
            const newItem = getEl('add-project-input').value;
            const projectInputs = queryAll('.task-project-field');

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
                completeDiv.classList.remove('hidden');
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
                addCategoryForm.classList.remove('hidden');
            }
            else {

            }
        })
    })

    //ADD PROJECT
    const projectInputs = queryAll('.task-project-field');
    const addProjectForm = getEl('add-project-form')

    projectInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                addProjectForm.classList.remove('hidden');
            }
        })
    })

    //EXPAND TASK
    const taskDetailDivs = queryAll('.task-detail-div');

    queryAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentTask = button.value;
            taskDetailDivs.forEach(div => {
                if (div.classList.contains(button.value) && div.style.display === 'none') {
                    div.style = 'display: grid';
                }
                else div.style = 'display: none !important';
            })
        })
    })

    //DELETE TASK
    const deleteDialog = getEl('delete-dialog');

    queryAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            deleteDialog.classList.remove('hidden');
            currentTask = button.value;
        })
    })

    getEl('abort-del-btn').addEventListener('click', () => {
        hide(deleteDialog);
    })

    const viewOptions = getEl('view-options');
    getEl('confirm-del-btn').addEventListener('click', () => {
        deleteTask(currentTask);
        storeLists();
        displayTasks(viewOptions.value);
        hide(deleteDialog);
    })

    //COMPLETE TASK
    queryAll('.task-checkbox').forEach(box => {
        box.addEventListener('change', () => {
            completeTask(box);
            storeLists();
            displayTasks(viewOptions.value);
        })
    })

 
}
export {
    loadBaseListeners,
    loadTaskListeners,
}