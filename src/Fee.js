import React from 'react';
// import '../src/Teacherm.css';
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
const Fee = () => {
    return (
        <>
            <Sidebar />    
                  <Grid class="contact-form" style={{
                                  backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
                  
                              }}>
                        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px",  marginLeft: "7%" }}>Student's Details :</Typography>
                        <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                            <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="text" id="Name" placeholder="Student's Name" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>                          
                                    <select id="venue" required style={{ width: "500px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
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
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="number " id="mobile" placeholder="Enter Roll No" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                                <select id="venue" required style={{ width: "500px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
                                    <option value="">Payment Mode</option>
                                    <option value="saab">Cash</option>
                                    <option value="mercedes">Online</option>
                                    <option value="audi">Bank </option>
                                </select>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="number " id="number" placeholder="Amount" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "480px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: "flex", marginLeft:"7.5%" }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="number " id="number" placeholder="Receipt No" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                  <Grid class="contact-form" style={{
                                  backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
                              }}>
                        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Fee Reports :</Typography>
                        <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                            <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <select id="venue" required style={{ width: "500px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
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
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                            </Grid>
                            <center>
                                <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >
                                    Submit
                                </Button>
                            </center>
                        </form>
                    </Grid>            
        </>
    );
};
export default Fee;
