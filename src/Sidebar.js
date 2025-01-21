import React, { useState } from "react";
import "./Sidebar.css";
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Grid>
      
      <Grid className="sidebar">
        <Link to="/Teacherm"
        
          className={activeLink === "home" ? "active" : ""}
          onClick={() => handleLinkClick("home")}
        >
          Teacher Management
        </Link>
        <Link to="/Studentm"
          className={activeLink === "news" ? "active" : ""}
          onClick={() => handleLinkClick("news")}
        >
          Student Management
        </Link>
      <Link to="/Fee"
      
          className={activeLink === "contact" ? "active" : ""}
          onClick={() => handleLinkClick("contact")}
        >
          Fee Management
        </Link>
   <Link to="/Reports"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Reports
        </Link>
        <Link to="/Notice"
          className={activeLink === "about" ? "active" : ""}
          onClick={() => handleLinkClick("about")}
        >
          Notice
        </Link>
      </Grid>
     
    </Grid>
  );
};

export default Sidebar;
