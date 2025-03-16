import { Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Work from './components/Work.jsx';
import Completed from './components/Completed.jsx';
import NewTask from './pages/NewTask.jsx';
import UpdateTask from './pages/UpdateTask.jsx';
import { getTasks } from './api';
import { completeTask } from "./api"; // Importamos la función PATCH
import { deleteTask as deleteTaskAPI } from "./api"; // Importamos la función DELETE

function App() {
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const location = useLocation();
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, [location]);
  // Función para agregar una tarea al estado
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  // Función para actualizar una tarea
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  // Función para marcar la tarea como completada
  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);  // Llamar a la API para completar la tarea
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      );  // Actualizar el estado local con la tarea completada
      setTasks(updatedTasks);  // Establecer el nuevo estado de las tareas
    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }
  };
  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId); // Eliminamos en el servidor
      setTasks(tasks.filter((task) => task.id !== taskId)); // Actualizamos el estado
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  // Filtrar las tareas completadas
  const completedTasks = tasks.filter(task => task.completed);

  const pendingTasks = tasks.filter(task => !task.completed);


  return (
    <div className="py-5 flex flex-col gap-10">

      <header className="flex justify-between items-center px-3">
        <Link to="/" className={`${location.pathname === "/new-task" || location.pathname === "/update-task" ? "border-1 border-gray-300 p-1 rounded-xl hover:scale-105 transition duration-150" : "text-xl"}`}>Mis Tareas</Link>
        {location.pathname !== "/new-task" && (
          <Link to="/new-task" className="text-white bg-rose-500 p-2 rounded-xl shadow-xl shadow-gray-300 hover:bg-rose-700 transition duration-150">Nueva Tarea</Link>
        )}
      </header>

      <Routes>
        <Route path="/" element={
          <main className="flex flex-col gap-5 px-3">
            {tasks.length > 0 ? (
              pendingTasks.map((task) => (
                <Work key={task.id} task={task} onDeleteTask={deleteTask} onCompleteTask={handleCompleteTask} />
              ))
            ) : (
              <p>No hay tareas pendientes.</p>
            )}
          </main>
        }/>
        <Route path="/new-task" element={<NewTask onAddTask={addTask} />} />
        <Route path="/update-task" element={<UpdateTask tasks={tasks} onUpdateTask={updateTask} />} />
      </Routes>

      {location.pathname !== "/new-task" && location.pathname !== "/update-task" && (
        <footer className="sticky bottom-0 bg-white/50 backdrop-blur h-40 border-t-1 border-solid border-gray-300 p-2 shadow-top">
          <p>Completadas</p>
          <div className="flex flex-col gap-1">
          {completedTasks.map((task) => (
            <Completed key={task.id} task={task} />
          ))}
        </div>
        </footer>
      )}

    </div>
  );
}
export default App;
