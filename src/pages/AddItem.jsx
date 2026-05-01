import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem({ addTask }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate the form fields
  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required!";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!formData.date) {
      newErrors.date = "Please pick a due date.";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // All good — add the task
    addTask(formData);
    setSuccessMsg("🎉 Task added successfully!");
    setFormData({ title: "", description: "", priority: "Medium", date: "" });
    setErrors({});

    // Go to list after a short delay
    setTimeout(() => {
      navigate("/list");
    }, 1500);
  };

  return (
    <div className="add-form-card">
      <h2>➕ Add New Task</h2>

      {successMsg && <div className="success-msg">{successMsg}</div>}

      <div className="form-group">
        <label>Task Title *</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Finish homework"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Description (optional)</label>
        <textarea
          name="description"
          rows="3"
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
      </div>

      <div className="form-group">
        <label>Due Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error-text">{errors.date}</p>}
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
          ✅ Add Task
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/list")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddItem;
