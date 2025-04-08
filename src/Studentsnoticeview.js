import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";

const Studentsnoticeview = () => {
  const [notices, setNotices] = useState([]);
  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/notices`);
      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <Studentsidebar />
      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>
          Notice Board:
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {notices.map((notice) => (
            <Grid item xs={12} sm={6} md={4} key={notice.id}>
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
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <Typography style={{ fontWeight: 600, marginBottom: "10px", color: "#000066" }}>
                  {notice.title}
                </Typography>
                {notice.file_path && (
                  <img
                    src={`http://localhost:5000${notice.file_path}`}
                    alt={notice.title}
                    style={{ maxWidth: "100%", maxHeight: "100px", objectFit: "contain" }}
                  />
                )}
                <Typography style={{ fontSize: "12px", marginTop: "10px", color: "#666" }}>
                  Posted on: {new Date(notice.uploaded_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          ))}
          {notices.length === 0 && (
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'center', color: '#666' }}>
                No notices available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Studentsnoticeview;