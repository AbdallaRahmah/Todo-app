const ToDoList = {
  allTasks: [],
  getlistLength: () => {
    return ToDoList.allTasks.length + 1;
  },
  setNewTask: task => {
    ToDoList.allTasks.push(task);
  }
};

class Task {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.status = false;
  }

} // input new task


const taskInputBtn = document.getElementById("task--input");
const list = document.getElementById("app--list");
taskInputBtn.addEventListener("click", () => {
  let taskData = document.getElementById("task--data");
  addTask(taskData.value);
  taskData.value = "";
});

const addTask = data => {
  if (data !== "") {
    const taskId = ToDoList.getlistLength();
    let task = new Task(taskId, data);
    ToDoList.setNewTask(task);
    const listItem = document.createElement("li");
    listItem.classList.add("input__box");
    listItem.append(data);
    list.prepend(listItem);
  }
}; // local storage setup and dom render when loading


let storedMode = localStorage.getItem("mode");
let mode = "light";

if (storedMode !== null) {
  mode = storedMode;
}

window.addEventListener("DOMContentLoaded", () => {
  if (mode === "dark") {
    enableDarkMode();
    mode = "dark";
  } else if (mode === "light") {
    disableDarkMode();
    mode = "light";
  }
});
/* 
****************
dark mode toggle
****************
*/

const modeBtn = document.getElementById("mode--toggle");
const modeBtnImg = document.getElementById("toggle__img");
modeBtn.addEventListener("click", () => {
  if (mode === "light") {
    enableDarkMode();
    mode = "dark";
    localStorage.setItem("mode", "dark");
  } else if (mode === "dark") {
    disableDarkMode();
    mode = "light";
    localStorage.setItem("mode", "light");
  } else {
    disableDarkMode();
    mode = "light";
    localStorage.setItem("mode", "light");
  }
});

let enableDarkMode = () => {
  modeBtnImg.setAttribute("src", "./images/icon-sun.svg");
  document.body.classList.add("dark");
};

let disableDarkMode = () => {
  modeBtnImg.setAttribute("src", "./images/icon-moon.svg");
  document.body.classList.remove("dark");
};