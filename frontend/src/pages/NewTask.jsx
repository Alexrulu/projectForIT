import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api";
import { motion } from "framer-motion";

function NewTask({ onAddTask }) {
  const [newTask, setNewTask] = useState({title: "", description: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {e.preventDefault();
    if (!newTask.title || !newTask.description) {
      return;
    }
    try {
      const createdTask = await createTask(newTask);
      onAddTask(createdTask);
      navigate("/");
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({...prev,[name]: value}));
  };

  return (
    <motion.div 
      initial={{ x: "100vw", opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: "-100vw", opacity: 0 }} 
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="p-3 sm:px-20 md:px-40 lg:px-60 xl:px-80">

      <p>Crear Nueva Tarea</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
        <input type="text" name="title" placeholder="Nombre de la tarea" value={newTask.title} onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg outline-none"/>
        <textarea name="description" placeholder="Descripción de la tarea" value={newTask.description} onChange={handleInputChange} className="h-40 border border-gray-300 p-2 rounded-lg outline-none"/>
        <button type="submit" className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700 transition shadow-xl shadow-gray-300">Guardar Tarea</button>
      </form>
      
    </motion.div>
  );
}

export default NewTask;
