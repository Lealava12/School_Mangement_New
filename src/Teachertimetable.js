


import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';  // Import axios
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'; // Import ModeEditOutlineIcon
import DeleteIcon from '@mui/icons-material/Delete';


import Teachersidebar from "./Teachersidebar"


const Teachertimetable = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editNoticeId, setEditNoticeId] = useState(null);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  // const [noticeId, setNoticeId] = useState('');

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

  // Add a new notice
  const addNotice = async () => {
    if (!title || !selectedFile) {
      alert('Both title and file are required!');
      return;
    }

    try {
      // Upload file first to get the file path
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await axios.post(`${apiBaseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const filePath = uploadResponse.data.file_path; // Get file path from the response

      // Now send the notice information including file path
      const noticeData = { title, file_path: filePath };

      const response = await axios.post(`${apiBaseUrl}/admin/notices`, noticeData);
      alert(response.data.message);
      fetchNotices(); // Refresh the list of notices
      clearForm();
    } catch (error) {
      console.error("Error adding notice:", error);
      alert(error.response?.data?.error || 'Error adding notice!');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setTitle('');
    setSelectedFile(null);
    setEditNoticeId(null);
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);
  return (
    <>
      <Teachersidebar />
      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "" }}>Timetable :</Typography>

        <input disabled
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}

          style={{ width: "500px", margin: "10px 0", padding: "10px", borderRadius: "5px", borderColor: "#ccc" }}
        />




      </Grid>

      <Grid className="contact-form" style={{
        backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
      }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>View Timetable:</Typography>
        <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>

          <Box

            sx={{
              width: 600,
              height: 300,
              borderRadius: 1,
              bgcolor: '#FFF5EE',
              borderStyle: 'solid',


            }}
          >

          </Box>





         
        </Grid>
      </Grid>
    </>
  );
};

export default Teachertimetable;
