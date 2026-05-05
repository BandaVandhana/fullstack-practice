import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks (GET)
  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  // Run once when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task (POST)
  const addTask = () => {
    if (!title.trim()) return;

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // Delete task (DELETE)
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTasks())
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button onClick={addTask}>Add</button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              {task.title}
              <button
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;