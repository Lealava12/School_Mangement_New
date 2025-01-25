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
import Box from '@mui/material/Box';
import AddSharpIcon from '@mui/icons-material/AddSharp';



const Notice = () => {

    return (
        <>

            <Sidebar />





            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}>Notice :</Typography>


                <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>



                    <Box
                        sx={{
                            width: 300,
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
                        }}>


                        <label htmlFor="file" style={{ display: "flex", flexDirection: "row", }}>
                            <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />

                        </label>

                        <input style={{ display: "none" }} type="file" id="file" />

                    </Box>



                    <Box
                        sx={{
                            width: 300,
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
                        }}>


                        <label htmlFor="file" style={{ display: "flex", flexDirection: "row", }}>
                            <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />

                        </label>

                        <input style={{ display: "none" }} type="file" id="file" />

                    </Box>

                    <Box
                        sx={{
                            width: 300,
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
                        }}>


                        <label htmlFor="file" style={{ display: "flex", flexDirection: "row", }}>
                            <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />

                        </label>

                        <input style={{ display: "none" }} type="file" id="file" />

                    </Box>


                </Grid>
                <center>
                    <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

                        Submit
                    </Button>
                </center>




              
            </Grid>



            <Grid class="contact-form" style={{
                    backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

                }}>
                    <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "1%" }}> View Notice :</Typography>


                    <Grid style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>

                        <Box
                            sx={{
                                width: 300,
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
                            }}>



                        </Box>



                        <Box
                            sx={{
                                width: 300,
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
                            }}>




                        </Box>

                        <Box
                            sx={{
                                width: 300,
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
                            }}>



                        </Box>


                    </Grid>
                </Grid>

        </>



    );
};

export default Notice;
