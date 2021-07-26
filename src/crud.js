/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
import { savedList } from './interactive.js';
import {
  todoTasks, taskInput, btnClear,
} from './index.js';

function createTask() {
  const todoForm = document.querySelector('.to-do');

  const id = todoTasks.length;

  todoForm.addEventListener('submit', () => {
    const newToDo = taskInput.value;
    const newTodoList = {
      description: newToDo, completed: false, index: todoTasks.length + 1, checked: false, id,
    };
    if (newToDo) {
      todoTasks.push(newTodoList);
      savedList();
    }
  });
}

function editTask(input, elem, form) {
  let newValue = '';
  input.setAttribute('name', elem.id);
  input.addEventListener('input', (event) => {
    newValue = event.target.value;
    event.preventDefault();
  });

  form.addEventListener('submit', (event) => {
    const p = event.target[0].name;

    todoTasks[p].description = newValue;
    savedList();
  });
}

function deleteTask(element) {
  todoTasks.splice(element, 1);
  todoTasks.forEach((task, i) => {
    task.id = i;
    task.index = i + 1;
  });

  localStorage.clear();
  localStorage.setItem('ToDo', JSON.stringify(todoTasks));
}

function clearTasks() {
  btnClear.addEventListener('click', () => {
    const pendingTasks = todoTasks.filter((item) => item.checked !== true);

    pendingTasks.forEach((task, i) => {
      task.id = i;
      task.index = i + 1;
    });

    localStorage.setItem('ToDo', JSON.stringify(pendingTasks));
    window.location.reload();
  });
}

export {
  clearTasks, deleteTask, editTask, createTask,
};
