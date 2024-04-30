//Get reference for the todos to be dragged
let draggableTodos = [...todoList.children];
draggableTodos = draggableTodos.filter(todo => todo.classList.contains('todo'));

//Get a reference for the area where todos can be dragged in
const container = document.querySelector('.todos');

//===============DESKTOP DRAGGABLE===========


//Add a class of 'dragging' to indicate whhich todo is being dragged
draggableTodos.forEach(draggableTodo => {
    draggableTodo.addEventListener('dragstart', () => {
        draggableTodo.classList.add('dragging');
    });

    draggableTodo.addEventListener('dragend', () => {
        draggableTodo.classList.remove('dragging');
    });
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


//============MOBILE  AND DESKTOP=================

//Add a class of 'dragging' to indicate whhich todo is being moved
draggableTodos.forEach(draggableTodo => {
    draggableTodo.addEventListener('touchstart', () => {
        draggableTodo.classList.add('dragging');
    });
    
    draggableTodo.addEventListener('touchend', () => {
        draggableTodo.classList.remove('dragging');
    });

    draggableTodo.addEventListener('touchcancel', () => {
        draggableTodo.classList.remove('dragging');
    });
});

// Function for getting draggable todo 
const getDraggableTodo = (parent, valueToFind) => {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
    
      if (child.classList.contains(valueToFind)) {
        return child;
      } 
    }
    return null;
}

//Attach a touch move event listener
container.addEventListener('touchmove', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container,e.changedTouches[0].clientY);
    
    let draggableTodo = getDraggableTodo(container, 'dragging');
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