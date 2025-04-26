import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Teachersidebar from "./Teachersidebar";

const Teachertimetable = () => {
  const [timetables, setTimetables] = useState([]); // State to store timetables
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
      <Teachersidebar />
      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          p: 3,
          borderRadius: 2,
          maxWidth: "1300px",
          mx: "auto",
          mt: 13,
        }}
      >
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>View Timetables:</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {timetables.map((timetable) => (
            <Grid item xs={12} sm={6} md={4} key={timetable.id}>
              <Box
                sx={{
                  width: '100%', // Full width inside the Grid item
                  height: { xs: 220, sm: 200 }, // a bit flexible for smaller screens
                  borderRadius: 2,
                  bgcolor: '#FFF5EE',
                  border: '1px solid #ddd',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "14px", sm: "16px" },
                    mb: 1,
                  }}
                >
                  {timetable.title}
                </Typography>

                {timetable.file_path && (
                  <a
                    href={`http://localhost:5000${timetable.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#000066",
                      textDecoration: "underline",
                      fontSize: "14px",
                      wordBreak: "break-word",
                    }}
                  >
                    View Timetable
                  </a>
                )}

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "gray",
                    mt: 1,
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

export default Teachertimetable;
