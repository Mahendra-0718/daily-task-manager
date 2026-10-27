
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim() }),
    });

    if (!response.ok) {
      alert("Could not add task");
      return;
    }

    setTitle("");
    loadTasks();
  }

  async function toggleTask(task) {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        completed: !task.completed,
      }),
    });

    if (response.ok) loadTasks();
  }

  async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) loadTasks();
  }

  return (
    <main>
      <h1>Daily Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>My Tasks</h2>

      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
          </label>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
