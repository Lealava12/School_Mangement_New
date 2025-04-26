import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Teachersidebar from "./Teachersidebar";

const NoticeView = () => {
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
      <Teachersidebar />
      <Box
                sx={{
                    // backgroundColor: "#f8f8f8",
                    p: 3,
                    borderRadius: 2,
                    maxWidth: "1300px",
                    mx: "auto",
                    mt: 13,
                }}
            >
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#000066",
              fontWeight: 600,
              fontSize: { xs: "16px", sm: "18px" },
              mb: 2,
            }}
          >
            View Notices:
          </Typography>
        </Grid>
<Grid container spacing={3}>
  {notices.map((notice) => (
    <Grid item xs={12} sm={6} md={4} key={notice.id} display="flex" justifyContent="center">
      <Box
        sx={{
          width: '95%', // Slightly less than full width to create nice gap
          height: 230,
          borderRadius: 2,
          bgcolor: '#FFF5EE',
          border: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          textAlign: 'center',
          transition: '0.3s',
          '&:hover': {
            boxShadow: 4, // Optional: nice hover effect
            transform: 'scale(1.02)',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "14px", sm: "16px" },
            mb: 1,
          }}
        >
          {notice.title}
        </Typography>

        {notice.file_path && (
          <img
            src={`http://localhost:5000${notice.file_path}`}
            alt={notice.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        )}

        <Typography
          sx={{
            fontSize: "12px",
            color: "gray",
            mt: 1,
          }}
        >
          Uploaded on: {new Date(notice.uploaded_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>

      </Box>

    </>
  );
};

export default NoticeView;
