import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";

const StudentTimetable = () => {
  const [timetables, setTimetables] = useState([]); // Changed state to store timetables
  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all timetables
  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/timetable`);
      setTimetables(response.data); // Store fetched timetables in state
    } catch (error) {
      console.error("Failed to fetch timetables:", error);
    }
  };

  // Fetch timetables on component mount
  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <>
      <Studentsidebar />
      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>View Timetables:</Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {timetables.map((timetable) => (
            <Grid item xs={12} sm={6} md={4} key={timetable.id}>
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
                <Typography style={{ fontWeight: 600, marginBottom: "10px" }}>{timetable.title}</Typography>
                {timetable.file_path && (
                  <a
                    href={`http://localhost:5000${timetable.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000066", textDecoration: "underline", fontSize: "14px" }}
                  >
                    View Timetable
                  </a>
                )}
                <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
                  Uploaded on: {new Date(timetable.uploaded_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StudentTimetable;