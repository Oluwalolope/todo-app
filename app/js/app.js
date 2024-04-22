const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const filterButtons = document.querySelectorAll("input[type=radio]");

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
  list.prepend(newTodo);
};

//Add new todos
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevent the page from refreshing on submit
  const todo = addForm.add.value.trim(); //Remove excess white space
  if (todo.length) {
    generateTemplate(todo); //only add todos that are atleast a character long
    addForm.reset(); //Reset the input after submission
  }
});

//Remove Todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete--todo")) {
    e.target.parentElement.remove();
  } else if (e.target.parentElement.classList.contains("delete--todo")) {
    e.target.parentElement.parentElement.remove();
  }
});

//Search Function
const filterTodos = (term) => {
  //Filter off the lists that don't match the term being searched for
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) //Return values that don't inlude the term being searched for
    .forEach((todo) => todo.classList.add("filtered")); //Add a class of filtered to all the terms that weren't being searched for

  //Restore a filtered-off lists if it matches what is being searched for
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term)) //Return values that inlude the term being searched for
    .forEach((todo) => todo.classList.remove("filtered")); //Remove a class of filtered to all the terms that were being searched for
};

// //Search for Todos
// search.addEventListener("keyup", () => {
//   const term = search.value.trim().toLowerCase(); //Get the values the user puts into the search field for every instance
//   filterTodos(term);
// });
