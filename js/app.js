/* =============================================
   To-Do Life Dashboard — app.js
   ============================================= */

/* -------------------------------------------------- */
/*  1. GREETING — Clock, Date, Time-of-day message    */
/* -------------------------------------------------- */

const timeEl   = document.getElementById('current-time');
const dateEl   = document.getElementById('current-date');
const greetEl  = document.getElementById('greeting-text');

function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good Morning ☀️';
  if (hour >= 12 && hour < 17) return 'Good Afternoon 🌤️';
  if (hour >= 17 && hour < 21) return 'Good Evening 🌇';
  return 'Good Night 🌙';
}

function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const s    = String(now.getSeconds()).padStart(2, '0');

  timeEl.textContent = `${h}:${m}:${s}`;

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  dateEl.textContent =
    `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  greetEl.textContent = getGreeting(now.getHours());
}

updateClock();
setInterval(updateClock, 1000);


/* -------------------------------------------------- */
/*  2. FOCUS TIMER (Pomodoro — 25 min default)        */
/* -------------------------------------------------- */

const TIMER_DURATION = 25 * 60; // seconds

let timerTotal     = TIMER_DURATION;
let timerRemaining = TIMER_DURATION;
let timerInterval  = null;
let timerRunning   = false;

const timerDisplayEl = document.getElementById('timer-display');
const btnStart       = document.getElementById('btn-start');
const btnStop        = document.getElementById('btn-stop');
const btnReset       = document.getElementById('btn-reset');

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerDisplayEl.textContent = formatTime(timerRemaining);
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(() => {
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerDisplayEl.textContent = '00:00';
      alert('⏰ Focus session complete! Take a break.');
      return;
    }
    timerRemaining--;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  stopTimer();
  timerRemaining = timerTotal;
  renderTimer();
}

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);

renderTimer();


/* -------------------------------------------------- */
/*  3. TO-DO LIST                                     */
/* -------------------------------------------------- */

const STORAGE_KEY_TASKS = 'dashboard_tasks';

let tasks = loadTasks();

const taskInput   = document.getElementById('task-input');
const btnAddTask  = document.getElementById('btn-add-task');
const taskListEl  = document.getElementById('task-list');

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_TASKS)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  renderTasks();
}

function startEdit(id) {
  const item = document.querySelector(`[data-id="${id}"]`);
  if (!item) return;

  const task = tasks.find(t => t.id === id);
  if (!task) return;

  // Replace label with an input
  const label = item.querySelector('.task-label');
  label.style.display = 'none';

  const editInput = document.createElement('input');
  editInput.type  = 'text';
  editInput.value = task.text;
  editInput.className = 'task-edit-input';

  item.insertBefore(editInput, label.nextSibling);
  editInput.focus();
  editInput.select();

  function commitEdit() {
    const newText = editInput.value.trim();
    if (newText) task.text = newText;
    saveTasks();
    renderTasks();
  }

  editInput.addEventListener('blur', commitEdit);
  editInput.addEventListener('keydown', e => {
    if (e.key === 'Enter')  commitEdit();
    if (e.key === 'Escape') renderTasks(); // cancel
  });
}

function renderTasks() {
  taskListEl.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className  = 'task-item';
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type    = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const label = document.createElement('span');
    label.className   = 'task-label' + (task.done ? ' done' : '');
    label.textContent = task.text;
    // Double-click to edit
    label.addEventListener('dblclick', () => startEdit(task.id));

    const delBtn = document.createElement('button');
    delBtn.className   = 'btn btn-danger';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delBtn);
    taskListEl.appendChild(li);
  });
}

btnAddTask.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

renderTasks();


/* -------------------------------------------------- */
/*  4. QUICK LINKS                                    */
/* -------------------------------------------------- */

const STORAGE_KEY_LINKS = 'dashboard_links';

const DEFAULT_LINKS = [
  { id: 1, name: 'Google',   url: 'https://www.google.com' },
  { id: 2, name: 'Gmail',    url: 'https://mail.google.com' },
  { id: 3, name: 'Calendar', url: 'https://calendar.google.com' },
];

let links = loadLinks();

const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput  = document.getElementById('link-url-input');
const btnAddLink    = document.getElementById('btn-add-link');
const linksContainer = document.getElementById('links-container');

function loadLinks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_LINKS));
    return stored && stored.length ? stored : DEFAULT_LINKS;
  } catch {
    return DEFAULT_LINKS;
  }
}

function saveLinks() {
  localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(links));
}

function addLink() {
  const name = linkNameInput.value.trim();
  let   url  = linkUrlInput.value.trim();
  if (!name || !url) return;

  // Auto-prepend protocol if missing
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  links.push({ id: Date.now(), name, url });
  saveLinks();
  renderLinks();
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  linkNameInput.focus();
}

function removeLink(id) {
  links = links.filter(l => l.id !== id);
  saveLinks();
  renderLinks();
}

function renderLinks() {
  linksContainer.innerHTML = '';

  links.forEach(link => {
    const chip = document.createElement('div');
    chip.className = 'link-chip';

    const anchor = document.createElement('a');
    anchor.href        = link.url;
    anchor.textContent = link.name;
    anchor.target      = '_blank';
    anchor.rel         = 'noopener noreferrer';

    const removeBtn = document.createElement('button');
    removeBtn.className   = 'remove-link';
    removeBtn.textContent = '×';
    removeBtn.title       = 'Remove link';
    removeBtn.addEventListener('click', () => removeLink(link.id));

    chip.appendChild(anchor);
    chip.appendChild(removeBtn);
    linksContainer.appendChild(chip);
  });
}

btnAddLink.addEventListener('click', addLink);
linkUrlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addLink();
});

renderLinks();
