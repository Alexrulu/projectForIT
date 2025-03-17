require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let taskIdCounter = 1;

// Endpoints
app.get('/api/tasks', (req, res) => res.json(tasks));

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente!");
});

// Ruta para crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title y description son obligatorios" });
  }
  const newTaskWithId = {
    id: taskIdCounter++,
    title,
    description,
    createdAt: new Date()
  };
  tasks.push(newTaskWithId);
  res.status(201).json(newTaskWithId);
});

// Ruta para actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);
  if (taskIndex === -1) {
      return res.status(404).json({ error: "Tarea no encontrada" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
      return res.status(400).json({ error: "Title y description son obligatorios" });
  }
  tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description
  };
  res.json(tasks[taskIndex]);
});

// Ruta para marcar una tarea como completada
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find(task => task.id == id);
  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  task.completed = completed;
  res.json(task);
});

// Ruta para eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id == id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tasks = tasks.filter(task => task.id != id);
  res.json({ message: 'Tarea eliminada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
