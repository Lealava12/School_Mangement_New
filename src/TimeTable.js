import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';  // Import axios
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'; 



const TimeTable = () => {
  const pdfUrl = "/timetable.pdf"; 
  ;
  return (
    <div className="main-container">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Time Table</h1>
        </div>

        {/* <div className="student-info">
          <p><span>School Name:</span>The Garden School</p>
          <p><span>Class:</span> 6<sup>th</sup></p>
          <p><span>Section:</span> B</p>
        </div> */}

        {/* <div className="result-table">
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: '14px' }}>Days</th>
                <th style={{ fontSize: '14px' }}>9am to 10am</th>
                <th style={{ fontSize: '14px' }}>10am to 11am</th>
                <th style={{ fontSize: '14px' }}>11am to 12am</th>
                <th style={{ fontSize: '14px' }}>12pm to 1pm</th>
                <th style={{ fontSize: '14px' }}>1pm to 2pm</th>
                <th style={{ fontSize: '14px' }}>2pm to 3pm</th>
                <th style={{ fontSize: '14px' }}>3pm to 4pm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
              <tr>
                
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>English</td>
                <td>Social Science</td>
                <td>Math</td>
                <td>Lunch Break</td>
                <td>Odia</td>
                <td>Hindi</td>
                <td>Pt</td>
              </tr>
            </tbody>
          </table>
        </div> */}

<Typography style={{ color: "#000066", fontWeight: 500, fontSize: "16px", marginLeft: "7%" }}>  Upload Timetable  :</Typography>
                    <Box
                        sx={{
                            width: 300,
                            height: 200,
                            marginLeft: "7%",
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
                        <label htmlFor="file" style={{ display: "flex", flexDirection: "row", cursor: 'pointer' }}>
                            <AddSharpIcon style={{ fontSize: "25px", color: "white" }} />
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            // onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </Box>

      </div>
    </div>
  );
}

export default TimeTable;
