<!DOCTYPE html>
<html>
<head>
  <title>Task Manager</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Task Manager</h2>

<div id="auth">
  <input id="email" placeholder="Email">
  <input id="password" type="password" placeholder="Password">
  <button onclick="register()">Register</button>
  <button onclick="login()">Login</button>
</div>

<div id="app" style="display:none;">
  <input id="taskInput" placeholder="New task">
  <button onclick="addTask()">Add</button>
  <ul id="taskList"></ul>
</div>

<script src="app.js"></script>
</body>
</html>
