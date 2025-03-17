function Completed({ task }) {
  return (
    <article className="py-2 flex justify-between">
      <p className="text-xs truncate pr-1">{task.title}</p>
      <p className="text-xs">{new Date(task.createdAt).toLocaleDateString()}</p>
    </article>
  );
}

export default Completed;
