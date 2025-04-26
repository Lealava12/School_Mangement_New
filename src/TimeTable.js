import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Typography, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import AddSharpIcon from '@mui/icons-material/AddSharp';




const TimeTable = () => {
  const [timeTables, setTimeTables] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all timetables
  const fetchTimeTables = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/timetable`);
      setTimeTables(response.data);
      if (response.data.length > 0) {
        setPdfUrl(response.data[0].file_path);
      }
    } catch (error) {
      console.error("Failed to fetch timetables:", error);
    }
  };

  // Add a new timetable
  const handleFileUpload = async () => {
    if (!title.trim() || !selectedFile) {
      setUploadMessage('Both title and file are required!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);

      const response = await axios.post(`${apiBaseUrl}/admin/timetable`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage(response.data.message);
      fetchTimeTables();
      clearForm();
    } catch (error) {
      console.error("Error adding timetable:", error);
      setUploadMessage(error.response?.data?.error || 'Error adding timetable!');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setTitle('');
    setSelectedFile(null);
    setUploadMessage('');
  };

  // Fetch timetables on component mount
  useEffect(() => {
    fetchTimeTables();
  }, []);

  return (
    <>
      <Sidebar />

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

        {/* Header */}
        <Box className="header" sx={{ textAlign: 'center', mb: 3 ,mt:5 }}>
          <Typography variant="h4" className="exam-title" >
            Time Table
          </Typography>
        </Box>

        {/* Display Uploaded Timetable */}
        {pdfUrl && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: "#000066", fontWeight: 500, fontSize: { xs: 14, sm: 16 }, mb: 1 }}>
              Uploaded Timetable:
            </Typography>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Box sx={{
                height: { xs: 300, sm: 400, md: 500 },
                border: '1px solid #ccc',
                overflow: 'auto',
              }}>
                <Viewer fileUrl={pdfUrl} />
              </Box>
            </Worker>
          </Box>
        )}

        {/* Upload Timetable Section */}
        <Typography sx={{ color: "#000066", fontWeight: 500, fontSize: { xs: 14, sm: 16 }, mb: 1 }}>
          Upload Timetable:
        </Typography>

        {/* File Upload Box */}
        <Box
          sx={{
            width: { xs: '100%', sm: 300 },
            height: 200,
            borderRadius: 1,
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            mb: 2,
          }}
        >
          <label htmlFor="file" style={{ display: "flex", flexDirection: "row", cursor: 'pointer' }}>
            <AddSharpIcon style={{ fontSize: 25, color: "white" }} />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setUploadMessage('');
            }}
          />
        </Box>

        {/* Timetable Title Input */}
       
        <TextField
          fullWidth
          type="text"
          placeholder="Enter timetable title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setUploadMessage('');
          }}

        />
        {/* Upload Button */}
        <Box
          component="button"
          onClick={handleFileUpload}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            px: 3,
            py: 1.5,
            backgroundColor: "#000066",
            color: "white",
            border: "none",
            borderRadius: 1,
            cursor: "pointer",
            mb: 2,
            mt:2,
          }}
        >
          Upload
        </Box>

        {/* Error or Message Display */}
        {uploadMessage && (
          <Typography sx={{ color: "red", mt: 1 }}>
            {uploadMessage}
          </Typography>
        )}
      </Box>

    </>
  );
};

export default TimeTable;
