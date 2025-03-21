import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const TimeTable = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null); // To display uploaded timetable

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-timetable', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
      setPdfUrl(response.data.file_path); // Update the PDF URL to display the uploaded timetable
    } catch (error) {
      setUploadMessage('Failed to upload the timetable. Please try again.');
      console.error('Error uploading file:', error);
    }
  };

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
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </Box>
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
