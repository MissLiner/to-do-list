import { addItemToArray, addNewTaskToList, changeTaskStatus, deleteTask, storeTaskList } from './task_logic';
import { createDropdown, displayTasks } from './task_DOM'
import { categories, projects } from './index'

function loadBaseListeners() {
    const newTaskBtn = document.getElementById('new-task-btn');
    const clearStorageBtn = document.getElementById('clear-storage-btn');
    const newTaskForm = document.getElementById('new-task-form');
    const viewMenu = document.getElementById('view-menu');

    //local storage - clear
    clearStorageBtn.addEventListener('click', () => {
        localStorage.clear();
    })

    //display - new task form
    newTaskBtn.addEventListener('click', () => {
        if (newTaskForm.classList.contains('hidden')) {
            newTaskForm.classList.remove('hidden');
        }
        else {
            newTaskForm.classList.add('hidden')
        }
    });

    //add new category
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
        addCategoryForm.classList.add('hidden');
        createDropdown(categories, 'category-field');
})


    // document.querySelectorAll('.add-btn').forEach(button => {
    //     button.addEventListener('click', () => {
    //         const newItemName = button.name;
    //         const newItem = document.getElementById(newItemName).value;
    //         const arr = JSON.parse(button.name);
    //         //const arr = eval(arrString);
    //         addItemToArray(newItem, arr);
    //     })
    // })
    //add new project
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

    //task listener - add new task
    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();
        newTaskForm.classList.add('hidden');

        addNewTaskToList();
        storeTaskList();
        displayTasks(viewMenu.value);
    })
}

function loadTaskListeners() {
    const viewMenu = document.getElementById('view-menu');
    const deleteDialog = document.getElementById('delete-dialog');
    let currentTask;

    //task listener - delete task
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
        storeTaskList();
        displayTasks(viewMenu.value);
        deleteDialog.classList.add('hidden');
    })

    //task listener - complete task
    document.querySelectorAll('.task-checkbox').forEach((box) => {
        box.addEventListener('change', () => {
            changeTaskStatus(box, 'Complete');
            storeTaskList();
            displayTasks(viewMenu.value);
        })
    })

    //task listener - change view
    viewMenu.addEventListener('change', () => {
        displayTasks(viewMenu.value);
    })
}
export {
    loadBaseListeners,
    loadTaskListeners,
}