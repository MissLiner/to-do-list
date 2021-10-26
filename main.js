/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n    margin: auto;\\n    text-align: center;\\n}\\n\\nh1 {\\n    padding-top: 20px;\\n    text-align: center;\\n}\\n.category-div {\\n    padding-bottom: 20px;\\n}\\n.hidden {\\n    display: none;\\n}\\n.task-div {\\n    display: flex;\\n    width: 500px;\\n}\\n.task-sub-div {\\n    flex: 1 1 0;\\n}\\n#clear-storage-btn {\\n    bottom: 0;\\n    position: absolute;\\n}\\n#new-task-btn {\\n    margin: auto;\\n    margin-top: 10px;\\n    margin-bottom: 20px;\\n}\\n#view-btn-div {\\n    position: absolute;\\n    left: 0;\\n    top: 40px;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://to-do-list/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var _i = 0; _i < this.length; _i++) {\n        var id = this[_i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i2 = 0; _i2 < modules.length; _i2++) {\n      var item = [].concat(modules[_i2]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://to-do-list/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/event_listeners.js":
/*!********************************!*\
  !*** ./src/event_listeners.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadBaseListeners\": () => (/* binding */ loadBaseListeners),\n/* harmony export */   \"loadTaskListeners\": () => (/* binding */ loadTaskListeners)\n/* harmony export */ });\n/* harmony import */ var _task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task_logic */ \"./src/task_logic.js\");\n/* harmony import */ var _task_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task_DOM */ \"./src/task_DOM.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\n\nfunction loadBaseListeners() {\n    const newTaskBtn = document.getElementById('new-task-btn');\n    const clearStorageBtn = document.getElementById('clear-storage-btn');\n    const newTaskForm = document.getElementById('new-task-form');\n    const viewMenu = document.getElementById('view-menu');\n\n    //local storage - clear\n    clearStorageBtn.addEventListener('click', () => {\n        localStorage.clear();\n    })\n\n    //display - new task form\n    newTaskBtn.addEventListener('click', () => {\n        if (newTaskForm.classList.contains('hidden')) {\n            newTaskForm.classList.remove('hidden');\n        }\n        else {\n            newTaskForm.classList.add('hidden')\n        }\n    });\n\n    //add new category\n    const categoryInput = document.getElementById('category-field');\n    const addCategoryForm = document.getElementById('add-category-form')\n    categoryInput.addEventListener('change', () => {\n        if (categoryInput.value === 'add-new') {\n            document.getElementById('add-category-form').classList.remove('hidden');\n        }\n    })\n\n    document.getElementById('add-category-btn').addEventListener('click', () => {\n        const newItem = document.getElementById('add-category-input').value;\n        (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.addItemToArray)(newItem, _index__WEBPACK_IMPORTED_MODULE_2__.categories);\n        addCategoryForm.classList.add('hidden');\n        (0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.createDropdown)(_index__WEBPACK_IMPORTED_MODULE_2__.categories, 'category-field');\n})\n\n\n    // document.querySelectorAll('.add-btn').forEach(button => {\n    //     button.addEventListener('click', () => {\n    //         const newItemName = button.name;\n    //         const newItem = document.getElementById(newItemName).value;\n    //         const arr = JSON.parse(button.name);\n    //         //const arr = eval(arrString);\n    //         addItemToArray(newItem, arr);\n    //     })\n    // })\n    //add new project\n    const projectInput = document.getElementById('project-field');\n    const addProjectForm = document.getElementById('add-project-form')\n\n    projectInput.addEventListener('change', () => {\n        if (projectInput.value == 'Add new') {\n            addProjectForm.classList.remove('hidden');\n        }\n    })\n\n    document.getElementById('add-project-btn').addEventListener('click', () => {\n            const newItem = document.getElementById('add-project-input').value;\n            (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.addItemToArray)(newItem, _index__WEBPACK_IMPORTED_MODULE_2__.projects);\n            addProjectForm.classList.add('hidden');\n            (0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.createDropdown)(_index__WEBPACK_IMPORTED_MODULE_2__.projects, 'project-field');\n    })\n\n    //task listener - add new task\n    newTaskForm.addEventListener('submit', () => {\n        event.preventDefault();\n        newTaskForm.classList.add('hidden');\n\n        (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.addNewTaskToList)();\n        (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.storeTaskList)();\n        (0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(viewMenu.value);\n    })\n}\n\nfunction loadTaskListeners() {\n    const viewMenu = document.getElementById('view-menu');\n    const deleteDialog = document.getElementById('delete-dialog');\n    let currentTask;\n\n    //task listener - delete task\n    document.querySelectorAll('.delete-btn').forEach(button => {\n        button.addEventListener('click', () => {\n            deleteDialog.classList.remove('hidden');\n            currentTask = button.value;\n        })\n    })\n    document.getElementById('abort-delete-btn').addEventListener('click', () => {\n        deleteDialog.classList.add('hidden');\n    })\n\n    document.getElementById('confirm-delete-btn').addEventListener('click', () => {\n        ;(0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(currentTask);\n        (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.storeTaskList)();\n        (0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(viewMenu.value);\n        deleteDialog.classList.add('hidden');\n    })\n\n    //task listener - complete task\n    document.querySelectorAll('.task-checkbox').forEach((box) => {\n        box.addEventListener('change', () => {\n            ;(0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.changeTaskStatus)(box, 'Complete');\n            (0,_task_logic__WEBPACK_IMPORTED_MODULE_0__.storeTaskList)();\n            (0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(viewMenu.value);\n        })\n    })\n\n    //task listener - change view\n    viewMenu.addEventListener('change', () => {\n        ;(0,_task_DOM__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(viewMenu.value);\n    })\n}\n\n\n//# sourceURL=webpack://to-do-list/./src/event_listeners.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskList\": () => (/* binding */ taskList),\n/* harmony export */   \"content\": () => (/* binding */ content),\n/* harmony export */   \"categories\": () => (/* binding */ categories),\n/* harmony export */   \"projects\": () => (/* binding */ projects)\n/* harmony export */ });\n/* harmony import */ var _event_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event_listeners */ \"./src/event_listeners.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _task_DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task_DOM */ \"./src/task_DOM.js\");\n//use factories to create list items\n//create separate lists by category/project (defaut on first entry)\n// - users can create new projects, choose which project to assign a task to    \n//use date-fns to format dates and times\n\n//UI:\n// 1. view all projects\n// 2. view to-dos in each project (title, due date, color code for priority)\n// 3. expand single task to view and edit details\n// 4. delete task\n\n// 4. Assign priority\n\n\n \n\n\n\n\nlet taskList = [];\nlet categories = ['Home', 'Work', 'Self-Care', 'Pets', 'Kids'];\nlet projects = ['Update kitchen', 'AB anxiety'];\n\nconst content = document.getElementById('content-div');\n\n//local storage - retrieve\n(function getListFromStorage() {\n    if (localStorage.getItem('taskList')) {\n        let storedList = JSON.parse(window.localStorage.getItem('taskList'));\n        taskList = storedList;\n        console.table(taskList);\n    }\n})()\n\n;(0,_event_listeners__WEBPACK_IMPORTED_MODULE_0__.loadBaseListeners)();\n(0,_task_DOM__WEBPACK_IMPORTED_MODULE_2__.displayTasks)('status');\n(0,_task_DOM__WEBPACK_IMPORTED_MODULE_2__.createDropdown)(categories, 'category-field');\n(0,_task_DOM__WEBPACK_IMPORTED_MODULE_2__.createDropdown)(projects, 'project-field');\n\n\n\n//default category (should I move to HTML?)\n// const category1 = document.createElement('h2');\n// category1.classList.add('category-name');\n// category1.textContent = 'Main List';\n// content.prepend(category1);\n\n//title\n// const title = document.createElement('h1');\n// title.id = 'title-div';\n// title.textContent = 'Can-Do List';\n// content.appendChild(title);\n//new-task-btn\n// const addTaskBtn = document.createElement('button');\n// addTaskBtn.id = 'add-task-btn';\n// addTaskBtn.textContent = 'Add Task';\n// content.appendChild(addTaskBtn);\n//new task pop-up\n// const newTaskForm = document.createElement('form');\n// newTaskForm.id = 'new-task-form';\n// content.appendChild(newTaskForm);\n// const nameField = document.createElement('input');\n// addTaskField(nameField);\n// nameField.name = 'name';\n// newTaskForm.appendChild(nameField);\n// const descField = document.createElement('input');\n// descField.name = 'description';\n// newTaskForm.appendChild(descField);\n// const categoryField = document.createElement('input');\n// categoryField.name = 'category';\n// newTaskForm.appendChild(categoryField);\n// //add dropdown datalist to category later\n// const dueDateField = document.createElement('input');\n// dueDateField.name = 'duedate';\n// dueDateField.type = 'date';\n// newTaskForm.appendChild(dueDateField);\n// const priorityField = document.createElement('select');\n// priorityField.name = 'priority';\n// newTaskForm.appendChild(priorityField);\n// const priorityLabel = document.createElement('label');\n// priorityLabel.id = 'priority-label';\n// priorityLabel.htmlFor = 'priority-field';\n// newTaskForm.appendChild(priorityLabel);\n// const notesField = document.createElement('input');\n// notesField.name = 'notes';\n// newTaskForm.appendChild(notesField);\n// const submitTaskBtn = document.createElement('input');\n// submitTaskBtn.id = 'submit-task-btn';\n// submitTaskBtn.type = 'button'; \n// submitTaskBtn.value = 'Submit';\n// newTaskForm.appendChild(submitTaskBtn);\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/task_DOM.js":
