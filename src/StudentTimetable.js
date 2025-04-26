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
      <Box
        sx={{

          p: 3,
          borderRadius: 2,
          maxWidth: "1300px",
          mx: "auto",
          mt: 13,
        }}
      >
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", }}>View Timetables:</Typography>
        <Grid container spacing={3} sx={{ marginTop: "5px" }}>
          {timetables.map((timetable) => (
            <Grid item xs={12} sm={6} md={4} key={timetable.id}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  minHeight: 200,
                  borderRadius: 1,
                  bgcolor: '#FFF5EE',
                  border: '1px solid #ddd',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  mx: 'auto',
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    marginBottom: "10px",
                    wordBreak: 'break-word',
                    color: '#000066',
                    fontSize: '16px'
                  }}
                >
                  {timetable.title}
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginTop: "10px",
                    color: "#666"
                  }}
                >
                  Uploaded on: {new Date(timetable.uploaded_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Box>
    </>
  );
};

export default StudentTimetable;