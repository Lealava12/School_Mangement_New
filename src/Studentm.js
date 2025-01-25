import React from 'react';
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
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const Studentm = () => {
    const [openEdit, setOpenEdit1] = React.useState(false);
    const [openDelete, setOpenDelete1] = React.useState(false);

    const handleOpenEdit = () => setOpenEdit1(true);
    const handleCloseEdit = () => setOpenEdit1(false);

    const handleOpenDelete = () => setOpenDelete1(true);
    const handleCloseDelete = () => setOpenDelete1(false);

    return (
        <>

            <Sidebar />

            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Student's Details :</Typography>
                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Student's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

                        </Grid>
                    </Grid>


                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>


                        <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>



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



                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

                                <option value="">Select Section</option>
                                <option value="saab">A</option>
                                <option value="mercedes">B</option>
                                <option value="mercedes">c</option>


                            </select>

                        </Grid>
                    </Grid>





                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                        <Grid class="form-group" style={{ marginBottom: "15px", width: "520px", }}>

                            <p> Select your Gender:</p>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="top"
                            >

                                <FormControlLabel style={{ marginLeft: "10px" }} value="1" control={<Radio />} label="Male" />
                                <FormControlLabel value="2" control={<Radio />} label="Female" />
                                <FormControlLabel value="3" control={<Radio />} label="Other" />
                            </RadioGroup>




                        </Grid>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Enter Roll No" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                    </Grid>




                </form>
            </Grid>

            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>


                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Parent's Details :</Typography>
                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Father's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Mother's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="email" id="Name" placeholder="Email" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number" id="Name" placeholder="Mobile No" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", marginLeft: "7%" }}>

                        <textarea id="message" placeholder="Address" required
                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}></textarea>
                    </Grid>


                    <center>
                        <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

                            Submit
                        </Button>
                    </center>

                </form>
            </Grid>


            <TableContainer sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead   >
                        <TableRow >
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px", fontStyle: " STL Calisto MT" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">DOB</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Section</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Roll</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Father’s Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">mother’s Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Contact No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Address</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow  >
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} >1</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">02/12/24</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="roight">10th</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">B</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Female</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">05</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Haaaa</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">MMMM</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">8756989097</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">BBSR</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                <ModeEditOutlineIcon onClick={setOpenEdit1} style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }} />
                                <DeleteIcon onClick={setOpenDelete1} style={{ fontSize: "18px", color: "red", cursor: "pointer" }} />
                            </TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

            <Grid>

                <Modal open={openEdit} onClose={handleCloseEdit} style={{ marginTop: "200px" }}>
                    <center>


                        <Grid class="contact-form" style={{
                            backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

                        }}>
                            <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", }}> Edit Student's Details :</Typography>
                            <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Student's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

                                    </Grid>
                                </Grid>


                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>


                                    <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

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


                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

                                            <option value="">Select Section</option>
                                            <option value="saab">A</option>
                                            <option value="mercedes">B</option>
                                            <option value="mercedes">c</option>


                                        </select>

                                    </Grid>
                                </Grid>


                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <Grid class="form-group" style={{ marginBottom: "15px", width: "520px", }}>

                                        <p> Select your Gender:</p>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                        >

                                            <FormControlLabel style={{ marginLeft: "10px" }} value="1" control={<Radio />} label="Male" />
                                            <FormControlLabel value="2" control={<Radio />} label="Female" />
                                            <FormControlLabel value="3" control={<Radio />} label="Other" />
                                        </RadioGroup>


                                    </Grid>

                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="number " id="mobile" placeholder="Enter Roll No" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                </Grid>


                            </form>
                        </Grid>

                        <Grid class="contact-form" style={{
                            backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

                        }}>


                            <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px" }}>Edit Parent's Details :</Typography>
                            <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Father's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Mother's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                </Grid>

                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="email" id="Name" placeholder="Email" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="number" id="Name" placeholder="Mobile No" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                                    </Grid>
                                </Grid>

                                <Grid style={{ display: "flex", marginLeft: "7%" }}>

                                    <textarea id="message" placeholder="Address" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}></textarea>
                                </Grid>


                                <center>
                                    <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

                                        Submit
                                    </Button>
                                </center>

                            </form>
                        </Grid>


                    </center>
                </Modal>



            </Grid>

            <Modal open={openDelete} onClose={handleCloseDelete}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this entry?

                    </Typography>
                    <center style={{ marginTop: "30px" }}>
                        <Button style={{ backgroundColor: '#000066' }} onClick={handleCloseDelete}>Yes</Button>
                        <Button style={{ backgroundColor: 'red', marginLeft: "30px" }} onClick={handleCloseDelete}>No</Button>
                    </center>
                </Box>
            </Modal>

        </>

    );
};

export default Studentm;
