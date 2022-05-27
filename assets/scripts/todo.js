const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Functions
const addTodo = (e) => {
  // prevent form from submitting
  e.preventDefault();

  // Create todo div element
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create LI element
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add to local storage
  saveLocalTodos(todoInput.value);

  //  check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //  trash can button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //   Append to list
  todoList.appendChild(todoDiv);

  // Clear Input Field
  todoInput.value = "";
};

// Deleting the todos
const deleteCheck = (e) => {
  const item = e.target;
  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // Adding the falling animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // removing the todo
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Clicking the Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// filtering throught the different todos
const filterTodo = (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// Save to local storage
const saveLocalTodos = (todo) => {
  // check if already in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Get todos from local storage
const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // Create todo div element
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI element
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //  check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //  trash can button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //   Append to list
    todoList.appendChild(todoDiv);
  });
};

// Delete from local Storage
const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // selecting the index of the array
  const todoIndex = todo.children[0].innerText;
  // delteing the array item from its index
  todos.splice(todos.indexOf(todoIndex), 1);
  // from the item from local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Event listner
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
