import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateTask } from "../api"; // Asegúrate de tener esta función en api.js

function UpdateTask() {
  const { state } = useLocation(); // Obtenemos el estado de la navegación
  const task = state || {}; // El estado completo de la tarea
  const { id, title, description } = task; // Desestructuramos las propiedades necesarias

  // Estado para la tarea que se actualizará
  const [updatedTask, setUpdatedTask] = useState({
    title: title || "",         // Inicializa con los valores actuales
    description: description || "", // Inicializa con los valores actuales
    createdAt: new Date() // Puede mantenerse como la fecha actual o la de la tarea
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (updatedTask.title === "" || updatedTask.description === "") return;
  
    try {
      const updated = await updateTask(id, updatedTask);
      console.log("Tarea actualizada:", updated);
  
      // Actualiza la lista de tareas en el estado global si pasas `onUpdate`
      if (state?.onUpdate) {
        state.onUpdate(updated); // Llamar a la función que actualiza la lista de tareas
      }
  
      navigate("/"); // Redirigir a la pantalla principal
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value, // Actualiza el campo correspondiente
    }));
  };

  return (
    <div className="p-3">
      <p>Actualizar Tarea</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
        <input
          type="text"
          name="title"  // Asegúrate de que el nombre coincida con el estado
          placeholder="Nombre de la tarea"
          value={updatedTask.title}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg outline-none"
        />
        <textarea
          name="description"  // Asegúrate de que el nombre coincida con el estado
          placeholder="Descripción de la tarea"
          value={updatedTask.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg outline-none"
        />
        <button
          type="submit"
          className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700 transition shadow-xl shadow-gray-300"
        >
          Guardar Tarea
        </button>
      </form>
    </div>
  );
}

export default UpdateTask;
