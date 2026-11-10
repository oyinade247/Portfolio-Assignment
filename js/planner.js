const initialStudentTasks = [
  {
    id: 1731234001,
    title: 'Complete COS 106 Practical Term Project (Portfolio & Planner)',
    course: 'COS 106',
    dueDate: '2025-11-20',
    priority: 'high',
    completed: false,
  },
  {
    id: 1731234002,
    title: 'Read Module 3 on Software Development Life Cycle (SDLC)',
    course: 'SWE 102',
    dueDate: '2025-11-22',
    priority: 'medium',
    completed: true,
  },
  {
    id: 1731234003,
    title: 'Submit Introduction to Computing Assignment 2',
    course: 'COS 101',
    dueDate: '2025-11-25',
    priority: 'high',
    completed: false,
  },
  {
    id: 1731234004,
    title: 'Practice JavaScript DOM Manipulation & Event Listeners',
    course: 'COS 106',
    dueDate: '2025-11-28',
    priority: 'low',
    completed: false,
  },
];

let tasks = [];
let currentFilter = 'all';

const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskCourseSelect = document.getElementById('taskCourse');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskListContainer = document.getElementById('taskList');

const totalCountEl = document.getElementById('totalCount');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');

const filterBtns = document.querySelectorAll('.filter-btn');

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromStorage();
  setupEventListeners();
  renderTasks();
});

function loadTasksFromStorage() {
  const saved = localStorage.getItem('miva_favour_academic_tasks');
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing stored tasks, resetting to default', e);
      tasks = [...initialStudentTasks];
    }
  } else {
    tasks = [...initialStudentTasks];
    saveTasksToStorage();
  }
}

function saveTasksToStorage() {
  localStorage.setItem('miva_favour_academic_tasks', JSON.stringify(tasks));
}

function setupEventListeners() {

  if (taskForm) {
    taskForm.addEventListener('submit', handleAddTask);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter') || 'all';
      renderTasks();
    });
  });

  if (taskDueDateInput) {
    const today = new Date().toISOString().split('T')[0];
    taskDueDateInput.setAttribute('min', today);
  }
}

function handleAddTask(e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const course = taskCourseSelect.value;
  const dueDate = taskDueDateInput.value;
  const priority = taskPrioritySelect.value;

  if (!title) {
    alert('Please enter a task description.');
    taskTitleInput.focus();
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    course: course,
    dueDate: dueDate || 'No due date',
    priority: priority,
    completed: false,
  };

  tasks.unshift(newTask);

  saveTasksToStorage();
  renderTasks();

  taskForm.reset();
  taskTitleInput.focus();
}

function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToStorage();
  renderTasks();
}

function deleteTask(taskId) {
  const confirmDelete = confirm('Are you sure you want to delete this academic task?');
  if (!confirmDelete) return;

  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToStorage();
  renderTasks();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  if (totalCountEl) totalCountEl.textContent = total;
  if (pendingCountEl) pendingCountEl.textContent = pending;
  if (completedCountEl) completedCountEl.textContent = completed;
}

function renderTasks() {
  updateStats();

  if (!taskListContainer) return;

  let filtered = tasks;
  if (currentFilter === 'pending') {
    filtered = tasks.filter((t) => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = tasks.filter((t) => t.completed);
  }

  if (filtered.length === 0) {
    taskListContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🌸</div>
        <h4>No tasks found</h4>
        <p>You have no ${currentFilter === 'all' ? '' : currentFilter} tasks on your planner right now. Keep shining!</p>
      </div>
    `;
    return;
  }

  taskListContainer.innerHTML = '';

  filtered.forEach((task) => {
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;

    const priorityClass =
      task.priority === 'high'
        ? 'priority-high'
        : task.priority === 'medium'
        ? 'priority-medium'
        : 'priority-low';

    item.innerHTML = `
      <div class="task-left">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          aria-label="Mark task as complete"
          ${task.completed ? 'checked' : ''} 
          data-id="${task.id}"
        />
        <div class="task-info">
          <span class="task-text">${escapeHtml(task.title)}</span>
          <div class="task-meta">
            <span class="badge" style="padding: 0.15rem 0.5rem; font-size: 0.72rem;">📚 ${escapeHtml(task.course)}</span>
            <span>📅 ${escapeHtml(task.dueDate)}</span>
            <span class="priority-pill ${priorityClass}">${escapeHtml(task.priority)}</span>
          </div>
        </div>
      </div>
      <button 
        class="btn btn-danger btn-sm delete-btn" 
        data-id="${task.id}" 
        title="Delete task"
        aria-label="Delete task"
      >
        🗑️ Delete
      </button>
    `;

    const checkbox = item.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
      toggleTaskCompletion(task.id);
    });

    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskListContainer.appendChild(item);
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
