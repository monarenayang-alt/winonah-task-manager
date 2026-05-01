import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const data = await login(formData.email, formData.password);
    setLoading(false);

    if (data.token) {
      navigate("/");
    } else {
      setError(data.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="add-form-card">
      <h2>🔐 Login</h2>

      {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "16px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#7c3aed" }}>Register here</Link>
      </p>
    </div>
  );
}

export default Login;