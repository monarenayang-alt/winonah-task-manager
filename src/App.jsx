import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import Details from "./pages/Details";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Load tasks from backend when logged in
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks || []))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, [token]);

  // Add a new task
  const addTask = async (newTask) => {
    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
        status: "pending",
        due_date: newTask.date,
      }),
    });
    const data = await res.json();
    setTasks([...tasks, data.task]);
  };

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle complete/incomplete
  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const newStatus = task.status === "completed" ? "pending" : "completed";
    const res = await fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? data.task : t)));
  };

  // Edit a task
  const editTask = async (updatedTask) => {
    const res = await fetch(`${API}/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedTask.title,
        description: updatedTask.description,
        due_date: updatedTask.date,
      }),
    });
    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? data.task : t)));
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    return data;
  };

  // Register
  const register = async (name, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]);
  };

  // This protects any page that requires login
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar token={token} logout={logout} />
      <div className="main-content">
        <Routes>
          {/* Public routes - anyone can visit */}
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register register={register} />} />

          {/* Private routes - must be logged in */}
          <Route path="/" element={<PrivateRoute><Home tasks={tasks} /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home tasks={tasks} /></PrivateRoute>} />
          <Route path="/list" element={<PrivateRoute><List tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} /></PrivateRoute>} />
          <Route path="/details/:id" element={<PrivateRoute><Details tasks={tasks} editTask={editTask} /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddItem addTask={addTask} /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;