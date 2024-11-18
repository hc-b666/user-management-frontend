import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/auth/signin");
  };

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="/arcane-logo.svg" className="h-24" />
      </NavLink>

      {token && (
        <button onClick={handleLogout} className="navbar-btn">
          Log out
        </button>
      )}
    </nav>
  );
}

export default Navbar;
