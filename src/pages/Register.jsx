import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register({ register }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const data = await register(formData.name, formData.email, formData.password);
    setLoading(false);

    if (data.token) {
      navigate("/");
    } else {
      setError(data.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="add-form-card">
      <h2>📝 Create Account</h2>

      {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

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
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </button>

      <p style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#7c3aed" }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;