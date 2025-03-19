import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const TeacherDashboard = () => {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <ul>
        <li><Link to="/Assignmentm">Manage Assignments</Link></li>
        <li><Link to="/NoticeView">View Notices</Link></li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;
