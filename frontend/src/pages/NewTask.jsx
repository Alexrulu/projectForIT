import { useNavigate } from "react-router-dom";

function NewTask() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); 
  };
  
  return (
    <div class="p-3">
      <p>Crear Nueva Tarea</p>
      <form onSubmit={handleSubmit} class="flex flex-col gap-3 mt-5">

        <input type="text" placeholder="Nombre de la tarea" class="border border-gray-300 p-2 rounded-lg outline-none"/>
        <button type="submit" class="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700 transition shadow-xl shadow-gray-300">Guardar Tarea</button>

      </form>
    </div>
  );
}

export default NewTask;
