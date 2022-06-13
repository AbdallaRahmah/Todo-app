// the list object
const ToDoList = {
  allTasks: [],
  idList: [],
  getTaskId: () => {
    const genrateId = () => Math.floor(Math.random() * 100);
    if (ToDoList.idList.includes(genrateId())) {
      ToDoList.getTaskId();
    } else {
      return genrateId();
    }
  },
  getAllTasks: () => {
    return ToDoList.allTasks;
  },
  getActiveTasks: () => {
    let toDo = ToDoList.allTasks.filter((task) => task.done === false);
    return toDo;
  },
  getCompletedTasks: () => {
    let toDo = ToDoList.allTasks.filter((task) => task.done === true);
    return toDo;
  },
  getCountLeftTasks: () => {
    let counter = 0;
    ToDoList.allTasks.forEach((task) => {
      if (task.done === false) {
        counter++;
      }
    });
    return counter;
  },
  setClearCompleted: () => {
    ToDoList.allTasks = ToDoList.allTasks.filter((task) => task.done === false);
    return ToDoList.allTasks;
  }, 
  setAddNewTask: (task) => {
    ToDoList.allTasks.push(task);
    ToDoList.idList.push(task.id);
  },
  setDeleteTask: (id) => {
    ToDoList.allTasks = ToDoList.allTasks.filter((item) => {
      return item.id !== id;
    });
    ToDoList.idList = ToDoList.idList.filter((item) => {
      return item !== id;
    });
    reRenderLeftItemBar();
  },
  setModifyTask: (id) => {
    ToDoList.allTasks.forEach((task) => {
      if (task.id === id) {
        task.done === false ? (task.done = true) : (task.done = false);
      }
    });
  },
};

// the task class constructor
class Task {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.done = false;
  }
}

/*
**************
input new task
**************
*/
const taskInputBtn = document.getElementById("task--input");

const list = document.getElementById("app--list");

let taskData = document.getElementById("task--data");

taskData.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    taskInputBtn.click();
  }
});

taskInputBtn.addEventListener("click", () => {
  addTask(taskData.value);

  taskData.value = "";
});

/* 
****************
dark mode toggle
****************
*/
let mode = "light";

const modeBtn = document.getElementById("mode--toggle");

const modeBtnImg = document.getElementById("toggle__img");

modeBtn.addEventListener("click", () => {
  switch (mode) {
    case "light":
      enableDarkMode();
      mode = "dark";
      break;
    case "dark":
      disableDarkMode();
      mode = "light";
      break;
    default:
      disableDarkMode();
      mode = "light";
  }
});

/*
*****************
special functions
***************** 
*/
const controlButtons = document.querySelectorAll(".control--button");

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.getAttribute("data-name")) {
      case "all":
        reRenderList(ToDoList.getAllTasks());
        setActiveBtn(button);
        break;
      case "active":
        reRenderList(ToDoList.getActiveTasks());
        setActiveBtn(button);
        break;
      case "completed":
        reRenderList(ToDoList.getCompletedTasks());
        setActiveBtn(button);
        break;
      case "clear--completed":
        reRenderList(ToDoList.setClearCompleted());
        break;
      default:
        reRenderList(ToDoList.getAllTasks());
        break;
    }
  });
});

const setActiveBtn = (button) => {
  controlButtons.forEach((btn) => {
    btn.classList.remove("active--btn");
  });
  button.classList.add("active--btn");
};

const reRenderList = (toDo) => {
  const oldTasks = document.querySelectorAll("li");
  oldTasks.forEach((task) => {
    task.remove();
  });

  toDo.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.classList.add("input__box");

    const label = document.createElement("label");

    label.append(item.data);

    label.setAttribute("for", `task-${item.id}`);

    listItem.append(label);

    // the check button
    const checkBtn = document.createElement("input");

    checkBtn.setAttribute("type", "checkbox");

    checkBtn.setAttribute("name", `task-${item.id}`);

    checkBtn.setAttribute("data-task", item.id);

    checkBtn.classList.add("check--box");

    if (item.done === true) {
      checkBtn.setAttribute("checked", "true");
      label.style.textDecoration = "line-through";
    }

    checkBtn.addEventListener("click", () => {
      if (checkBtn.checked) {
        label.style.textDecoration = "line-through";
        ToDoList.setModifyTask(item.id);
        reRenderLeftItemBar();
      } else {
        label.style.textDecoration = "none";
        ToDoList.setModifyTask(item.id);
        reRenderLeftItemBar();
      }
    });

    listItem.prepend(checkBtn);

    // the delete button
    const delBtn = document.createElement("span");

    delBtn.setAttribute("data-task", item.id);

    delBtn.classList.add("delete--button");

    listItem.append(delBtn);

    delBtn.addEventListener("click", (e) => {
      listItem.remove();
      ToDoList.setDeleteTask(item.id);
      reRenderLeftItemBar();
    });

    // append the task to the list
    list.prepend(listItem);
  });
};

const reRenderLeftItemBar = () => {
  const leftIems = document.getElementById("left--items");

  let counter = ToDoList.getCountLeftTasks();

  leftIems.textContent = `${counter} items left`;
};

const addTask = (data) => {
  if (data !== "") {
    const taskId = ToDoList.getTaskId();

    let task = new Task(taskId, data);

    ToDoList.setAddNewTask(task);

    reRenderList(ToDoList.getAllTasks());

    reRenderLeftItemBar();
  }
};

const enableDarkMode = () => {
  modeBtnImg.setAttribute("src", "./images/icon-sun.svg");
  document.body.classList.add("dark");
};

const disableDarkMode = () => {
  modeBtnImg.setAttribute("src", "./images/icon-moon.svg");
  document.body.classList.remove("dark");
};
