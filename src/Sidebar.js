import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Make sure the CSS file is linked

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">AdminPanel</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/Teacherm">Teacher Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Studentm">Student Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Fee">Fee Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/TimeTable">Timetable</Link>
          </li>

          <li className="nav-item">
            <Link to="/Notice">Notice</Link>
          </li>

          <li  style={{color:"red", fontSize:"1.1rem",fontWeight:"bold"  }}>
            <Link to="">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
