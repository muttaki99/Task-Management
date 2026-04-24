const API = "http://localhost:5000/api";
let token = localStorage.getItem("token");

if (token) showApp();

async function register() {
  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert("Registered! Now login.");
}

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  token = data.token;
  localStorage.setItem("token", token);
  showApp();
}

function showApp() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadTasks();
}

async function loadTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: token }
  });
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask('${t._id}')"
        style="text-decoration:${t.completed ? 'line-through':'none'}">
        ${t.title}
      </span>
      <button onclick="deleteTask('${t._id}')">X</button>
    `;

    taskList.appendChild(li);
  });
}

async function addTask() {
  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title: taskInput.value })
  });

  taskInput.value = "";
  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { Authorization: token }
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
  loadTasks();
}
