import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
// import PythonBackend from './Python_backend';
import { Grid, Button, Typography } from '@mui/material';
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
            <Grid class="contact-form" style={{
                backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "65px" }}>Student's and Parent's Details :</Typography>
                <form onSubmit={addStudent} style={{ paddingTop: "20px", paddingBottom: "20px" }}>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly", marginRight:"90px"}}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Student's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", }}
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly",marginRight:"90px" }}>
                        <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px",  }}
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px",  }}
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">c</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex",marginLeft:"65px" }}>
                        <Grid class="form-group" style={{ marginBottom: "15px", width: "520px", }}>
                            <p> Select your Gender:</p>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="top"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel style={{ marginLeft: "10px" }} value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>

                        {/* <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number " id="mobile" placeholder="Enter Roll No" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px",  }} />
                        </Grid> */}
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly", marginRight:"90px"}}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Father's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", }}
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="text" id="Name" placeholder="Mother's Name" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px",  }}
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly", marginRight:"90px"}}>

                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="email" id="Name" placeholder="Email" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid class="form-group" style={{ marginBottom: "15px" }}>
                            <input type="number" id="Name" placeholder="Mobile No" required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex",marginLeft:"65px" }}>

                        <textarea id="message" placeholder="Address" required
                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </Grid>
                    <center>
                        <Button
                            type="submit"
                            style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}
                        >
                            Submit
                        </Button>
                    </center>
                </form>
            </Grid>
        
                <Table aria-label="simple table" sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
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
        
            <Grid>
                <Modal style={{ marginTop: "200px" }}>
                    <center>
                        <Grid class="contact-form" style={{
                            backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"
                        }}>
                            <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", }}> Edit Student's Details :</Typography>
                            <form onSubmit={updateStudent} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Student's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                        value={studentClass}
                                        onChange={(e) => setStudentClass(e.target.value)}
                                    >
                                        <option value="">Select Class</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <select id="venue" required style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                        >
                                            <option value="">Select Section</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">c</option>
                                        </select>
                                    </Grid>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <Grid class="form-group" style={{ marginBottom: "15px", width: "520px", }}>

                                        <p> Select your Gender:</p>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <FormControlLabel style={{ marginLeft: "10px" }} value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </Grid>
                                    {/* <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="number " id="mobile" placeholder="Enter Roll No" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} 
                                            value={rollNo}
                                            onChange={(e) => setRollNo(e.target.value)}
                                        />
                                    </Grid> */}
                                </Grid>
                                <center>
                                    <Button
                                        type="submit"
                                        style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}
                                    >
                                        Update
                                    </Button>
                                </center>
                            </form>
                        </Grid>

                        <Grid class="contact-form" style={{
                            backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

                        }}>
                            <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px" }}>Edit Parent's Details :</Typography>
                            <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Father's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={fatherName}
                                            onChange={(e) => setFatherName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="text" id="Name" placeholder="Mother's Name" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={motherName}
                                            onChange={(e) => setMotherName(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="email" id="Name" placeholder="Email" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid class="form-group" style={{ marginBottom: "15px" }}>
                                        <input type="number" id="Name" placeholder="Mobile No" required
                                            style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid style={{ display: "flex", marginLeft: "7%" }}>
                                    <textarea id="message" placeholder="Address" required
                                        style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></textarea>
                                </Grid>
                                <center>
                                    <Button
                                        type="submit"
                                        style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}
                                    >
                                        Update
                                    </Button>
                                </center>
                            </form>
                        </Grid>
                    </center>
                </Modal>
            </Grid>
            <Modal >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this entry?
                    </Typography>
                    <center style={{ marginTop: "30px" }}>
                        <Button style={{ backgroundColor: '#000066' }} onClick={confirmDelete}>Yes</Button>
                        <Button style={{ backgroundColor: 'red', marginLeft: "30px" }} onClick={() => setOpenDelete(false)}>No</Button>
                    </center>
                </Box>
            </Modal>
        </>
    );
};
export default Studentm;