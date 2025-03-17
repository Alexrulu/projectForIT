import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTask } from "../api";
import { motion } from "framer-motion";

function UpdateTask() {
  const { state } = useLocation();
  const task = state || {};
  const { id, title, description } = task;

  const [updatedTask, setUpdatedTask] = useState({
    title: title || "",
    description: description || ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {e.preventDefault();
    if (!updatedTask.title || !updatedTask.description) return;
    try {
      const updated = await updateTask(id, updatedTask);
      console.log("Tarea actualizada:", updated);
      if (state?.onUpdate) {
        state.onUpdate(updated);
      }
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div className="p-3 sm:px-20 md:px-40 lg:px-60 xl:px-80" initial={{ x: "100vw", opacity: 0 }} 
    animate={{ x: 0, opacity: 1 }} 
    exit={{ x: "-100vw", opacity: 0 }} 
    transition={{ type: "spring", stiffness: 100, damping: 15 }}>

      <p>Actualizar Tarea</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
        <input type="text" name="title" placeholder="Nombre de la tarea" value={updatedTask.title} onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg outline-none"/>
        <textarea name="description" placeholder="Descripción de la tarea" value={updatedTask.description} onChange={handleInputChange} className="h-40 border border-gray-300 p-2 rounded-lg outline-none"/>
        <button type="submit" className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700 transition shadow-xl shadow-gray-300">Guardar Tarea</button>
      </form>
      
    </motion.div>
  );
}

export default UpdateTask;
