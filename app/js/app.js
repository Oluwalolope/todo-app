//Getting a reference for the input field
const addForm = document.querySelector(".add");

//Getting a reference for the todo list
const todoList = document.querySelector(".todos");

//Getting a reference for the mobile filter and desktop filter
const desktopFilter = document.querySelector("form.filter--desktop--todo");
const mobileFilter = document.querySelector("form.filter--mobile--todo");

//Getting a reference for the clear completed todo button
const clearCompletedTodosButton = document.querySelector("button.clear--completed");

//Function for knowing the value of the filter chosen
let filter = null;
const filterValues = () => {
  //If the width of the screen is equal to or greater than 500 use the desktop filter, else use mobile filter
  innerWidth >= 500
    ? (filter = desktopFilter.filter.value)
    : (filter = mobileFilter.filter.value);
  return filter;
};

//Function for checking the todo status
const todoStatus = () => {
  Array.from(todoList.children)
    .filter((todo) => todo.classList.contains("todo"))
    .forEach((todo) => {
      let checkBox = todo.querySelector("input[type=checkbox]");
      //iterate through each todo and check wheter they have been checked or not
      checkBox.checked
        ? todo.classList.add("completed")
        : todo.classList.remove("completed");

      // Update the todo status
      updateTodo(todo.getAttribute("id"), checkBox.checked);
    });
};

const todoCount = () => {
  //Function for counting the todos
  let todoCounter = document.querySelector(".todo--counter > span");

  todoCounter.textContent =
    //Only count todos that are visibly rendered on the screen
    Array.from(todoList.children)
      .filter((todo) => todo.classList.contains("todo"))
      .filter((todo) => todo.style.display !== "none").length;
};

//Function for getting todos from local storage
const getTodos = () => JSON.parse(localStorage.getItem("todos")) || [];

//Function for storing todos in local storage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Todo Template Function
const generateTemplate = (todo, id) => {
  const newTodo = document.createElement("div");
  newTodo.classList.add("input--wrapper");
  newTodo.classList.add("todo");
  newTodo.setAttribute("id", id);
  newTodo.setAttribute("draggable", true);
  newTodo.innerHTML = `
     <div class="list--wrapper">
        <input type="checkbox" name="checkbox" class="check--todo" onclick="todoStatus()">
        <li>${todo}</li>
      </div>
     <button class="delete--todo">
       <img src="assets/images/icon-cross.svg" alt="cross icon">
     </button>
  `;
  todoList.prepend(newTodo);
};

//Render stored todo items on page load
const renderTodosFromLocalStorage = () => {
  const storedTodos = getTodos();

  storedTodos.forEach((storedTodo) => {
    const newTodo = document.createElement("div");
    newTodo.classList.add("input--wrapper");
    newTodo.classList.add("todo");
    newTodo.setAttribute("id", storedTodo.id);
    newTodo.setAttribute("draggable", true);
    newTodo.innerHTML = `
       <div class="list--wrapper">
          <input type="checkbox" name="checkbox" class="check--todo" onclick="todoStatus()">
          <li>${storedTodo.todo}</li>
        </div>
       <button class="delete--todo">
         <img src="assets/images/icon-cross.svg" alt="cross icon">
         </button>
         `;
    const checkBox = newTodo.querySelector("input[type=checkbox]");
    checkBox.checked = storedTodo.complete;
    todoList.prepend(newTodo);
  });

  todoCount();
};


//function for updating todo status in local storage
const updateTodo = (todoId, isChecked) => {
  let storedTodos = getTodos();

  // iterate through the array and update the status of the todo in local storage
  let updatedTodos = storedTodos.map(storedTodo => {
    if (storedTodo.id == todoId) {
      return {id: storedTodo.id, todo: storedTodo.todo, complete: isChecked}; 
    } else {
      return storedTodo;
    }
  });

  //Save the updated todos to local storage
  saveTodos(updatedTodos);
};

//function to delete todos from local storage
const deleteTodo = (todoId) => {
  //Retrieve existing todos
  let todos = getTodos();

  //Filter out the todo with the specified Id
  todos = todos.filter(todo => todo.id != todoId);

  //Update local storage
  saveTodos(todos);
}

//Add new todos
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevent the page from refreshing on submit
  const todoText = addForm.add.value.trim(); //Remove excess white space
  const todoId = Date.now();
  if (todoText.length) {
    let todos = getTodos();
    todos.push({
      id: todoId,
      todo: todoText,
      complete: false,
    });
    saveTodos(todos);
    generateTemplate(todoText, todoId);
    todoCount(); //update the todo count
    addForm.reset(); //Reset the input after submission
  }
});

//Remove Todos
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete--todo")) {
    let deletedId = e.target.parentElement.getAttribute("id"); 
    deleteTodo(deletedId); //delete the todo from local storage
    e.target.parentElement.remove(); //if the button is clicked
  } 
  else if (e.target.parentElement.classList.contains("delete--todo")) {
    let deletedId = e.target.parentElement.parentElement.getAttribute("id"); 
    deleteTodo(deletedId); //delete the todo from local storage
    e.target.parentElement.parentElement.remove(); //if the image icon wrapped inside the button is clicked
  }
  todoCount(); //update todo count
});

//Function for Clearing Completed Todos
const clearCompletedTodos = () => {
  todoStatus(); //check whether the todos have been checked

  Array.from(todoList.children)
    .filter((todo) => todo.classList.contains("todo"))
    .forEach((todo) => {
      if (todo.classList.contains("completed")) {
        deleteTodo(todo.getAttribute('id'));//remove the todos from local storage
        todo.remove();//remove the todos from the rendered ui
      }
    });
  todoCount(); //update the todo count
};

//function for filtering todos
const filterTodos = (filter) => {
  if (filter == "all") {
    Array.from(todoList.children)
      .filter((todo) => todo.classList.contains("todo"))
      .forEach((todo) => {
        todo.style.display = "flex";
      });
    todoCount();
  }
  if (filter == "active") {
    Array.from(todoList.children)
      .filter((todo) => todo.classList.contains("todo"))
      .forEach((todo) => {
        todo.classList.contains("completed")
          ? (todo.style.display = "none")
          : (todo.style.display = "flex");
      });
    todoCount();
  }
  if (filter == "completed") {
    Array.from(todoList.children)
      .filter((todo) => todo.classList.contains("todo"))
      .forEach((todo) => {
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
      });
    todoCount();
  }
};

//Listen for when a filter button is clicked on desktop mode
desktopFilter.addEventListener("click", (e) => {
  filterValues();
  filterTodos(filter);
});

//Listen for when a filter button is clicked on mobile mode
mobileFilter.addEventListener("click", (e) => {
  filterValues();
  filterTodos(filter);
});


todoCount(); //count the todos on page load
renderTodosFromLocalStorage(); //Render todos from local storage on page load