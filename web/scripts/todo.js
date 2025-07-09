const taskForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index) {
    const tasks = loadTasks();
    tasks.splice(index, 1); 
    saveTasks(tasks);
    renderTasks();
}

function renderTasks() {
    const tasks = loadTasks();
    todoList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        title.textContent = task.title;
        const description = document.createElement('pre');
        description.textContent = task.description;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'todo-list__delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskTitle = event.target.elements.taskTitle.value;
    const taskDescription = event.target.elements.taskDescription.value;

    if (taskTitle && taskDescription) {
        const tasks = loadTasks();
        tasks.push({ title: taskTitle, description: taskDescription, completed: false });
        saveTasks(tasks);
        renderTasks();
    }
    
    taskForm.reset();
});

renderTasks();
