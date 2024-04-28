let draggableTodos = [...todoList.children];
draggableTodos = draggableTodos.filter(todo => todo.classList.contains('todo'));

const container = document.querySelector('.todos');

draggableTodos.forEach(draggableTodo => {
    draggableTodo.addEventListener('dragstart', () => {
        draggableTodo.classList.add('dragging');
    });

    draggableTodo.addEventListener('dragend', () => {
        draggableTodo.classList.remove('dragging');
    });
});


container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    
    const draggableTodo = document.querySelector('.dragging');
    const fixedBottom = container.lastElementChild;

    if(afterElement == null) {
        container.insertBefore(draggableTodo, fixedBottom);
    } else {
        container.insertBefore(draggableTodo, afterElement);
    }

});

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