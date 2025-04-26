// import React, { useState } from "react";
// import "./Sidebar.css";
// import { Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FaTachometerAlt } from "react-icons/fa";
// import { FaUser, FaFileAlt, FaBullhorn, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

// const Studentsidebar = () => {
//   const [activeLink, setActiveLink] = useState("home");
//   const apiBaseUrl = 'http://localhost:5000/api';
//   const handleLogout = () => {
//     axios
//       .post(`${apiBaseUrl}/admin/logout`)
//       .then((response) => {
//         alert(response.data.message); // Display the success message
//         if (response.data.redirect) {
//           window.location.href = response.data.redirect; // Redirect to Signin.js
//         } else {
//           window.location.href = "/"; // Default redirect to the home page
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.error || "Error during logout!";
//         alert(errorMessage); // Show the error message
//         if (error.response?.data?.redirect) {
//           window.location.href = error.response.data.redirect; // Redirect on error if provided
//         }
//       });
//   };

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <Grid>
//       <Grid className="sidebar">
//         {/* <Link
//           to="/StudentDashboard"
//           className={activeLink === "StudentDashboard" ? "active" : ""}
//           onClick={() => handleLinkClick("StudentDashboard")}
//         >
//           <FaTachometerAlt style={{ marginRight: "8px" }} /> Dashboard
//         </Link> */}
//         <Link
//           to="/ProfileDetails"
//           className={activeLink === "ProfileDetails" ? "active" : ""}
//           onClick={() => handleLinkClick("ProfileDetails")}
//         >
//           <FaUser style={{ marginRight: "8px" }} /> 
//           Profile View
//         </Link>

//         <Link
//           to="/ExamResults"
//           className={activeLink === "ExamResults" ? "active" : ""}
//           onClick={() => handleLinkClick("")}
//         >
//           <FaFileAlt style={{ marginRight: "8px" }} />
//           Exam Result
//         </Link>
//         {/* <Link
//           to="/Studentsmarksentry"
//           className={activeLink === "Studentsmarksentry" ? "active" : ""}
//           onClick={() => handleLinkClick("Studentsmarksentry")}
//         >
//           <FaPen style={{ marginRight: "8px" }} />
//           Marks Entry
//         </Link> */}
//         <Link
//           to="/StudentsnoticeView"
//           className={activeLink === "StudentsnoticeView" ? "active" : ""}
//           onClick={() => handleLinkClick("StudentsnoticeView")}
//         >
//           <FaBullhorn style={{ marginRight: "8px" }} />
//           Notice
//         </Link>

//         <Link
//           to="/StudentTimetable"
//           className={activeLink === "TimeTable" ? "active" : ""}
//           onClick={() => handleLinkClick("TimeTable")}
//         >
//           <FaCalendarAlt style={{ marginRight: "8px" }} />
//           TimeTable
//         </Link>
//         <Link
//           style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt style={{ marginRight: "8px" }} />
//           Logout
//         </Link>
//       </Grid>
//     </Grid>
//   );
// };

// export default Studentsidebar;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Make sure the CSS file is linked

const Studentsidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Student Panel</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/ProfileDetails">Profile Details</Link>
          </li>

          <li className="nav-item">
            <Link to="/ExamResults">Exam Results</Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/Studentsmarksentry"> Marks Entry</Link>
          </li> */}

          <li className="nav-item">
            <Link to="/StudentsnoticeView">Notice View</Link>
          </li>

          <li className="nav-item">
            <Link to="/StudentTimetable">Time Table</Link>
          </li>
          <li style={{ color: "red", fontSize: "1.1rem", fontWeight: "bold" }}>
            <Link to="">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Studentsidebar;
