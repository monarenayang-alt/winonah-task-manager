import { useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function List({ tasks, deleteTask, toggleComplete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter tasks based on search and status filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="page-title">📋 My Tasks</h2>

      {/* Search bar */}
      <div style={{ marginBottom: "14px" }}>
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "2px solid #eee",
            borderRadius: "25px",
            fontFamily: "Nunito, sans-serif",
            fontSize: "0.95rem",
            width: "100%",
            maxWidth: "380px",
            outline: "none",
          }}
        />
      </div>

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", "Pending", "Completed"].map((option) => (
          <button
            key={option}
            className={`btn btn-sm ${filter === option ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found! 🌿</p>
          <Link to="/add" className="btn btn-primary">
            Add a Task
          </Link>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))
      )}
    </div>
  );
}

export default List;
