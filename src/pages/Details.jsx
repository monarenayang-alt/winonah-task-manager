import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Details({ tasks, editTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the task by id
  const task = tasks.find((t) => t.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task || {});
  const [saveMsg, setSaveMsg] = useState("");

  // Task not found
  if (!task) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ fontSize: "1.1rem", color: "#999" }}>Task not found.</p>
        <Link to="/list" className="btn btn-primary" style={{ marginTop: "14px" }}>
          Back to List
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!editData.title.trim()) {
      alert("Title cannot be empty!");
      return;
    }
    editTask(editData);
    setIsEditing(false);
    setSaveMsg("✅ Task updated successfully!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  return (
    <div>
      <Link to="/list" className="back-link">
        ← Back to My Tasks
      </Link>

      <div className="details-card">
        <h2>📌 Task Details</h2>

        {saveMsg && <div className="success-msg">{saveMsg}</div>}

        {!isEditing ? (
          // VIEW MODE
          <div>
            <div className="details-row">
              <span>Title: </span> {task.title}
            </div>
            <div className="details-row">
              <span>Description: </span> {task.description || "No description added."}
            </div>
            <div className="details-row">
              <span>Priority: </span>
              <span className={`priority-badge priority-${task.priority}`}>
                {task.priority}
              </span>
            </div>
            <div className="details-row">
              <span>Due Date: </span> {task.date}
            </div>
            <div className="details-row">
              <span>Status: </span>{" "}
              {task.completed ? "✅ Completed" : "⏳ Pending"}
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditData(task);
                  setIsEditing(true);
                }}
              >
                ✏️ Edit Task
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/list")}>
                Back
              </button>
            </div>
          </div>
        ) : (
          // EDIT MODE
          <div className="edit-form">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={editData.description}
              onChange={handleChange}
            />

            <label>Priority</label>
            <select name="priority" value={editData.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label>Due Date</label>
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleChange}
            />

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="btn btn-success" onClick={handleSave}>
                💾 Save Changes
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
