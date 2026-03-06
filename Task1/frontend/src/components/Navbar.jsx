import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="container navbar-content">

        {/* LOGO */}
        <Link to="/" className="logo">
          <FaBriefcase />
          JobBoard
        </Link>

        {/* HAMBURGER ICON */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* NAV LINKS */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link
                to="/register"
                className="nav-btn"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  user.user.role === "employer"
                    ? "/employer"
                    : "/candidate"
                }
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button
                className="nav-btn"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
