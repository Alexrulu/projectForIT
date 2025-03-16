import { Routes, Route, Link, useLocation } from "react-router-dom";
import Work from './components/Work.jsx'
import Completed from './components/Completed.jsx'
import NewTask from './pages/NewTask.jsx'
import UpdateTask from './pages/UpdateTask.jsx'

function App() {
  const location = useLocation();

  return (

    <div class="py-5 flex flex-col gap-10">

      <header class="flex justify-between items-center px-3">
      <Link to="/" className={`${location.pathname === "/new-task" || location.pathname === "/update-task" ? "border-1 border-gray-300 p-1 rounded-xl hover:scale-105 transition duration-150" : "text-xl"}`}>Mis Tareas</Link>
      {location.pathname !== "/new-task" && (
        <Link to="/new-task" class="text-white bg-rose-500 p-2 rounded-xl shadow-xl shadow-gray-300hover:bg-rose-700 transition duration-150">Nueva Tarea</Link>
      )}
      </header>

      <Routes>
        <Route path="/" element={
          <main class="flex flex-col gap-5 px-3">
            <Work task="Tarea 1"/>
            <Work task="Tarea 2"/>
            <Work task="Tarea 3"/>
            <Work task="Tarea 1"/>
            <Work task="Tarea 2"/>
            <Work task="Tarea 3"/>
            <Work task="Tarea 1"/>
            <Work task="Tarea 2"/>
            <Work task="Tarea 3"/> 
          </main>
        }/>
        <Route path="/new-task" element={<NewTask/>}/>
        <Route path="/update-task" element={<UpdateTask/>}/>
      </Routes>

      {location.pathname !== "/new-task" && location.pathname !== "/update-task" && (
        <footer class="sticky bottom-0 bg-white/50 backdrop-blur h-40 border-t-1 border-solid border-gray-300 p-2 shadow-top">
   
         <p>Completadas</p>
         <div class="flex flex-col gap-1">
           <Completed task="Tarea 1"/>
           <Completed task="Tarea 1"/>
           <Completed task="Tarea 1"/>
         </div>
         
        </footer>
      )}

    </div>
    
  )
}

export default App
