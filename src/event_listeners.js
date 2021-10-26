import { addNewTaskToList, changeTaskStatus, deleteTask, storeTaskList } from './task_logic';
import { displayTasks } from './task_DOM'
import { taskList } from './index'

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