//Getting a reference for the input field
const addForm = document.querySelector(".add");

//Getting a reference for the todo list
const todoList = document.querySelector(".todos");

//Getting a reference for the mobile filter and desktop filter
const desktopFilter = document.querySelector("form.filter--desktop--todo");
const mobileFilter = document.querySelector("form.filter--mobile--todo");

//Getting a reference for the clear completed todo button
const clearCompletedTodosButton = document.querySelector('button.clear--completed');



//Function for knowing the value of the filter chosen
let filter = null;
const filterValues = () => {
  //If the width of the screen is equal to or greater than 500 use the desktop filter, else use mobile filter
  innerWidth >= 500 ? filter = desktopFilter.filter.value : filter = mobileFilter.filter.value;
  return filter;
}


//Function for checking the todo status
const todoStatus = () => {
  Array.from(todoList.children)
    .filter(todo => todo.classList.contains('todo'))
      .forEach(todo => {
        let checkBox = todo.querySelector('input[type=checkbox]');
        //iterate through each todo and check wheter they have been checked or not
        checkBox.checked ? 
        todo.classList.add('completed') 
        : 
        todo.classList.remove('completed');
      });
}

//Function for counting the todos
const todoCount = () => {
  let todoCounter = document.querySelector('.todo--counter > span');

  todoCounter.textContent =
    //Only count todos that are visibly rendered on the screen
    Array.from(todoList.children)
      .filter(todo => todo.classList.contains("todo"))
      .filter(todo => todo.style.display !== "none").length;
}

//Todo Template Function
const generateTemplate = (todo) => {
  const newTodo = document.createElement("div");
  newTodo.classList.add("input--wrapper");
  newTodo.classList.add("todo");
  newTodo.innerHTML = `
     <div class="list--wrapper">
        <input type="checkbox" name="checkbox" class="check--todo">
        <li>${todo}</li>
      </div>
     <button class="delete--todo">
       <img src="assets/images/icon-cross.svg" alt="cross icon">
     </button>
  `;
  todoList.prepend(newTodo);
};

//Add new todos
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevent the page from refreshing on submit
  const todo = addForm.add.value.trim(); //Remove excess white space
  if (todo.length) {
    generateTemplate(todo); //only add todos that are atleast a character long
    todoCount();//update the todo count
    addForm.reset(); //Reset the input after submission
  }
});

//Remove Todos
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete--todo")) {
    e.target.parentElement.remove();//if the button is clicked
  } else if (e.target.parentElement.classList.contains("delete--todo")) {
    e.target.parentElement.parentElement.remove();//if the image icon wrapped inside the button is clicked
  }
  todoCount();//update todo count
});

//Function for Clearing Completed Todos
const clearCompletedTodos = () => {
  todoStatus();//check whether the todos have been checked

  Array.from(todoList.children)
  .filter(todo => todo.classList.contains('todo'))
    .forEach(todo => {
      if(todo.classList.contains('completed')) {
        todo.remove();
      };
  });

  todoCount();//update the todo count
}

//function for filtering todos
const filterTodos = (filter) => {
  if(filter == "all"){
    Array.from(todoList.children)
    .filter(todo => todo.classList.contains('todo'))
      .forEach(todo => {
        todo.style.display = "flex";
      });
    todoCount();
  }
  if(filter == "active"){
    Array.from(todoList.children)
    .filter(todo => todo.classList.contains('todo'))
      .forEach(todo => {
        todo.classList.contains('completed')? todo.style.display = "none" : todo.style.display = "flex";
      });
    todoCount();
  }
  if(filter == "completed"){
    Array.from(todoList.children)
    .filter(todo => todo.classList.contains('todo'))
      .forEach(todo => {
        todo.classList.contains('completed')? todo.style.display = "flex" : todo.style.display= "none";
      });
    todoCount();
  }
}

//Listen for when a filter button is clicked on desktop mode
desktopFilter.addEventListener('click', e => {
  todoStatus();
  filterValues();
  filterTodos(filter);
});

//Listen for when a filter button is clicked on mobile mode
mobileFilter.addEventListener('click', e => {
  todoStatus();
  filterValues();
  filterTodos(filter);
});

//Listen for when the clear completed todos button is clicked 
clearCompletedTodosButton.addEventListener('click', () => {
  clearCompletedTodos();
});

todoCount();//count the todos on page load