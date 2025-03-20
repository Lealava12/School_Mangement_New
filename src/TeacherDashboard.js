

import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';  // Import axios
import Teachersidebar from "./Teachersidebar";


const TeacherDashboard = () => {

  return (
    <>
      <Teachersidebar />
      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "" }}>Dashboard :</Typography>

   </Grid>
    </>
  );
};

export default TeacherDashboard;