/*!*************************!*\
  !*** ./src/task_DOM.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayTasks\": () => (/* binding */ displayTasks),\n/* harmony export */   \"createDropdown\": () => (/* binding */ createDropdown)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _event_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_listeners */ \"./src/event_listeners.js\");\n\n\n\n\nfunction displayTasks(property) {\n    (function clearTaskDisplay() {\n        while (_index_js__WEBPACK_IMPORTED_MODULE_0__.content.firstChild) {\n            _index_js__WEBPACK_IMPORTED_MODULE_0__.content.removeChild(_index_js__WEBPACK_IMPORTED_MODULE_0__.content.firstChild);\n        } \n    })()\n\n    if (_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList) {\n        function createCategoryDiv(category) {\n            const categoryDiv = document.createElement('div');\n            categoryDiv.classList.add('category-div');\n        \n            function addCategoryTitle(category) {\n                const categoryTitle = document.createElement('h2');\n                categoryTitle.classList.add('category-title');\n                categoryTitle.textContent = category;\n                categoryDiv.appendChild(categoryTitle);\n            } \n            addCategoryTitle(category);\n\n            function addTasksToCategory(property) {\n                for (let i = 0; i < _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.length; i++) {\n                    if (_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i][property] === category) {\n                        function createCheckbox() {\n                            const taskCheckbox = document.createElement('input');\n                            taskCheckbox.type = 'checkbox';\n                            taskCheckbox.classList.add('task-checkbox');\n                            taskCheckbox.value = _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i].index;\n                            taskDiv.appendChild(taskCheckbox);\n                        }\n                        function createTaskSubDiv(key) {\n                            let taskSubDiv = document.createElement('div');\n                            taskSubDiv.classList.add('task-sub-div');\n                            taskSubDiv.textContent = _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i][key];\n                            taskDiv.appendChild(taskSubDiv);\n                        }\n                        function createDeleteBtn() {\n                            const deleteBtn = document.createElement('button');\n                            deleteBtn.classList.add('delete-btn');\n                            deleteBtn.value = _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i].index;\n                            deleteBtn.insertAdjacentHTML('beforeend', '<i class=\"far fa-trash-alt\"></i>' );\n                            taskDiv.appendChild(deleteBtn);\n                        }\n\n                        const taskDiv = document.createElement('div');\n                        taskDiv.classList.add('task-div');\n\n                        createCheckbox();\n                        createTaskSubDiv('name');\n                        createTaskSubDiv('duedate');\n                        createTaskSubDiv('category');\n                        createDeleteBtn();\n\n                        if (_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i].status === 'Active') {\n                            switch(_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList[i].priority) {\n                                case 'High':\n                                    taskDiv.style.color = 'red';\n                                    break;\n                                case 'Medium':\n                                    taskDiv.style.color = 'orange';\n                                    break;\n                                case 'Low':\n                                    taskDiv.style.color = 'green';\n                                    break;\n                            }\n                        }\n                        categoryDiv.appendChild(taskDiv);\n                    }\n                }\n            }\n            addTasksToCategory(property);\n            _index_js__WEBPACK_IMPORTED_MODULE_0__.content.appendChild(categoryDiv);\n        }\n        //create category lists for different views\n        let propertyValues = [];\n\n        function getUniqueValues(arr, prop) {\n            const allValues = [];\n            for (let i = 0; i < arr.length; i++) {\n                allValues.push(arr[i][prop]);\n            }\n            propertyValues = [...new Set(allValues)];\n        }\n        getUniqueValues(_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList, property);\n\n        propertyValues.forEach(value => createCategoryDiv(value));\n    }\n    (0,_event_listeners__WEBPACK_IMPORTED_MODULE_1__.loadTaskListeners)();\n}\n\nfunction createDropdown(arr, elementID) {\n    const mainField = document.getElementById(elementID);\n    arr.forEach(item => {\n        const option = document.createElement('option');\n        option.class = 'dropdown-item';\n        option.value = item;\n        option.textContent = item;\n        mainField.appendChild(option);\n\n    })\n}\n\n\n\n\n//# sourceURL=webpack://to-do-list/./src/task_DOM.js?");

