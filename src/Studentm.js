import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
// import PythonBackend from './Python_backend';
import {
    Grid, Button, Typography, TextField, InputLabel,
    MenuItem,
    FormControl, Select,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
const Studentm = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [section, setSection] = useState('');
    const [gender, setGender] = useState('Male');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [studentId, setStudentId] = useState('');
    const [editStudentId, setEditStudentId] = useState(null);

    const apiBaseUrl = 'http://localhost:5000/api';

    // Fetch all students
    const fetchStudents = () => {
        axios
            .get(`${apiBaseUrl}/admin/Students`)
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch students:", error);
            });
    };

    // Add a new student
    const addStudent = (e) => {
        e.preventDefault();
        axios
            .post(`${apiBaseUrl}/admin/Students`, {
                name,
                dob,
                class: studentClass,
                section,
                gender,
                father_name: fatherName,
                mother_name: motherName,
                email,
                mobile,
                address
            })
            .then((response) => {
                alert(response.data.message);
                fetchStudents(); // Refresh the list of students
                clearForm();
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error adding student!');
            });
    };

    // Update a student
    const updateStudent = (e) => {
        e.preventDefault();
        axios
            .put(`${apiBaseUrl}/admin/Students`, {
                id: editStudentId,
                name,
                dob,
                class: studentClass,
                section,
                gender,
                father_name: fatherName,
                mother_name: motherName,
                email,
                mobile,
                address
            })
            .then((response) => {
                alert(response.data.message);
                fetchStudents(); // Refresh the list of students
                clearForm();
                setOpenEdit(false);
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error updating student!');
            });
    };

    // Delete a student
    const deleteStudent = (id) => {
        axios
            .delete(`${apiBaseUrl}/admin/Students?id=${id}`)
            .then((response) => {
                alert(response.data.message);
                fetchStudents(); // Refresh the list of students
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error deleting student!');
            });
    };

    // Clear form fields
    const clearForm = () => {
        setName('');
        setDob('');
        setStudentClass('');
        setSection('');
        setGender('Male');
        setFatherName('');
        setMotherName('');
        setEmail('');
        setMobile('');
        setAddress('');
        setStudentId('');
    };

    // Handle edit button click
    const handleEditClick = (student) => {
        setEditStudentId(student.auto_id);
        setName(student.name);
        setDob(student.dob.split('T')[0]);
        setStudentClass(student.class);
        setSection(student.section);
        setGender(student.gender);
        setFatherName(student.father_name);
        setMotherName(student.mother_name);
        setEmail(student.email);
        setMobile(student.mobile);
        setAddress(student.address);
        setOpenEdit(true);
    };

    // Handle delete button click
    const handleDeleteClick = (id) => {
        setStudentId(id);
        setOpenDelete(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        deleteStudent(studentId);
        setOpenDelete(false);
    };

    // Fetch students on component mount
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
            <Sidebar />



            <Box
                sx={{
                    backgroundColor: "#f8f8f8",
                    p: 3,
                    borderRadius: 2,
                    maxWidth: "1300px",
                    mx: "auto",
                    mt: 13,
                }}
            >
                <Typography
                    sx={{
                        color: "#000066",
                        fontWeight: 600,
                        fontSize: 18,
                        mb: 2,
                    }}
                >
                    Student's and Parent's Details:
                </Typography>

                <form onSubmit={addStudent}>
                    <Grid container spacing={2}>
                        {/* Student Name & DOB */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Student's Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Class & Section */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Select Class</InputLabel>
                                <Select
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    label="Select Class"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Select Section</InputLabel>
                                <Select
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    label="Select Section"
                                >
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Gender */}
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 500, mb: 1 }}>Select your Gender:</Typography>
                            <RadioGroup
                                row
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>

                        {/* Father & Mother Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Father's Name"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Mother's Name"
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Email & Mobile */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Submit */}
                        <Grid item xs={12} textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    backgroundColor: "#000066",
                                    color: "white",
                                    px: 4,
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
                        maxWidth: "600px",
                        margin: "0 auto",
                        textAlign: "center",
                        borderCollapse: "collapse",
                    }}
                >

                    <TableHead   >
                        <TableRow >
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px", fontStyle: " STL Calisto MT" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Student_Id</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">DOB</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Section</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
                            {/* <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Roll</TableCell> */}
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Father’s Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">mother’s Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Contact No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Address</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={student.student_id}>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{index + 1}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.student_id}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.name}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.dob}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.class}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.section}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.gender}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.father_name}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.mother_name}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.mobile}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{student.address}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                    <ModeEditOutlineIcon
                                        onClick={() => handleEditClick(student)}
                                        style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }}
                                    />
                                    <DeleteIcon
                                        onClick={() => handleDeleteClick(student.student_id)}
                                        style={{ fontSize: "18px", color: "red", cursor: "pointer" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>






                {/* Edit Modal */}

                <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                    <Box
                        sx={{
                            mt:9,
                            mx: "auto",
                            maxWidth: 1000,
                            backgroundColor: "#f8f8f8",
                            borderRadius: 2,
                            p: 3,
                            overflow: "auto",
                        }}
                    >
                        <Typography sx={{ color: "#000066", fontWeight: 600, fontSize: 18, }}>
                            Edit Student's and Parent's Details:
                        </Typography>

                        <form onSubmit={updateStudent} style={{ marginTop: "10px" }}>
                            <Grid container spacing={2}>
                                {/* Name & DOB */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Student's Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </Grid>

                                {/* Class & Section */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Select Class"
                                        SelectProps={{ native: true }}
                                        fullWidth
                                        value={studentClass}
                                        onChange={(e) => setStudentClass(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Select Section"
                                        SelectProps={{ native: true }}
                                        fullWidth
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Section</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </TextField>
                                </Grid>

                                {/* Gender */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 500, mb: 1 }}>Select your Gender:</Typography>
                                    <RadioGroup
                                        row
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                            </Grid>


                        </form>

                        {/* Parent's Details */}
                        <Box mt={3}>


                            <form onSubmit={updateStudent}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Father's Name"
                                            value={fatherName}
                                            onChange={(e) => setFatherName(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Mother's Name"
                                            value={motherName}
                                            onChange={(e) => setMotherName(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Mobile Number"
                                            type="number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            multiline
                                            minRows={3}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <Box textAlign="center" mt={1}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#000066",
                                            color: "white",
                                            fontWeight: 600,
                                            px: 4,
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Modal>






                {/* Delete Modal */}



                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" }, // responsive width
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                            Are you sure you want to delete this entry?
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                            <Button
                                onClick={confirmDelete}
                                sx={{
                                    backgroundColor: "#000066",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#000044" },
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={() => setOpenDelete(false)}
                                sx={{
                                    backgroundColor: "red",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#cc0000" },
                                }}
                            >
                                No
                            </Button>
                        </Box>
                    </Box>
                </Modal>

            </div>
        </>
    );
};
export default Studentm;