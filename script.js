// Select elements
const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const taskDeadline = document.getElementById("taskDeadline");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksContainer = document.getElementById("tasks");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const toggleTheme = document.getElementById("toggleTheme");

// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  tasksContainer.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    // Deadline Highlight
    if (task.deadline === today) {
      li.classList.add("deadline-today");
    } else if (task.deadline < today) {
      li.classList.add("overdue");
    }

    li.innerHTML = `
      <div>
        📖 <strong>${task.title}</strong> - ${task.subject} <br>
        <small>⏰ Deadline: ${task.deadline}</small>
      </div>
      <div>
        <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    tasksContainer.appendChild(li);
  });

  updateProgress();
}

// Add task
addTaskBtn.addEventListener("click", () => {
  if (taskTitle.value && taskSubject.value && taskDeadline.value) {
    tasks.push({
      title: taskTitle.value,
      subject: taskSubject.value,
      deadline: taskDeadline.value,
      completed: false
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskTitle.value = "";
    taskSubject.value = "";
    taskDeadline.value = "";
    renderTasks();
  } else {
    alert("Please fill all fields!");
  }
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  // 🎉 Alert when all tasks completed
  if (tasks.every(task => task.completed) && tasks.length > 0) {
    alert("🎉 Congratulations! You completed all tasks!");
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Update progress
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressFill.style.width = percentage + "%";
  progressText.textContent = `${percentage}% Completed`;
}

// Dark Mode Toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleTheme.textContent =
    document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial render
renderTasks();
