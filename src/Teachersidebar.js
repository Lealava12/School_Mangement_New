import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Make sure the CSS file is linked
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon

const Teachersidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const apiBaseUrl = 'http://localhost:5000/api';

  const handleLogout = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`, {}, { withCredentials: true }) // Ensure cookies are sent
      .then((response) => {
        alert(response.data.message); // Display the success message

        // Redirect based on the backend's response
        if (response.data.redirect) {
          window.location.replace(response.data.redirect); // Redirect to the specified page
        } else {
          window.location.replace("/signin"); // Default redirect to the signin page
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);

        // Handle errors and redirect if specified
        const errorMessage = error.response?.data?.error || "Error during logout!";
        alert(errorMessage); // Show the error message

        // Redirect to signin page on error
        if (error.response?.data?.redirect) {
          window.location.replace(error.response.data.redirect);
        } else {
          window.location.replace("/signin"); // Default redirect to the signin page
        }
      });

    // Prevent browser from caching the previous page
    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = () => {
    //   // Redirect to signin page if the user tries to go back
    //   window.location.replace("/signin");
    // };
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Teacher Panel</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {/* <li className="nav-item">
            <Link to="/Classm" onClick={() => handleLinkClick('class')}>Class Management</Link>
          </li> */}

          <li className="nav-item">
            <Link to="/Attendancem" onClick={() => handleLinkClick('attendance')}>Attendance Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Assignmentm" onClick={() => handleLinkClick('assignment')}>Assignment Management</Link>
          </li>

          <li className="nav-item">
            <Link to="/Marksentry" onClick={() => handleLinkClick('marks')}>Marks Entry</Link>
          </li>

          <li className="nav-item">
            <Link to="/NoticeView" onClick={() => handleLinkClick('noticeView')}>Notice View</Link>
          </li>

          <li className="nav-item">
            <Link to="/Teachertimetable" onClick={() => handleLinkClick('timeTable')}>Time Table</Link>
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

export default Teachersidebar;
