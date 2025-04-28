import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./Sidebar.css"; // Make sure the CSS file is linked
import axios from "axios";
import { FaTachometerAlt, FaUser, FaFileAlt, FaBullhorn, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

const Studentsidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const apiBaseUrl = 'http://localhost:5000/api';

  const handleLogout = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`, {}, { withCredentials: true }) // Ensure cookies are sent
      .then((response) => {
        alert(response.data.message); // Display the success message

        // Clear browser history and redirect to the signin page
        window.location.replace(response.data.redirect || "/signin");
      })
      .catch((error) => {
        console.error("Logout error:", error);

        // Handle errors and redirect if specified
        const errorMessage = error.response?.data?.error || "Error during logout!";
        alert(errorMessage); // Show the error message

        // Clear browser history and redirect to the signin page
        window.location.replace(error.response?.data?.redirect || "/signin");
      });

    // Prevent browser from caching the previous page
    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = () => {
    //   window.location.replace("/signin");
    // };
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Student Panel</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/ProfileDetails" onClick={() => handleLinkClick('profile')}>Profile Details</Link>
          </li>

          <li className="nav-item">
            <Link to="/ExamResults" onClick={() => handleLinkClick('examResults')}>Exam Results</Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/Studentsmarksentry">Marks Entry</Link>
          </li> */}

          <li className="nav-item">
            <Link to="/StudentsnoticeView" onClick={() => handleLinkClick('noticeView')}>Notice View</Link>
          </li>
          <li className="nav-item">
            <Link to="/Attendanceview" onClick={() => handleLinkClick('attendance')}>Attendance</Link>
          </li>

          <li className="nav-item">
            <Link to="/Assignmentview" onClick={() => handleLinkClick('attendance')}>Assignment</Link>
          </li>

          <li className="nav-item">
            <Link to="/StudentTimetable" onClick={() => handleLinkClick('timeTable')}>Time Table</Link>
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

export default Studentsidebar;
