import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
        ✅ Winonah's Tasks
      </Link>
      <ul className="navbar-links">
        {token ? (
          // Show these links only when logged in
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/list">My Tasks</Link></li>
            <li><Link to="/add">+ Add Task</Link></li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
              >
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          // Show these links only when NOT logged in
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
