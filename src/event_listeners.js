import { addItemToArray, addNewTaskToList, completeTask, changeTaskStatus, deleteTask, storeLists } from './task_logic';
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
    
    const addCategoryForm = document.getElementById('add-category-form');

    categoryInput.addEventListener('change', () => {
        if (categoryInput.value === 'add-new') {
            addCategoryForm.classList.remove('hidden');
        }
    })

    document.getElementById('add-category-btn').addEventListener('click', () => {
        const newItem = document.getElementById('add-category-input').value;
        const categoryInputs = document.querySelectorAll('.task-category-field');
        addItemToArray(newItem, categories);
        createDropdown(categories, 'category-field');
        categoryInputs.forEach(input => {
            createDropdown(categories, input.id);
        })
        addCategoryForm.classList.add('hidden');
})

    //ADD NEW PROJECT
    const projectInput = document.getElementById('project-field');

    const addProjectForm = document.getElementById('add-project-form');


    projectInput.addEventListener('change', () => {
        if (projectInput.value == 'Add new') {
            addProjectForm.classList.remove('hidden');
        }
    })

    document.getElementById('add-project-btn').addEventListener('click', () => {
            const newItem = document.getElementById('add-project-input').value;
            const projectInputs = document.querySelectorAll('.task-project-field');

            addItemToArray(newItem, projects);
            addProjectForm.classList.add('hidden');
            createDropdown(projects, 'project-field');
            projectInputs.forEach(input => {
                createDropdown(projects, input.id);
            })
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

    const categoryInputs = document.querySelectorAll('.task-category-field');
    const addCategoryForm = document.getElementById('add-category-form')

    const projectInputs = document.querySelectorAll('.task-project-field');
    const addProjectForm = document.getElementById('add-project-form')
    
    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                addCategoryForm.classList.remove('hidden');
            }
            else {

            }
        })
    })

    projectInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Add new') {
                addProjectForm.classList.remove('hidden');
            }
        })
    })

    //EXPAND TASK
    document.querySelectorAll('.expand-btn').forEach(button => {
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

    //SAVE CHANGES TO TASK
    // document.querySelectorAll('.task-detail-subdiv').forEach(div => {
    //     div.addEventListener('input', () => {
    //         console.log('jj');
    //         changeTaskStatus(div, input.value);
    //         storeLists();
    //     })
    // })

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
    document.querySelectorAll('.task-checkbox').forEach(box => {
        box.addEventListener('change', () => {
            completeTask(box);
            // changeTaskStatus(box, 'Complete');
            // storeLists();
            // displayTasks(viewMenu.value);
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