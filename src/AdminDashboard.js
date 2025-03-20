import React, { useState, useEffect } from 'react';
import '../src/Teacherm.css';
import PythonBackend from './Python_backend';
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
import axios from 'axios';

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





  return (
    <>
      <Sidebar />
       <Button type="submit" style={{ backgroundColor: "#000066", color: "white", marginTop: "10px" }}>
                    Update
                  </Button> <Button type="submit" style={{ backgroundColor: "#000066", color: "white", marginTop: "10px" }}>
                                Update
                              </Button>
   
      <PythonBackend />
    </>
  );


export default AdminDashboard;