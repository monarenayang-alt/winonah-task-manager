import { Link } from "react-router-dom";

function TaskCard({ task, deleteTask, toggleComplete }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <p className="task-title">{task.title}</p>
        <p className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
          Due: {task.date}
        </p>
      </div>

      <div className="task-actions">
        <button
          className={`btn btn-sm ${task.completed ? "btn-outline" : "btn-success"}`}
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "Undo" : "Done ✓"}
        </button>

        <Link to={`/details/${task.id}`} className="btn btn-sm btn-primary">
          View
        </Link>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteTask(task.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
