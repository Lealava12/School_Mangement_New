import React, { useState } from "react";
import "./Sidebar.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPen, FaBullhorn, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { FaTachometerAlt, FaChalkboardTeacher, FaClipboardList, FaBook } from "react-icons/fa";

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

        {/* <Link
          to="/TeacherDashboard"
          className={activeLink === "TeacherDashboard" ? "active" : ""}
          onClick={() => handleLinkClick("TeacherDashboard")}
        >
             <FaTachometerAlt style={{ marginRight: "8px" }} />
          Dashboard
        </Link> */}
        <Link
          to="/Classm"
          className={activeLink === "Classm" ? "active" : ""}
          onClick={() => handleLinkClick("Classm")}
        >
           <FaChalkboardTeacher style={{ marginRight: "8px" }} />
          Class Management
        </Link>
        <Link
          to="/Attendancem"
          className={activeLink === "Attendancem" ? "active" : ""}
          onClick={() => handleLinkClick("Attendancem")}
        >
           <FaClipboardList style={{ marginRight: "8px" }} /> 
          Attendance Management
        </Link>
        <Link
          to="/Assignmentm"
          className={activeLink === "contact" ? "active" : ""}
          onClick={() => handleLinkClick("contact")}
        >
          <FaBook style={{ marginRight: "8px" }} />
          Assignment Management
        </Link>
        <Link
          to="/Marksentry"
          className={activeLink === "Marksentry" ? "active" : ""}
          onClick={() => handleLinkClick("Marksentry")}
        >
               <FaPen style={{ marginRight: "8px" }} />
          Marks Entry
        </Link>
        <Link
          to="/NoticeView"
          className={activeLink === "NoticeView" ? "active" : ""}
          onClick={() => handleLinkClick("NoticeView")}
        >
          <FaBullhorn style={{ marginRight: "8px" }} />
          Notice
        </Link>

        <Link
          to="/Teachertimetable"
          className={activeLink === "Teachertimetable" ? "active" : ""}
          onClick={() => handleLinkClick("Teachertimetable")}
        >
            <FaCalendarAlt style={{ marginRight: "8px" }} />
          TimeTable
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

export default Teachersidebar;