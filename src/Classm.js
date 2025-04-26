import React from 'react';

import { Grid, Button, Typography ,TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Teachersidebar from "./Teachersidebar"

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
            <Teachersidebar />
            <Box
                sx={{
                    backgroundColor: "#f8f8f8",
                    p: 3,
                    borderRadius: 2,
                    maxWidth: "1300px",
                    mx: "auto",
                    mt: 15,
                }}
            >
                <Typography sx={{ color: "#000066", fontWeight: 600, fontSize: "18px", ml: "8%" }}>
                    Class Management :
                </Typography>

                <form style={{  }}>
                    <Grid container spacing={3} justifyContent="center" sx={{ mt: 1 }}>

                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                required
                                id="Name"
                                label="Student's Name"
                                variant="outlined"
                                sx={{ borderRadius: "5px" }}
                            />
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                required
                                select
                                id="class"
                              
                                variant="outlined"
                                SelectProps={{ native: true }}
                                sx={{ borderRadius: "5px" }}
                            >
                                <option value="">Select Class</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <TextField
                                fullWidth
                                required
                                select
                                id="subject"
                              
                                variant="outlined"
                                SelectProps={{ native: true }}
                                sx={{ borderRadius: "5px" }}
                            >
                                <option value="">Select Subject</option>
                                {["Math", "English", "Physics", "Chemistry", "Odia", "Hindi"].map((subject) => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ color: "#000066", fontWeight: 500, fontSize: "16px", ml: "8%", mt: 2 }}>
                                Time Table Upload :
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "8%"}}>
                            <Box
                                component="label"
                                htmlFor="myfile"
                                sx={{
                                  
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
                                <AddSharpIcon sx={{ fontSize: "25px", color: "white" }} />
                            </Box>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                style={{ display: 'none' }}
                            />
                        </Grid>

                    </Grid>
                </form>
            </Box>





            <div style={{ overflowX: "auto", marginTop: "30px" }}>
                <Table
                    style={{
                        marginLeft: "15%",
                        maxWidth: "1300px",
                        margin: "0 auto",
                        textAlign: "center",
                        borderCollapse: "collapse",
                    }}
                >

                    <TableHead>
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
            </div>

        </>




    );
};

export default Classm;
