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
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Classm = () => {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete1] = React.useState(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete1(true);
    const handleCloseDelete = () => setOpenDelete1(false);

    return (
        <>


            <Sidebar />




            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Class Management :</Typography>
                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Student's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
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

                        </Grid>
                    </Grid>


                   

                        <Grid class="form-group" style={{ marginBottom: "15px",marginLeft:"7%" }}>
                            <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
                                <option value="">Select Subject</option>
                                <option value="saab">Math</option>
                                <option value="mercedes">English</option>
                                <option value="audi">Physics </option>
                                <option value="audi">Chemistry </option>
                                <option value="audi">Odia </option>
                                <option value="audi">Hindi </option>
                            </select>
                        </Grid>
                        <Typography style={{ color: "#000066", fontWeight: 500, fontSize: "16px", marginLeft: "7%" }}> Time Table Upload  :</Typography>
                        <Box
                        sx={{
                            marginLeft:"7%",
                            marginTop:"10px",
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}


                    >
                        <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />
                        <input
                            type="file"

                            style={{ display: 'none' }}
                            id="myfile"
                            name="myfile"
                        />
                    </Box>












                </form>
            </Grid>






            <TableContainer sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead   >
                        <TableRow >
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px", fontStyle: " STL Calisto MT" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                       
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Subject</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Image</TableCell>
              
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow  >
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} >1</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">9th</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Maths</TableCell>
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right"> </TableCell>
                           
                            <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                <ModeEditOutlineIcon style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }} />
                                <DeleteIcon onClick={setOpenDelete1} style={{ fontSize: "18px", color: "red", cursor: "pointer" }} />
                            </TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

















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

export default Classm;
