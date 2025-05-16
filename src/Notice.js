import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Grid, Button, Typography } from '@mui/material';
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
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', selectedFile);

            const response = await axios.post(`${apiBaseUrl}/admin/notices`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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
            <Grid className="contact-form" sx={{
             
            }}>
                <Typography sx={{ color: "#000066", fontWeight: 600, fontSize: { xs: '16px', sm: '18px' }, mb: 2, mt: 6 }}>
                    Notice :
                </Typography>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notice title"
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        margin: "10px 0",
                        padding: "10px",
                        borderRadius: "5px",
                        borderColor: "#ccc"
                    }}
                />

                <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                                // Add hover effect if needed
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
                        sx={{
                            width: "130px",
                            mt: 4,
                            fontWeight: 600,
                            fontSize: { xs: '14px', sm: '16px' },
                            backgroundColor: "#000066",
                            color: "white"
                        }}
                        onClick={addNotice}
                    >
                        Submit
                    </Button>
                </center>
            </Grid>
            </Box >
            <Grid className="contact-form" sx={{
                backgroundColor: "#f8f8f8", padding: 2, borderRadius: "8px", width: { xs: '90%', sm: '80%', md: '70%' }, marginLeft: 'auto', marginRight: 'auto', mt: 4
            }}>
                <Typography sx={{ color: "#000066", fontWeight: 600, fontSize: { xs: '16px', sm: '18px' }, mb: 2 }}>
                    View Notices:
                </Typography>
                <Grid sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap", // Allows wrapping on smaller screens
                    gap: 2,
                    mt: 2
                }}>
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

export default Notice;
