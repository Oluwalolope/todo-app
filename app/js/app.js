const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todos");
const todos = document.querySelectorAll(".todo");
const desktopFilter = document.querySelector("form.filter--desktop--todo");
const mobileFilter = document.querySelector("form.filter--mobile--todo");
const checkBoxes = todoList.querySelectorAll('input[type=checkbox]');
const clearCompletedTodosButton = document.querySelector('button.clear--completed');

//Function for knowing the value of the filter chosen
let filter = null;
const filterValues = () => {
  innerWidth >= 500 ? filter = desktopFilter.filter.value : filter = mobileFilter.filter.value;
  return filter;
}

//Function for checking the todo status
const todoStatus = () => {
  for (let i = 0; i < checkBoxes.length; i++) {
    const checkBox = checkBoxes[i];

    checkBox.checked ? 
    checkBox.parentElement.parentElement.classList.add('completed') 
    : 
    checkBox.parentElement.parentElement.classList.remove('completed');
  }
}

//Function for counting the todos
const todoCount = () => {
  let todoCounter = document.querySelector('.todo--counter > span');

  todoCounter.textContent = todoList.children.length -1;
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
    e.target.parentElement.remove();
  } else if (e.target.parentElement.classList.contains("delete--todo")) {
    e.target.parentElement.parentElement.remove();
  }
  todoCount();//update todo count
});

const clearCompletedTodos = () => {
  todoStatus();

  todos.forEach(todo => {
    if(todo.classList.contains('completed')) {
      todo.remove();
    };
  });

  todoCount();
}

//function for filtering todos
const filterTodos = (filter) => {
  if(filter == "all"){
    todos.forEach(todo => {
      todo.style.display = "flex";
    });
    todoCount();
  }
  if(filter == "active"){
    todos.forEach(todo => {
      todo.classList.contains('completed')? todo.style.display = "none" : todo.style.display = "flex";
    });
    todoCount();
  }
  if(filter == "completed"){
    todos.forEach(todo => {
      todo.classList.contains('completed')? todo.style.display = "flex" : todo.style.display= "none";
    });
    todoCount();
  }
}

desktopFilter.addEventListener('click', e => {
  todoStatus();
  filterValues();
  filterTodos(filter);
});

mobileFilter.addEventListener('click', e => {
  todoStatus();
  filterValues();
  filterTodos(filter);
});

clearCompletedTodosButton.addEventListener('click', () => {
  clearCompletedTodos();
});

todoCount();