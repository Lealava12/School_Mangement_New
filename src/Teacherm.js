import React from 'react';
import '../src/Teacherm.css';
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Teacherm = () => {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    return (
        <>
            <Sidebar />
            <center>
                <Grid class="contact-form" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "900px", }}>
                    <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginRight: "740px" }}>Teacher's Details :</Typography>
                    <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                <input type="text" id="Name" placeholder=" Name" required
                                    style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                            </Grid>
                            <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                <input type="email" id="email" placeholder="Enter Email " required
                                    style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                            </Grid>
                        </Grid>
                        {/* Add additional form fields here */}
                        <center>
                            <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}>
                                Submit
                            </Button>
                        </center>
                    </form>
                </Grid>
            </center>

            <center>
                <TableContainer sx={{ marginTop: "50px", width: 950 }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Email</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Mobile No</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Joining Date</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Subject</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>1</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita@gmail.com</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">986574545</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">02/12/24</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Female</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Maths</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">10th</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                    <ModeEditOutlineIcon onClick={handleOpenEdit} style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }} />
                                    <DeleteIcon onClick={handleOpenDelete} style={{ fontSize: "18px", color: "red", cursor: "pointer" }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </center>

            {/* Edit Modal */}
            {/* <Modal open={openEdit} onClose={handleCloseEdit}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Edit Teacher's Details
                    </Typography>
                    <form>
                  
                        <Button onClick={handleCloseEdit}>Submit</Button>
                    </form>
                </Box>
            </Modal> */}




<Grid>

<Modal open={openEdit} onClose={handleCloseEdit} style={{ marginTop: "200px" }}>
    
    <center>
        <Grid class="contact-form" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "900px", }}>
            <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginRight: "700px" }}> Edit Teacher's Details :</Typography>
            <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>


                <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                        <input type="text" id="Name" placeholder=" Name" required
                            style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                    </Grid>
                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                        <input type="email" id="email" placeholder="Enter Email " required
                            style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                    </Grid>
                </Grid>


                <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                        <input type="number " id="mobile" placeholder="  Enter number" required
                            style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                    </Grid>

                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                        <input type="date" id="birthday" name="birthday" style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

                    </Grid>
                </Grid>


                <Grid style={{ display: "flex", justifyContent: "space-between", }}>
                    <Grid class="form-group" style={{ marginBottom: "15px" }}>

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

                    <select id="venue" required style={{ width: "425px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
                        <option value="">Select Subject</option>
                        <option value="saab">Math</option>
                        <option value="mercedes">English</option>
                        <option value="audi">Physics </option>
                        <option value="audi">Chemistry </option>
                        <option value="audi">Odia </option>
                        <option value="audi">Hindi </option>
                    </select>
                </Grid>



                <Grid class="form-group" style={{ marginBottom: "15px" }}>
                    <select id="venue" required style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

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



            {/* Delete Modal */}
            <Modal open={openDelete} onClose={handleCloseDelete}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this entry?
                   
                    </Typography>
                    <center style={{marginTop:"30px"}}>
                    <Button style={{backgroundColor:'#000066'}} onClick={handleCloseDelete}>Yes</Button>
                    <Button  style={{backgroundColor:'red',marginLeft:"30px"}} onClick={handleCloseDelete}>No</Button>
                    </center>
                </Box>
            </Modal>
        </>
    );
};

export default Teacherm;
