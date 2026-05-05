const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// temporary storage
let tasks = [];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: Date.now(),
    title
  };

  tasks.push(newTask);

  res.json({
    message: "Task added",
    task: newTask
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Task deleted" });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  let task = tasks.find(t => t.id === id);

  if (task) {
    task.title = title;
    res.json({ message: "Task updated", task });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});