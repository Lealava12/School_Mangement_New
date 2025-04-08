import React, { useState } from "react";
import "./Sidebar.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaBullhorn, FaSignOutAlt } from "react-icons/fa";
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaMoneyBillWave, FaChartBar } from "react-icons/fa"

const Sidebar = () => {
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
        {/* <Link
          to="/Dashboard"
          className={activeLink === "Dashboard" ? "active" : ""}
          onClick={() => handleLinkClick("Dashboard")}
        >
          <FaTachometerAlt style={{ marginRight: "8px" }} /> Dashboard
        </Link> */}
        <Link
          to="/Teacherm"
          className={activeLink === "Teacherm" ? "active" : ""}
          onClick={() => handleLinkClick("Teacherm")}
        >
          <FaChalkboardTeacher style={{ marginRight: "8px" }} />
          Teacher Management
        </Link>
        <Link
          to="/Studentm"
          className={activeLink === "Studentm" ? "active" : ""}
          onClick={() => handleLinkClick("Studentm")}
        >
          <FaUserGraduate style={{ marginRight: "8px" }} />
          Student Management
        </Link>
        <Link
          to="/Fee"
          className={activeLink === "Fee" ? "active" : ""}
          onClick={() => handleLinkClick("Fee")}
        >
          <FaMoneyBillWave style={{ marginRight: "8px" }} />
          Fee Management
        </Link>
        <Link
          to="/TimeTable"
          className={activeLink === "TimeTable" ? "active" : ""}
          onClick={() => handleLinkClick("TimeTable")}
        >
          <FaCalendarAlt style={{ marginRight: "8px" }} />
          TimeTable
        </Link>
        {/* <Link
          to="/Reports"
          className={activeLink === "Reports" ? "active" : ""}
          onClick={() => handleLinkClick("Reports")}
        >
          <FaChartBar style={{ marginRight: "8px" }} />
          Stusdents Results
        </Link> */}
        <Link
          to="/Notice"
          className={activeLink === "Noticee" ? "active" : ""}
          onClick={() => handleLinkClick("Noticee")}
        >
          <FaBullhorn style={{ marginRight: "8px" }} />
          Notice
        </Link>
        <Link
          style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
          onClick={handleLogout}
        >
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Logout
        </Link>
      </Grid>
    </Grid>
  );
};

export default Sidebar;