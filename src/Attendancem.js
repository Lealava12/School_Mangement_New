import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Typography ,TextField} from '@mui/material';
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
import Teachersidebar from "./Teachersidebar";

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

const Attendancem = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [form, setForm] = useState({
        student_id: '',
        student_name: '',
        class: '',
        attendance_date: '',
        status: 'Present'
    });
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editData, setEditData] = useState(null);

    const api = 'http://localhost:5000/api/attendance';

    // Fetch attendance data
    const fetchAttendance = () => {
        axios.get(api)
            .then((res) => {
                setAttendanceData(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch attendance:", err);
            });
    };

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(api, form)
            .then((res) => {
                alert(res.data.message);
                fetchAttendance();
                setForm({
                    student_id: '',
                    student_name: '',
                    class: '',
                    attendance_date: '',
                    status: 'Present'
                });
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Error marking attendance!');
            });
    };

    // Handle edit
    const handleEdit = (attendance) => {
        setEditData(attendance);
        setOpenEdit(true);
    };

    // Handle update
    const handleUpdate = () => {
        if (!editData) return;

        axios.put(api, editData)
            .then((res) => {
                alert(res.data.message);
                fetchAttendance();
                setOpenEdit(false);
                setEditData(null);
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Error updating attendance!');
            });
    };

    // Handle delete
    const handleDelete = (id) => {
        setSelectedId(id);
        setOpenDelete(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        axios.delete(`${api}?id=${selectedId}`)
            .then((res) => {
                alert(res.data.message);
                fetchAttendance();
                setOpenDelete(false);
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Error deleting attendance!');
            });
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

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
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>
                    Attendance Management:
                </Typography>
                <form onSubmit={handleSubmit} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid container spacing={3} justifyContent="center">

                        {/* Class & Date */}
                        <Grid item xs={12} md={5}>
                            <TextField
                                select
                                name="class"
                                value={form.class}
                                onChange={handleChange}
                                fullWidth
                                required
                               
                                SelectProps={{ native: true }}
                            >
                                <option value="">Select Class</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <TextField
                                type="date"
                                name="attendance_date"
                                value={form.attendance_date}
                                onChange={handleChange}
                                fullWidth
                                required
                                label="Attendance Date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {/* Student Name & ID */}
                        <Grid item xs={12} md={5}>
                            <TextField
                                name="student_name"
                                value={form.student_name}
                                onChange={handleChange}
                                placeholder="Student Name"
                                label="Student Name"
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <TextField
                                name="student_id"
                                value={form.student_id}
                                onChange={handleChange}
                                placeholder="Student ID"
                                label="Student ID"
                                required
                                fullWidth
                            />
                        </Grid>

                        {/* Attendance Status */}
                        <Grid item xs={12} md={10}>
                            <p style={{ fontWeight: 600, marginBottom: "8px" }}>Attendance:</p>
                            <RadioGroup
                                row
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Present" control={<Radio />} label="Present" />
                                <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                            </RadioGroup>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#000066",
                                    color: "white",
                                    width: 130,
                                }}
                            >
                                Submit
                            </Button>
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
                        <TableRow>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Student_ID</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Attendance Date</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Student's Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Status</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.map((attendance, index) => (
                            <TableRow key={attendance.id}>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{index + 1}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{attendance.student_id}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{attendance.class}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{attendance.attendance_date}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{attendance.student_name}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{attendance.status}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                    <ModeEditOutlineIcon
                                        onClick={() => handleEdit(attendance)}
                                        style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }}
                                    />
                                    <DeleteIcon
                                        onClick={() => handleDelete(attendance.id)}
                                        style={{ fontSize: "18px", color: "red", cursor: "pointer", marginLeft: "10px" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            Edit Attendance
                        </Typography>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                name="student_name"
                                value={editData?.student_name || ''}
                                onChange={(e) => setEditData({ ...editData, student_name: e.target.value })}
                                placeholder="Student Name"
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                            />
                            <input
                                type="text"
                                name="student_id"
                                value={editData?.student_id || ''}
                                onChange={(e) => setEditData({ ...editData, student_id: e.target.value })}
                                placeholder="Student ID"
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                            />
                            <select
                                name="class"
                                value={editData?.class || ''}
                                onChange={(e) => setEditData({ ...editData, class: e.target.value })}
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                            >
                                <option value="">Select Class</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                name="attendance_date"
                                value={editData?.attendance_date || ''}
                                onChange={(e) => setEditData({ ...editData, attendance_date: e.target.value })}
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                            />
                            <RadioGroup
                                row
                                name="status"
                                value={editData?.status || 'Present'}
                                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                style={{ margin: "10px 0" }}
                            >
                                <FormControlLabel value="Present" control={<Radio />} label="Present" />
                                <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                            </RadioGroup>
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: "#000066",
                                    color: "white",
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "10px"
                                }}
                            >
                                Update
                            </Button>
                        </form>
                    </Box>
                </Modal>
                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            Are you sure you want to delete this entry?
                        </Typography>
                        <center style={{ marginTop: "30px" }}>
                            <Button
                                onClick={confirmDelete}
                                style={{ backgroundColor: '#000066', color: 'white' }}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={() => setOpenDelete(false)}
                                style={{ backgroundColor: 'red', color: 'white', marginLeft: "30px" }}
                            >
                                No
                            </Button>
                        </center>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default Attendancem;
