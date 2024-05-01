//Get reference for the todos to be dragged
let draggableTodos = [...todoList.children];
draggableTodos = draggableTodos.filter(todo => todo.classList.contains('todo'));

//Get a reference for the area where todos can be dragged in
const container = document.querySelector('.todos');

//===============DESKTOP DRAGGABLE===========


//Add a class of 'dragging' to indicate which todo is being dragged
container.addEventListener('dragstart', e => {
    if (e.target.type === "checkbox" || e.target.tagName === "LI" || e.target.tagName === "IMG") {
      e.target.parentElement.parentElement.classList.add("dragging");
    } 
    
    else if (e.target.classList.contains("delete--todo")) {
      e.target.parentElement.classList.add("dragging");
    } 
    
    else if (e.target.classList.contains("todo")) {
      e.target.classList.add("dragging");
    }
});

//Remove a class of 'dragging' to indicate which todo is not being dragged
container.addEventListener('dragend', e => {
    e.target.classList.remove('dragging');
    e.target.parentElement.classList.remove('dragging');
    e.target.parentElement.parentElement.classList.remove('dragging');
});

//Attach a drag over event listener
container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    
    const draggableTodo = document.querySelector('.dragging');
    const fixedBottom = container.lastElementChild;

    if(afterElement == null) {
        container.insertBefore(draggableTodo, fixedBottom);//Let the todo info be fixed to the bottom
    } else {
        container.insertBefore(draggableTodo, afterElement);
    }

    let renderedTodos = [...container.children];
    renderedTodos = renderedTodos.filter(renderedTodo => renderedTodo.classList.contains('todo')).map(renderedTodo => {
        const checkBox = renderedTodo.querySelector("input[type=checkbox");
        const todoText = renderedTodo.querySelector("li").textContent;
        return {
          id: renderedTodo.id,
          todo: todoText,
          complete: checkBox.checked
        }; 
    });
    renderedTodos.reverse();//reverse the array to match the oreder in local storage
    
    saveTodos(renderedTodos);//save the ordered todos
});

//Get the value of the element being dragged over
const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.todo:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}


//============TOUCH ENABLED DEVICES=================
let longpress;

//Add a class of 'dragging' to indicate which todo is being dragged
container.addEventListener('touchstart', e => {
    longpress = setTimeout(() => {
        if(e.target.type === 'checkbox' || e.target.tagName === 'LI' || e.target.tagName === 'IMG'){
            e.target.parentElement.parentElement.classList.add('dragging');
        } 
    
        else if (e.target.classList.contains("delete--todo")) {
          e.target.parentElement.classList.add("dragging");
        }
    
        else if(e.target.classList.contains('todo')) {
            e.target.classList.add('dragging');
        }

        touchMoveStart();
    }, 500);
});

//Remove a class of 'dragging' to indicate which todo is not being dragged
container.addEventListener('touchend', e => {
    e.target.classList.remove('dragging');
    e.target.parentElement.classList.remove('dragging');
    e.target.parentElement.parentElement.classList.remove('dragging');
    clearTimeout(longpress);
    touchMoveStop();
});

//Remove a class of 'dragging' to indicate which todo is not being dragged
container.addEventListener('touchcancel', e => {
    e.target.classList.remove('dragging');
    e.target.parentElement.classList.remove('dragging');
    e.target.parentElement.parentElement.classList.remove('dragging');
    clearTimeout(longpress);
    touchMoveStop();
});


//Attach a touch move event listener
const touchMoveStart = () =>    {
    container.addEventListener('touchmove', touchMoveFunction);
}

//Remove Touch event listener
const touchMoveStop = () => {
    console.log('touch act');
    container.removeEventListener('touchmove', touchMoveFunction);
}

//function for the touchmove
function touchMoveFunction(e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.changedTouches[0].clientY);

  const draggableTodo = document.querySelector(".dragging");
  const fixedBottom = container.lastElementChild;

  if (afterElement == null) {
    container.insertBefore(draggableTodo, fixedBottom); //Let the todo info be fixed to the bottom
  } else {
    container.insertBefore(draggableTodo, afterElement);
  }

  let renderedTodos = [...container.children];
  renderedTodos = renderedTodos
    .filter((renderedTodo) => renderedTodo.classList.contains("todo"))
    .map((renderedTodo) => {
      const checkBox = renderedTodo.querySelector("input[type=checkbox");
      const todoText = renderedTodo.querySelector("li").textContent;
      return {
        id: renderedTodo.id,
        todo: todoText,
        complete: checkBox.checked,
      };
    });
  renderedTodos.reverse(); //reverse the array to match the oreder in local storage

  saveTodos(renderedTodos); //save the ordered todos
}

//Get the value of the element being moved over
const getDragAfterElementMobile = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.todo:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}