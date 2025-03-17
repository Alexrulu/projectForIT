import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Task({ task, onDeleteTask, onCompleteTask }) {
  const navigate = useNavigate();
  const { title, description, createdAt, id } = task;
  const [animation, setAnimation] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleEditClick = () => {
    navigate("/update-task", { state: { title, description, createdAt, id } });
  };

  const handleCompleteClick = () => {
    setAnimation("complete");
  };

  const handleDeleteClick = () => {
    setAnimation("delete");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.article
      initial={{ x: 0, opacity: 1 }}
      animate={
        animation === "complete"
          ? { x: 200, opacity: 0, borderColor: "#14b8a6" }
          : animation === "delete"
          ? { x: -200, opacity: 0, borderColor: "#e11d48" }
          : {}
      }
      transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (animation === "complete") onCompleteTask(id);
        if (animation === "delete") onDeleteTask(id);
      }}
      onClick={handleExpandClick}
      className={`flex cursor-pointer justify-between border-solid border-1 border-gray-300 p-2 rounded-xl items-center shadow-xl shadow-gray-200 hover:scale-103 transition duration-150 ${
        animation === "complete" ? "border-teal-500" : ""
      } ${animation === "delete" ? "border-rose-500" : ""}`}>
      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: expanded ? "auto" : "3.6rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden">

        <p className="text-xs italic">{new Date(createdAt).toLocaleDateString()}</p>
        <p className={`text-md pr-1 font-bold ${expanded ? "break-words" : "truncate"}`}>{title}</p>
        <p className={`text-sm pr-1 ${expanded ? "break-words" : "truncate"}`}>{description}</p>

      </motion.div>
      <div className="flex gap-3">
        <i onClick={handleEditClick} className="fa-solid fa-pen px-3 py-2 bg-gray-200 rounded-xl hover:bg-gray-400 transition duration-150"></i>
        <i onClick={handleCompleteClick} className="fa-solid fa-check px-3 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-700 transition duration-150"></i>
        <i onClick={handleDeleteClick} className="fa-solid fa-trash px-3 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-700 transition duration-150"></i>
      </div>
    </motion.article>
  );
}

export default Task;
