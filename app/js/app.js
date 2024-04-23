const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todos");
const desktopFilter = document.querySelector("form.filter--desktop--todo");
const mobileFilter = document.querySelector("form.filter--mobile--todo");
const checkBoxes = todoList.querySelectorAll('input[type=checkbox]');

//console.log(innerWidth);

//Function for knowing the value of the filter chosen
const filterValues = () => {
  innerWidth >= 500 ? 
  console.log(`The desktop value is ${desktopFilter.filter.value}`)
  : 
  console.log(`The mobile value is ${mobileFilter.filter.value}`);
}

//Function for checking the todo status
const todoStatus = () => {
  for (let i = 0; i < checkBoxes.length; i++) {
    const checkBox = checkBoxes[i];
    checkBox.checked ? console.log(`Todo ${i} is completed`) : console.log(`Todo ${i} is active`);
  }
}

//Function for counting the todos
const todoCount = () => {
  let todoCounter = document.querySelector('.todo--counter > span');

  console.log(todoList.children.length - 1);
  todoCounter.textContent = todoList.children.length - 1;
}

desktopFilter.addEventListener('click', e => {
  console.log('the desktop has been clicked');
  // todoStatus();
  filterValues();
});

mobileFilter.addEventListener('click', e => {
  console.log('the mobile has been clicked');
  // todoStatus();
  filterValues();
});


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

//Search Function
const filterTodos = (term) => {
  //Filter off the lists that don't match the term being searched for
  Array.from(todoList.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) //Return values that don't include the term being searched for
    .forEach((todo) => todo.classList.add("filtered")); //Add a class of filtered to all the terms that weren't being searched for

  //Restore a filtered-off lists if it matches what is being searched for
  Array.from(todoList.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term)) //Return values that inlude the term being searched for
    .forEach((todo) => todo.classList.remove("filtered")); //Remove a class of filtered to all the terms that were being searched for
};

// //Search for Todos
// search.addEventListener("keyup", () => {
//   const term = search.value.trim().toLowerCase(); //Get the values the user puts into the search field for every instance
//   filterTodos(term);
// });