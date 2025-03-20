// import React from 'react';
// import '../src/Teacherm.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Grid, Button, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import axios from 'axios';  // Import axios
const Notice = () => {
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
            <Sidebar />
            <Grid className="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "" }}>Notice :</Typography>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notice title"
                    style={{ width: "500px", margin: "10px 0", padding: "10px", borderRadius: "5px", borderColor: "#ccc" }}
                />

                <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Box
                        sx={{
                            width: 300,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                // bgcolor: 'primary.dark',
                            },
                        }}>
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
                </Grid>

                <center>
                    <Button
                        style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}
                        onClick={addNotice}
                    >
                        Submit
                    </Button>
                </center>
            </Grid>

            <Grid className="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>View Notices:</Typography>
                <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    {notices.map((notice) => (
                        <Box
                            key={notice.id}
                            sx={{
                                width: 300,
                                height: 200,
                                borderRadius: 1,
                                bgcolor: 'gray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                               
                            }}
                        >
                            <Typography style={{ color: "white", textAlign: "center" }}>{notice.title}</Typography>
                            <Typography style={{ color: "white", textAlign: "center", fontSize: "12px" }}>
                                Uploaded on: {new Date(notice.uploaded_at).toLocaleDateString()}
                            </Typography>
                            {/* <Button onClick={() => handleEditClick(notice)}>Edit</Button>
                            <Button onClick={() => handleDeleteClick(notice.id)}>Delete</Button> */}
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default Notice;
