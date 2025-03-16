import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api"; // Importamos la función de api.js

function NewTask({ onAddTask }) {
  const [newTask, setNewTask] = useState({
    title: "",         // Estado para el título de la tarea
    description: "",   // Estado para la descripción de la tarea
    createdAt: new Date() // Fecha de creación de la tarea
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que los campos no estén vacíos
    if (newTask.title === "" || newTask.description === "") {
      return;
    }
    try {
      const createdTask = await createTask(newTask); // Llamamos a la función de api.js con la tarea completa
      onAddTask(createdTask); // Pasamos la nueva tarea al componente App
      navigate("/"); // Redirigir a la pantalla principal al agregar la tarea
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value, // Actualiza el campo correspondiente
    }));
  };

  return (
    <div className="p-3">
      <p>Crear Nueva Tarea</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
        <input
          type="text"
          name="title"  // Asegúrate de que el nombre coincida con el estado
          placeholder="Nombre de la tarea"
          value={newTask.title}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg outline-none"
        />
        <textarea
          name="description"  // Asegúrate de que el nombre coincida con el estado
          placeholder="Descripción de la tarea"
          value={newTask.description}
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

export default NewTask;
