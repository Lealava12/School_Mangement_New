import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import Studentsidebar from "./Studentsidebar";

const Attendanceview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = 'http://localhost:5000/api';
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/attendance`); // API call to backend
      setAttendanceData(response.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError('Failed to load attendance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Studentsidebar />
    <Box
      sx={{

        p: 3,
        borderRadius: 2,
        maxWidth: "1300px",
        mx: "auto",
        mt: 13,
      }}
    >
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom style={{ color: "#000066", fontWeight: 700 }}>
        My Attendance Records
      </Typography>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Student_ID</TableCell>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Attendance Date</TableCell>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Student's Name</TableCell>
                <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.student_id}</TableCell>
                  <TableCell align="right">{row.class}</TableCell>
                  <TableCell align="right">{row.attendance_date}</TableCell>
                  <TableCell align="right">{row.student_name}</TableCell>
                  <TableCell align="right" style={{ color: row.status === 'Present' ? 'green' : 'red', fontWeight: 600 }}>
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
    </Box>
    </>
  );
};

export default Attendanceview;
