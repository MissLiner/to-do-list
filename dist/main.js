/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("//use factories to create list items\n//create separate lists by category/project (defaut on first entry)\n// - users can create new projects, choose which project to assign a task to    \n//properties for each item -title, description, dueDate, priority. You might also want to include notes or even a checklist.)\n//use local storage to save projects and tasks between sessions\n//use date-fns to format dates and times\n\n//UI:\n// 1. view all projects\n// 2. view to-dos in each project (title, due date, color code for priority)\n// 3. expand single task to view and edit details\n// 4. delete task\n\n//MODULES:\n\n// 2. create-task\n//      -POP-UP window form\n//      -active task array to hold tasks\n//      1. assign or create category\n//      2. enter name & description\n//      3. assign due date\n//      4. choose priority level\n//      5. add notes\n//      6. add completion status\n//      7. add new task to screen\n//      8. hide create-task pop-up window\n// 3. complete-task\n//      1. change task status to completed\n//      2. change text and formatting to show it is completed\n//      3. create completed task list \n//      4. remove completed task from active task list\n//      5. if task is already completed, toggle back to active task list\n// 4. Assign priority\n\n\n\nconst content = document.getElementById('content-div');\n\n//App title\nconst title = document.createElement('h1');\ntitle.id = 'title-div';\ntitle.textContent = 'Can-Do List';\ncontent.appendChild(title);\n\n//Button to add new task\nconst addTaskBtn = document.createElement('button');\naddTaskBtn.id = 'add-task-btn';\naddTaskBtn.textContent = 'Add Task';\ncontent.appendChild('addTaskBtn');\n\n//          a. event listener to trigger add-task module\n//        -default category title (click to edit?)\n//        -task\n//          -name\n//          -description\n//          -category?\n//          -due date\n//          -priority\n//          -notes\n//          -checkbox\n//      3. Hidden add-task pop-up\n//          -name\n//          -description\n//          -category?\n//          -due date\n//          -priority\n//          -notes\n//      4. event listener on checkboxes to trigger complete-task module\n\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;