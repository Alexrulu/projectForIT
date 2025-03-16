function Completed({ task }) {
  return (
    <article className="p-2">
      <p className="text-xs truncate pr-1">{task.title}</p>
    </article>
  );
}

export default Completed;
