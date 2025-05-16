import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Make sure the CSS file is linked
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const apiBaseUrl = 'http://localhost:5000/api';

  const handleLogout = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`, {}, { withCredentials: true })
      .then((response) => {
        alert(response.data.message);

        // Replace history and redirect to signin
        window.location.replace(response.data.redirect || "/Signin");
        window.history.pushState(null, "", "/Signin");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        const errorMessage = error.response?.data?.error || "Error during logout!";
        alert(errorMessage);

        // Replace history and redirect to signin
        window.location.replace(error.response?.data?.redirect || "/Signin");
        window.history.pushState(null, "", "/Signin");
      });
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Admin Panel</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/Teacherm" onClick={() => handleLinkClick('teacher')}>Teacher Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Studentm" onClick={() => handleLinkClick('student')}>Student Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Fee" onClick={() => handleLinkClick('fee')}>Fee Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/TimeTable" onClick={() => handleLinkClick('timetable')}>Timetable</Link>
          </li>

          <li className="nav-item">
            <Link to="/Notice" onClick={() => handleLinkClick('notice')}>Notice</Link>
          </li>

          <li className="nav-item">
            <button
              onClick={handleLogout}
              style={{
                color: "red",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "1rem"
              }}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
