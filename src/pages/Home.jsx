import { Link } from "react-router-dom";

function Home({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="home-hero">
      <h1>Hey, Winonah! 👋</h1>
      <p>Welcome to your personal task manager. Stay organised and get things done!</p>

      {/* Stats Section */}
      <div className="home-stats">
        <div className="stat-card">
          <p className="stat-number">{totalTasks}</p>
          <p className="stat-label">Total Tasks</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">{completedTasks}</p>
          <p className="stat-label">Completed</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">{pendingTasks}</p>
          <p className="stat-label">Pending</p>
        </div>
      </div>

      {/* Motivational message */}
      {pendingTasks === 0 && totalTasks > 0 && (
        <p style={{ color: "#4caf50", fontWeight: "700", marginBottom: "20px" }}>
          🎉 You've completed all your tasks! Great job!
        </p>
      )}

      {pendingTasks > 0 && (
        <p style={{ color: "#ff7043", fontWeight: "700", marginBottom: "20px" }}>
          You have {pendingTasks} task{pendingTasks > 1 ? "s" : ""} left to finish. You got this!
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="home-buttons">
        <Link to="/list" className="btn btn-primary">
          📋 View My Tasks
        </Link>
        <Link to="/add" className="btn btn-outline">
          ➕ Add New Task
        </Link>
      </div>
    </div>
  );
}

export default Home;
