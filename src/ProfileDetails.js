import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Studentsidebar from "./Studentsidebar";
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiBaseUrl = 'http://localhost:5000/api';

    const fetchUserDetails = async () => {
        try {
            // Check if user is logged in
            if (!document.cookie.includes('session')) {
                navigate('/signin');
                return;
            }

            const response = await axios.get(`${apiBaseUrl}/details`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.data.user_details) {
                setUserDetails(response.data.user_details);
                setError('');
            } else {
                setError('No user details found');
                navigate('/signin');
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
            if (err.response?.status === 401) {
                navigate('/signin');
            } else {
                setError(err.response?.data?.error || 'Failed to fetch user details');
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [navigate]);

    return (
        <>
            <Studentsidebar />
            <Grid className="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Profile Details :</Typography>

                {error && (
                    <Typography style={{ color: "red", marginLeft: "7%", marginTop: "10px" }}>
                        {error}
                    </Typography>
                )}

                {userDetails ? (
                    <>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                marginLeft: "7%",
                                marginTop: "20px",
                                borderRadius: 50,
                                bgcolor: 'primary.main',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}>
                            <label htmlFor="file" style={{ display: "flex", flexDirection: "row" }}>
                                <ModeEditIcon style={{
                                    fontSize: "20px", color: "white", marginLeft: "85px",
                                    marginTop: "20px",
                                }} />
                            </label>
                            <input style={{ display: "none" }} type="file" id="file" />
                        </Avatar>

                        <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="Name"
                                        placeholder="Student's Name"
                                        value={userDetails.name || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="RollNo"
                                        placeholder="Roll No"
                                        value={userDetails.student_id || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="Class"
                                        placeholder="Class"
                                        value={userDetails.class || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="Section"
                                        placeholder="Section"
                                        value={userDetails.section || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="FatherName"
                                        placeholder="Father's Name"
                                        value={userDetails.father_name || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="MotherName"
                                        placeholder="Mother's Name"
                                        value={userDetails.mother_name || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="Email"
                                        placeholder="Email"
                                        value={userDetails.email || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                                <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="text"
                                        id="Mobile"
                                        placeholder="Mobile"
                                        value={userDetails.mobile || ''}
                                        readOnly
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: "flex", marginLeft: "7.2%" }}>
                                <textarea
                                    id="Address"
                                    placeholder="Address"
                                    value={userDetails.address || ''}
                                    readOnly
                                    style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                                ></textarea>
                            </Grid>
                        </form>
                    </>
                ) : (
                    <Typography style={{ marginLeft: "7%", marginTop: "20px" }}>Loading profile details...</Typography>
                )}
            </Grid>
        </>
    );
};

export default ProfileDetails;
