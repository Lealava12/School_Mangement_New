import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Studentsidebar from "./Studentsidebar";


const ProfileDetails = () => {
   

    return (
        <>

            <Studentsidebar />

            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Profile Details :</Typography>

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

                    <label htmlFor="file" style={{ display: "flex", flexDirection: "row", }}>
                        <ModeEditIcon style={{
                            fontSize: "20px", color: "white", marginLeft: "85px",
                            marginTop: "20px",
                        }} />

                    </label>

                    <input style={{ display: "none" }} type="file" id="file" />

                </Avatar>

                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                    <Grid style={{ display: "flex", justifgroupyContent: "space-evenly", }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Student's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                        <Grid class="form-" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Enter Roll No" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>


                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Class" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Section" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>

                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>


                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text " id="mobile" placeholder="Parent's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>


                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Contact" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>

                    </Grid>

                    <Grid style={{ display: "flex",marginLeft:"7%" }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Attendance Percentage" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>

                    </Grid>



                </form>
            </Grid>

-


        </>
    );
};

export default ProfileDetails;
