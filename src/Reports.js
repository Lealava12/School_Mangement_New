import React from 'react';
import Sidebar from './Sidebar';
import { Grid, Typography } from '@mui/material';

const Reports = () => {
    return (
        <>

            <Sidebar />

            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Reports :</Typography>
                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid style={{ marginLeft: "10px", marginLeft: "7%" }}>
                        <select id="venue" required style={{ width: "500px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
                            <option value="">Report Type</option>
                            <option value="saab">Attendance </option>
                            <option value="mercedes">Academic </option>
                            <option value="audi">finance </option>
                        </select>

                    </Grid>

                    <Grid style={{ marginLeft: "10px", marginTop: "20px", marginLeft: "7%" }}>
                        <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "480px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />


                    </Grid>
                    <Grid style={{ marginLeft: "10px", marginLeft: "7%" }}>
                        <select id="venue" required style={{
                            marginTop: "20px", width: "500px", height: "40px",
                            padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066"
                        }}>
                            <option value="">Select Class</option>
                            <option value="saab">1</option>
                            <option value="mercedes">2</option>
                            <option value="audi">3 </option>
                            <option value="audi">4 </option>
                            <option value="audi">5 </option>
                            <option value="audi">6 </option>
                            <option value="audi">7 </option>
                            <option value="audi">8 </option>
                            <option value="audi">9 </option>
                            <option value="audi">10 </option>
                        </select>
                    </Grid>
                </form>
            </Grid>
        </>

    );
};

export default Reports;
