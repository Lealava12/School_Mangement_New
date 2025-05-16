import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";

const StudentTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all timetables
  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/timetable`);
      setTimetables(response.data);
    } catch (error) {
      console.error("Failed to fetch timetables:", error);
    }
  };

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
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px" }}>View Timetables:</Typography>
        <Grid container spacing={3} sx={{ marginTop: "5px" }}>
          {timetables.map((timetable) => (
            <Grid item xs={12} sm={6} md={4} key={timetable.id}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  minHeight: 200,
                  borderRadius: 1,
                  bgcolor: 'gray',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  mx: 'auto',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Typography sx={{ color: "white", fontSize: { xs: '14px', sm: '16px' } }}>
                  {timetable.title}
                </Typography>
                <Typography sx={{ color: "white", fontSize: { xs: '10px', sm: '12px' } }}>
                  Uploaded on: {new Date(timetable.uploaded_at).toLocaleDateString()}
                </Typography>
                {timetable.file_url && (
                  <a
                    href={timetable.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#fff", marginTop: 8 }}
                  >
                    View File
                  </a>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StudentTimetable;