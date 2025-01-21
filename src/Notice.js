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


const Notice = () => {
    return (
        <>
            <>
                <Sidebar />
            </>
            <>



                <center >
                    <Grid style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "900px", }}>


                        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginRight: "780px" }}>Notice :</Typography>
                        <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                            <Grid style={{ display: "flex", justifyContent: "space-between", }}>

                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="text" id="Name" placeholder="Student's Name" required
                                        style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                </Grid>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    {/* <input type="date" id="birthday" name="birthday" style={{ width: "400px", padding: "10px", borderRadius: "5px",borderColor: "1px solid #000066" }} /> */}



                                    <select id="venue" required style={{ width: "425px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>



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


                            <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>

                                    <input type="number " id="mobile" placeholder="Enter Roll No" required
                                        style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />


                                </Grid>

                                <select id="venue" required style={{ width: "425px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>



                                    <option value="">Payment Mode</option>
                                    <option value="saab">Cash</option>
                                    <option value="mercedes">Online</option>
                                    <option value="audi">Bank </option>




                                </select>
                            </Grid>


                            <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="number " id="number" placeholder="Amount" required
                                        style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />



                                </Grid>

                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />


                                </Grid>
                            </Grid>



                            <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <input type="number " id="number" placeholder="Receipt No" required
                                        style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />



                                </Grid>


                            </Grid>


                        </form>
                    </Grid>




                    <Grid style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "900px", marginTop: "20px", }}>


                        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginRight: " 740px" }}>Fee Reports :</Typography>
                        <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                            <Grid style={{ display: "flex", justifyContent: "space-between", }}>

                                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                    <select id="venue" required style={{ width: "425px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>



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
                                <input type="date" id="birthday" placeholder="Payment Date" style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

                                </Grid>
                            </Grid>

                          


                            <center>
                                <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

                                    Submit
                                </Button>
                            </center>

                        </form>
                    </Grid>
                </center>
            </>

            <>





                <center style={{}}>
                    <TableContainer sx={{ marginTop: "50px", width: 900, }} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead   >
                                <TableRow >
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px", fontStyle: " STL Calisto MT" }}>Sl No</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">DOB</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Section</TableCell>
                                    <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Roll</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow  >
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} >1</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">02/12/24</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Female</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="roight">10th</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">B</TableCell>
                                    <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">05</TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                </center>








            </>





















        </>
    );
};

export default Notice;
