import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Typography } from '@mui/material';
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
    <div className="main-container">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Time Table</h1>
        </div>

        {pdfUrl && (
          <div style={{ margin: '20px 0' }}>
            <Typography style={{ color: "#000066", fontWeight: 500, fontSize: "16px" }}>
              Uploaded Timetable:
            </Typography>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <div style={{ height: '500px', border: '1px solid #ccc' }}>
                <Viewer fileUrl={pdfUrl} />
              </div>
            </Worker>
          </div>
        )}

        <Typography style={{ color: "#000066", fontWeight: 500, fontSize: "16px", marginLeft: "7%" }}>
          Upload Timetable:
        </Typography>
        <Box
          sx={{
            width: 300,
            height: 200,
            marginLeft: "7%",
            borderRadius: 1,
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <label htmlFor="file" style={{ display: "flex", flexDirection: "row", cursor: 'pointer' }}>
            <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setUploadMessage(''); // Clear error message when a file is selected
            }}
          />
        </Box>
        <input
          type="text"
          placeholder="Enter timetable title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setUploadMessage(''); // Clear error message when title is updated
          }}
          style={{
            marginLeft: "7%",
            marginTop: "10px",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleFileUpload}
          style={{
            marginLeft: "7%",
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#000066",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
        {uploadMessage && (
          <Typography style={{ marginLeft: "7%", marginTop: "10px", color: "red" }}>
            {uploadMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
