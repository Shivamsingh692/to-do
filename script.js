function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks().filter(task => new Date(task.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const isOverdue = new Date(task.deadline) < new Date();
        li.className = `${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;
        li.innerHTML = `
            (${task.Subject})   ${task.text} - ${task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}
            <span class="complete-btn" onclick="markComplete(${index})">✔️</span>
            <span class="delete-btn" onclick="deleteTask(${index})">❌</span>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('task');
    const subjectInput = document.getElementById('subject');
    const subjectValue= subjectInput.value;
    const deadlineInput = document.getElementById('deadline');
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;
    if (taskText) {
        const tasks = getTasks();
        tasks.push({Subject:subjectValue, text: taskText, date: new Date().toISOString(), deadline: deadline, completed: false });
        saveTasks(tasks);
        taskInput.value = '';
        deadlineInput.value = '';
        displayTasks();
    }
}

function markComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks = tasks.filter((_, i) => i !== index);
    saveTasks(tasks);
    displayTasks();
}

function checkOverdueTasks() {
    const now = new Date();
    const tasks = getTasks();
    const overdueTasks = tasks.filter(task => new Date(task.deadline) < now && !task.completed);
    if (overdueTasks.length > 0) {
        displayTasks(); 
    }
}

function getRandomImage() {
    const images = [
        'url("bg-2.jpg")',
        'url("bg-3.jpg")',
        'url("bg-5.jpg")',
        'url("bg-6.jpg")',
        'url("bg-7.jpg")',
        'url("bg-9.jpg")',
        'url("bg-10.jpg")',
        'url("bg-11.jpg")',
        'url("bg-12.jpg")',
        'url("bg-4.jpg")',

    ];
    const lastImage = localStorage.getItem('lastImage');

            let newImage;
            do {
                newImage = images[Math.floor(Math.random() * images.length)];
            } while (newImage === lastImage);

            
            localStorage.setItem('lastImage', newImage);

            return newImage;
        }
document.body.style.backgroundImage = getRandomImage();
    
setInterval(checkOverdueTasks, 60 * 1000);
displayTasks();
