import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast("Logged out successfully");
    navigate("/auth/signin");
  }

  return (
    <nav className="w-[1440px] mx-auto px-20 py-2 flex items-center justify-between">
      <NavLink to="/" className="text-black text-5xl font-bold">
        <img src="/arcane-logo.svg" className="h-24" />
      </NavLink>

      {token && (
        <button onClick={handleLogout} className="text-white text-lg py-2 px-4 font-medium bg-blue-500 rounded-md">Log out</button>
      )}
    </nav>
  );
}

export default Navbar;
