import React, { useState } from "react";
import "./Sidebar.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Teachersidebar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const apiBaseUrl = 'http://localhost:5000/api';
  const handleLogout = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`)
      .then((response) => {
        alert(response.data.message); // Display the success message
        if (response.data.redirect) {
          window.location.href = response.data.redirect; // Redirect to Signin.js
        } else {
          window.location.href = "/"; // Default redirect to the home page
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || "Error during logout!";
        alert(errorMessage); // Show the error message
        if (error.response?.data?.redirect) {
          window.location.href = error.response.data.redirect; // Redirect on error if provided
        }
      });
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Grid>
    <Grid className="sidebar">

       <Link
                to="/Teacherdashboard"
                className={activeLink === "home" ? "active" : ""}
                onClick={() => handleLinkClick("home")}
              >
                Dashboard
              </Link>
        <Link
          to="/Classm"
          className={activeLink === "home" ? "active" : ""}
          onClick={() => handleLinkClick("home")}
        >
          Class Management
        </Link>
        <Link
          to="/Attendancem"
          className={activeLink === "news" ? "active" : ""}
          onClick={() => handleLinkClick("news")}
        >
          Attendance Management
        </Link>
        <Link
          to="/Assignmentm"
          className={activeLink === "contact" ? "active" : ""}
          onClick={() => handleLinkClick("contact")}
        >
          Assignment Management
        </Link>
        <Link
          to="/Marksentry"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Marks Entry
        </Link>
        <Link
          to="/NoticeView"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Notice
        </Link>

        <Link
          to="/TimeTable"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          TimeTable
        </Link>
        <Link
          style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </Link>
      </Grid>
    </Grid>
  );
};

export default Teachersidebar;