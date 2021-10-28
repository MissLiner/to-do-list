import { addItemToArray, addNewTaskToList, changeTaskStatus, deleteTask, storeLists } from './task_logic';
import { createDropdown, displayTasks } from './task_DOM'
import { categories, projects } from './index'

function loadBaseListeners() {
    const newTaskBtn = document.getElementById('new-task-btn');
    const newTaskForm = document.getElementById('new-task-form');
    const viewMenu = document.getElementById('view-menu');

    //OPEN NEW TASK FORM
    newTaskBtn.addEventListener('click', () => {
        if (newTaskForm.classList.contains('hidden')) {
            newTaskForm.classList.remove('hidden');
        }
        else {
            newTaskForm.classList.add('hidden')
        }
    });

    //ADD NEW CATEGORY
    const categoryInput = document.getElementById('category-field');
    const addCategoryForm = document.getElementById('add-category-form')
    categoryInput.addEventListener('change', () => {
        if (categoryInput.value === 'add-new') {
            document.getElementById('add-category-form').classList.remove('hidden');
        }
    })

    document.getElementById('add-category-btn').addEventListener('click', () => {
        const newItem = document.getElementById('add-category-input').value;
        addItemToArray(newItem, categories);
        createDropdown(categories, 'category-field');
        addCategoryForm.classList.add('hidden');
})

    //ADD NEW PROJECT
    const projectInput = document.getElementById('project-field');
    const addProjectForm = document.getElementById('add-project-form')

    projectInput.addEventListener('change', () => {
        if (projectInput.value == 'Add new') {
            addProjectForm.classList.remove('hidden');
        }
    })

    document.getElementById('add-project-btn').addEventListener('click', () => {
            const newItem = document.getElementById('add-project-input').value;
            addItemToArray(newItem, projects);
            addProjectForm.classList.add('hidden');
            createDropdown(projects, 'project-field');
    })

    //ADD NEW TASK
    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();
        newTaskForm.classList.add('hidden');

        addNewTaskToList();
        storeLists();
        displayTasks(viewMenu.value);
    })
}

function loadTaskListeners() {
    const viewMenu = document.getElementById('view-menu');
    const deleteDialog = document.getElementById('delete-dialog');
    const taskDetailDivs = document.querySelectorAll('.task-detail-div');
    let currentTask;

    //EXPAND TASK
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            taskDetailDivs.forEach(div => {
                if (div.value == button.value && div.style.display === 'none') {
                    div.style = 'display: flex';
                }
                else div.style = 'display: none';
            })
        })
    })

    //SAVE CHANGES TO TASK
    document.querySelectorAll('.task-detail-subdiv').forEach(div => {
        div.addEventListener('input', () => {
            storeLists();
        })
    })

    //DELETE TASK
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            deleteDialog.classList.remove('hidden');
            currentTask = button.value;
        })
    })
    
    document.getElementById('abort-delete-btn').addEventListener('click', () => {
        deleteDialog.classList.add('hidden');
    })

    document.getElementById('confirm-delete-btn').addEventListener('click', () => {
        deleteTask(currentTask);
        storeLists();
        displayTasks(viewMenu.value);
        deleteDialog.classList.add('hidden');
    })

    //COMPLETE TASK
    document.querySelectorAll('.task-checkbox').forEach((box) => {
        box.addEventListener('change', () => {
            changeTaskStatus(box, 'Complete');
            storeLists();
            displayTasks(viewMenu.value);
        })
    })

    //CHANGE VIEW
    viewMenu.addEventListener('change', () => {
        displayTasks(viewMenu.value);
    })
}
export {
    loadBaseListeners,
    loadTaskListeners,
}