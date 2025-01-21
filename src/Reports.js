import React from 'react';
// import '../src/Teacherm.css';
import Sidebar from './Sidebar';
import { Grid, Button, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Reports = () => {
    return (
        <>
            <>
                <Sidebar />
            </>




            <center >
                <Grid style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "900px", }}>


                    <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginRight: "340px" }}>Reports :</Typography>
                    <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>


                        <Grid style={{ marginLeft: "10px" }}>


                            <select id="venue" required style={{ width: "425px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>



                                <option value="">Report Type</option>
                                <option value="saab">Attendance </option>
                                <option value="mercedes">Academic </option>
                                <option value="audi">finance </option>




                            </select>

                        </Grid>

                        <Grid style={{ marginLeft: "10px", marginTop: "20px", }}>
                            <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />


                        </Grid>


                        <Grid style={{ marginLeft: "10px" }}>
                            <select id="venue" required style={{
                                marginTop: "20px", width: "425px", height: "40px",
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


            </center>
        </>




























    );
};

export default Reports;
