import { useNavigate } from 'react-router-dom';
function Work({ task, onDeleteTask, onCompleteTask }) {  // Ahora solo pasamos 'task', que contiene toda la información
  const navigate = useNavigate();
  const { title, description, createdAt, id } = task;  // Desestructuramos 'task' aquí
  const handleEditClick = () => {
    // Redirigimos a la página de actualización y pasamos el estado con la tarea y su id
    navigate('/update-task', { state: { title, description, createdAt, id } });
  };
  
  return (
    <article className="flex justify-between border-solid border-1 border-gray-300 p-2 rounded-xl items-center shadow-xl shadow-gray-200 hover:scale-103 transition duration-150">
      <div>
        <p className="text-xs">{new Date(createdAt).toLocaleDateString()}</p> {/* Formateamos la fecha */}
        <p className="text-md truncate pr-1">{title}</p>
        <p className="text-sm word-wrap">{description}</p>
      </div>
      <div className="flex gap-3">
        <i 
          onClick={handleEditClick} 
          className="fa-solid fa-pen px-3 py-2 bg-gray-200 rounded-xl hover:bg-gray-400 transition duration-150"
        ></i>
        <i 
          onClick={() => onCompleteTask(id)} 
          className="fa-solid fa-check px-3 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-700 transition duration-150"
        ></i>
        <i 
          onClick={() => onDeleteTask(id)}
          className="fa-solid fa-trash px-3 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-700 transition duration-150"
        ></i>
      </div>
    </article>
  );
}
export default Work;
