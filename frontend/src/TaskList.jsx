import { Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Work from './components/Task.jsx';
import Completed from './components/Completed.jsx';
import NewTask from './pages/NewTask.jsx';
import UpdateTask from './pages/UpdateTask.jsx';
import { getTasks } from './api.js';
import { completeTask } from "./api.js";
import { deleteTask as deleteTaskAPI } from "./api.js";
import { motion } from "framer-motion";

function TaskList() {

  const [tasks, setTasks] = useState([]);
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

  // Marcar la tarea como completada
  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  // Filtrar las tareas completadas
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="py-5 flex flex-col gap-10">

      <header className="flex justify-between items-center px-3 sm:px-20 md:px-40 lg:px-60 xl:px-80">
        <Link to="/" className={`${location.pathname === "/new-task" || location.pathname === "/update-task" ? "border-1 border-gray-300 p-1 rounded-xl hover:scale-105 transition duration-150" : "text-xl"}`}>Mis Tareas</Link>
        {location.pathname !== "/new-task" && (
          <Link to="/new-task" className="text-white bg-rose-500 p-2 rounded-xl shadow-xl shadow-gray-300 hover:bg-rose-700 transition duration-150">Nueva Tarea</Link>
        )}
      </header>

      <Routes>
        <Route path="/" element={
          <motion.main className="flex flex-col gap-5 px-3 sm:px-20 md:px-40 lg:px-60 xl:px-80" initial={{ x: "-100vw", opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          exit={{ x: "100vw", opacity: 0 }} 
          transition={{ type: "spring", stiffness: 100, damping: 15 }}>

            {pendingTasks.filter(task => !task.Completed).length > 0 ? (
                pendingTasks
                  .filter(task => !task.Completed) // Filtra solo las tareas pendientes
                  .map((task) => (
                    <Work key={task.id} task={task} onDeleteTask={deleteTask} onCompleteTask={handleCompleteTask} />
                  ))
              ) : (
              <p>No hay tareas pendientes.</p>
            )}

          </motion.main>
        }/>
        <Route path="/new-task" element={<NewTask onAddTask={addTask} />} />
        <Route path="/update-task" element={<UpdateTask tasks={tasks} onUpdateTask={updateTask} />} />
      </Routes>

      {location.pathname !== "/new-task" && location.pathname !== "/update-task" && (
        <motion.footer className="sticky bottom-0 bg-white/50 backdrop-blur h-40 border-t-1 border-solid border-gray-300 p-3 sm:px-20 md:px-40 lg:px-60 xl:px-80 shadow-top" initial={{ y: 100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}>

          <p>Completadas</p>
          <div className="flex flex-col gap-1">
            {completedTasks.map((task) => (
              <Completed key={task.id} task={task} />
            ))}
          </div>

        </motion.footer>
      )}

    </div>
  );
}
export default TaskList;
