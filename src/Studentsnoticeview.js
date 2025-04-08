import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";

const Studentsnoticeview = () => { // Corrected component name
  const [timeTables, setTimeTables] = useState([]);
  const apiBaseUrl = 'http://localhost:5000/api'; // Ensure this matches your backend base URL

  // Fetch all timetables
  const fetchTimeTables = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/timetable`);
      setTimeTables(response.data);
    } catch (error) {
      console.error("Failed to fetch timetables:", error);
    }
  };

  // Fetch timetables on component mount
  useEffect(() => {
    fetchTimeTables();
  }, []);

  return (
    <>
      <Studentsidebar />
      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>View Notice:</Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {timeTables.map((timeTable) => ( // Replaced `notices` with `timeTables`
            <Grid item xs={12} sm={6} md={4} key={timeTable.id}>
              <Box
                sx={{
                  width: 300,
                  height: 200,
                  borderRadius: 1,
                  bgcolor: '#FFF5EE',
                  borderStyle: 'solid',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                <Typography style={{ fontWeight: 600, marginBottom: "10px" }}>{timeTable.title}</Typography>
                {timeTable.file_path && (
                  <img
                    src={`http://localhost:5000${timeTable.file_path}`}
                    alt={timeTable.title}
                    style={{ maxWidth: "100%", maxHeight: "100px", objectFit: "contain" }}
                  />
                )}
                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                  Uploaded on: {new Date(timeTable.uploaded_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Studentsnoticeview; // Corrected export statement