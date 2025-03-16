import { useNavigate } from 'react-router-dom';

function Work({ task }) {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/update-task');
  };

  return (

    <article class="flex justify-between border-solid border-1 border-gray-300 p-2 rounded-xl items-center shadow-xl shadow-gray-200 hover:scale-103 transition duration-150">
      <p class="text-sm truncate pr-1">{task}</p>
      <div class="flex gap-3">
        <i onClick={handleEditClick} class="fa-solid fa-pen px-3 py-2 bg-gray-200 rounded-xl hover:bg-gray-400 transition duration-150"></i>
        <i class="fa-solid fa-check px-3 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-700 transition duration-150"></i>
        <i class="fa-solid fa-trash px-3 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-700 transition duration-150"></i>
      </div>
    </article>

  )
}

export default Work