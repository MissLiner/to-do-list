function loadEventListeners() {

    const newTaskBtn = document.getElementById('new-task-btn');
    const clearStorageBtn = document.getElementById('clear-storage-btn');
    const newTaskForm = document.getElementById('new-task-form');
    
    //local storage - store
    function storeTaskList() {
        window.localStorage.clear();
        window.localStorage.setItem('taskList', JSON.stringify(taskList));
    }

    //local storage - clear
    clearStorageBtn.addEventListener('click', () => {
        localStorage.clear();
    })

    //display - new task form
    newTaskBtn.addEventListener('click', () => {
        newTaskForm.classList.remove('hidden');
    });

    //task listener - add new task
    newTaskForm.addEventListener('submit', () => {
        event.preventDefault();
        newTaskForm.classList.add('hidden');

        addNewTaskToList();
        storeTaskList();
        displayTasks('status');
    })

    //task listener - delete task
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            changeTaskStatus(button, 'Deleted');
            storeTaskList();
            displayTasks('status');
        })
    })

    //task listener - complete task
    document.querySelectorAll('.task-checkbox').forEach((box) => {
        box.addEventListener('change', () => {
            changeTaskStatus(box, 'Complete');
            storeTaskList();
            displayTasks(document.getElementById('view-menu').value);
        })
    })

    //task listener - change view
    document.getElementById('view-menu').addEventListener('change', () => {
        displayTasks(event.target.value);
    })
}
export {
    loadEventListeners,
}