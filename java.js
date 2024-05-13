document.addEventListener("DOMContentLoaded", function() {
    fetchTodos();
  });
  
  function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        data.forEach(todo => {
          const todoItem = createTodoElement(todo);
          todoList.appendChild(todoItem);
        });
      })
      .catch(error => console.error('Error fetching todos:', error));
  }
  
  function createTodoElement(todo) {
    const todoItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.disabled = true;
    const text = document.createTextNode(todo.title);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTodo(todo.id);
    });
    todoItem.appendChild(checkbox);
    todoItem.appendChild(text);
    todoItem.appendChild(deleteButton);
    return todoItem;
  }
  
  function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoTitle = todoInput.value.trim();
    if (todoTitle !== '') {
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: todoTitle,
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(response => response.json())
      .then(data => {
        todoInput.value = '';
        const todoList = document.getElementById('todoList');
        const todoItem = createTodoElement(data);
        todoList.appendChild(todoItem);
      })
      .catch(error => console.error('Error adding todo:', error));
    }
  }
  
  function deleteTodo(todoId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
          const todoItem = document.getElementById(`todo-${todoId}`);
          todoItem.remove();
        } else {
          console.error('Failed to delete todo');
        }
      })
      .catch(error => console.error('Error deleting todo:', error));
    }
    