/***/ }),

/***/ "./src/task_logic.js":
/*!***************************!*\
  !*** ./src/task_logic.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addNewTaskToList\": () => (/* binding */ addNewTaskToList),\n/* harmony export */   \"changeTaskStatus\": () => (/* binding */ changeTaskStatus),\n/* harmony export */   \"deleteTask\": () => (/* binding */ deleteTask),\n/* harmony export */   \"storeTaskList\": () => (/* binding */ storeTaskList),\n/* harmony export */   \"addItemToArray\": () => (/* binding */ addItemToArray)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n// 2. create-task\n//      -POP-UP window form\n//      -active task array to hold tasks\n//      1. assign or create category\n//      2. enter name & description\n//      3. assign due date\n//      4. choose priority level\n//      5. add notes\n//      6. add completion status\n//      7. add new task to screen\n//      8. hide create-task pop-up window\n\n//        -task\n//          -name\n//          -description\n//          -category?\n//          -due date\n//          -priority\n//          -notes\n//          -checkbox\n\n \n\n\nconst newTaskForm = document.getElementById('new-task-form');\n\n//local storage - store\nfunction storeTaskList() {\n    window.localStorage.clear();\n    window.localStorage.setItem('taskList', JSON.stringify(_index_js__WEBPACK_IMPORTED_MODULE_0__.taskList));\n}\n\nfunction addNewTaskToList() {\n    let newTask = {};\n    let taskFormData = new FormData(newTaskForm);\n    for (let key of taskFormData.keys()) {\n        newTask[key] = taskFormData.get(key);\n    }\n    newTask.index = Date.now();\n    newTask.status = 'Active';\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.unshift(newTask);\n    storeTaskList()\n    newTaskForm.reset();\n}\n\nfunction changeTaskStatus(trigger, newStatus) {\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.forEach(task => {\n        if (task.index == trigger.value) {\n            task.status = newStatus;\n        }\n    })\n    storeTaskList()\n}\n\nfunction deleteTask(value) {\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.forEach(task => {\n        if (task.index == value) {\n            let a = _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.findIndex(object => object.index === value.index);\n            _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList.splice(a, 1);\n        }\n    })\n    storeTaskList()\n}\n\nfunction addItemToArray(item, arr) {\n    arr.push(item);\n    arr.sort();\n}\n\n\n\n// 3. complete-task\n//      1. change task status to completed\n//      2. change text and formatting to show it is completed\n//      3. create completed task list \n//      4. remove completed task from active task list\n//      5. if task is already completed, toggle back to active task list\nfunction completeTask() {\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.taskList\n}\n\n\n\n\n//# sourceURL=webpack://to-do-list/./src/task_logic.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;