import React, { useState } from "react";
import "./Sidebar.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleLogout = () => {
    axios
      .post(`http://127.0.0.1:5000/api/admin/logout`)
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
          to="/Teacherm"
          className={activeLink === "home" ? "active" : ""}
          onClick={() => handleLinkClick("home")}
        >
          Teacher Management
        </Link>
        <Link
          to="/Studentm"
          className={activeLink === "news" ? "active" : ""}
          onClick={() => handleLinkClick("news")}
        >
          Student Management
        </Link>
        <Link
          to="/Fee"
          className={activeLink === "contact" ? "active" : ""}
          onClick={() => handleLinkClick("contact")}
        >
          Fee Management
        </Link>
        <Link
          to="/Reports"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Reports
        </Link>
        <Link
          to="/Notice"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Notice
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

export default Sidebar;