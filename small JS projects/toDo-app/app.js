// status 1 and 0 are responsible for done and not done
// on load it checks local storage
window.onload = () => {
  try {
    taskData = JSON.parse(localStorage.getItem("tasks"));
    addCardsOnLoad();
  } catch (err) {
    localStorage.setItem("tasks", "[]");
    console.log(err);
    location.reload();
  }
};
// function below shows task in the list (on the page)
function displayFunction(element) {
  const optionIs = element.value;
  if (optionIs == "Done") {
    tasksElement.innerHTML = "";
    taskData.forEach((item, index) => {
      if (item.status == 1) {
        const cardElement = cardCreation(item.name, index, item.status);
        tasksElement.appendChild(cardElement);
      }
    });
  } else if (optionIs == "Active") {
    tasksElement.innerHTML = "";
    taskData.forEach((item, index) => {
      if (item.status == 0) {
        const cardElement = cardCreation(item.name, index, item.status);
        tasksElement.appendChild(cardElement);
      }
    });
  } else {
    tasksElement.innerHTML = "";
    addCardsOnLoad();
  }
}
// on load it adds cards to the page from local storage
function addCardsOnLoad() {
  idForTask = taskData.length;
  taskData.forEach((item, index) => {
    const cardElement = cardCreation(item.name, index, item.status);
    tasksElement.appendChild(cardElement);
  });
}

function cardCreation(name, index, status) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.setAttribute("id", `${index + 1}`);
  if (status == 0) {
    cardElement.innerHTML = `
    <h2>${name}</h2>
          <span class="material-symbols-outlined close" onclick=removeTask(this)> close </span>
          <div class="circle" onclick="markFunction(this)">
            <span class="material-symbols-outlined done hidden">
              check_circle
            </span>
          </div>`;
  } else if (status == 1) {
    cardElement.innerHTML = `
    <h2 class="done-text">${name}</h2>
          <span class="material-symbols-outlined close" onclick=removeTask(this)> close </span>
          <div class="circle" onclick="markFunction(this)">
            <span class="material-symbols-outlined done">
              check_circle
            </span>
          </div>`;
  }
  return cardElement;
}
// all necessary html elements
const addBtn = document.getElementById("add-btn");
const newTaskWindow = document.getElementById("new-task");
const closeBtnOne = document.getElementById("close-btn1");

const taskValue = document.getElementById("adding");
const addBtn2 = document.getElementById("add-btn2");
const tasksElement = document.getElementById("tasks");

let taskData = [];

let idForTask = 0;

addBtn.addEventListener("click", () => {
  newTaskWindow.classList.remove("hidden");
});

addBtn2.addEventListener("click", () => {
  let toDoValue = taskValue.value;
  if (toDoValue) {
    idForTask += 1;

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("id", `${idForTask}`);
    cardElement.innerHTML = `
    <h2>${toDoValue}</h2>
          <span class="material-symbols-outlined close" onclick=removeTask(this)> close </span>
          <div class="circle" onclick="markFunction(this)">
            <span class="material-symbols-outlined done hidden">
              check_circle
            </span>
          </div>`;
    tasksElement.appendChild(cardElement);
    addToLS(toDoValue, cardElement);
    taskValue.value = "";
    newTaskWindow.classList.add("hidden");
  } else {
    alert("Text field is empty!");
  }
});

closeBtnOne.addEventListener("click", () => {
  newTaskWindow.classList.add("hidden");
});
// marks a task as done
function markFunction(element) {
  let task = element.parentElement.firstElementChild;
  task.classList.toggle("done-text");
  element.firstElementChild.classList.toggle("hidden");
  changeDataInLS(element.parentElement.id - 1);
  displayFunction(document.getElementById("select-form"));
}

function removeTask(element) {
  const parent1 = element.parentElement;
  const parent2 = parent1.parentElement;
  parent2.removeChild(parent1);
  taskData.splice(parent1.id - 1, 1);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  changeTasksId(parent1.id);
}
// adds to local storage
function addToLS(value) {
  const taskObject = { name: value, status: 0 };
  taskData.push(taskObject);
  const jsonData = JSON.stringify(taskData);
  localStorage.setItem("tasks", jsonData);
}
// below function changes id of a task for instance when previous task was removed
function changeTasksId(id) {
  const taskCards = document.querySelectorAll(".card");
  taskCards.forEach((element) => {
    if (element.id >= id) {
      element.setAttribute("id", `${element.id - 1}`);
    }
  });
  idForTask -= 1;
}
// changes data in local storage
function changeDataInLS(id) {
  let status = taskData[id]["status"];
  if (status) {
    taskData[id]["status"] = 0;
  } else {
    taskData[id]["status"] = 1;
  }
  localStorage.setItem("tasks", JSON.stringify(taskData));
}
