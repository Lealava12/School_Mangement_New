import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Teachersidebar from "./Teachersidebar";

const NoticeView = () => {
  const [notices, setNotices] = useState([]);

  const apiBaseUrl = 'http://localhost:5000/api';

  // Helper to check if file is an image
  const isImage = (fileUrl) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileUrl);

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
      <Grid
        className="contact-form"
        sx={{
          backgroundColor: "#f8f8f8",
          padding: 2,
          borderRadius: "8px",
          width: { xs: '90%', sm: '80%', md: '70%' },
          marginLeft: 'auto',
          marginRight: 'auto',
          mt: 10
        }}
      >
        <Typography sx={{ color: "#000066", fontWeight: 600, fontSize: { xs: '16px', sm: '18px' }, mb: 2 }}>
          View Notices:
        </Typography>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mt: 2
          }}
        >
          {notices.map((notice) => (
           <Box
                            key={notice.id}
                            sx={{
                                width: { xs: '100%', sm: 300 },
                                height: 200,
                                borderRadius: 1,
                                bgcolor: 'gray',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                textAlign: 'center',
                                p: 2,
                            }}
                        >
                            <Typography sx={{ color: "white", fontSize: { xs: '14px', sm: '16px' } }}>{notice.title}</Typography>
                            <Typography sx={{ color: "white", fontSize: { xs: '10px', sm: '12px' } }}>
                                Uploaded on: {new Date(notice.uploaded_at).toLocaleDateString()}
                            </Typography>
                            {notice.file_url && (
                                <a href={notice.file_url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginTop: 8 }}>
                                    View File
                                </a>
                            )}
                        </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NoticeView;
