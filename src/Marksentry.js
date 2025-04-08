// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Teachersidebar from "./Teachersidebar";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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

const MarksEntry = () => {
    const [marks, setMarks] = useState([]);
    const [form, setForm] = useState({
        student_id: '',
        exam_name: '',
        class: '',
        math: '',
        english: '',
        physics: '',
        chemistry: '',
        odia: '',
        hindi: ''
    });
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        id: '',
        exam_name: '',
        class: '',
        math: '',
        english: '',
        physics: '',
        chemistry: '',
        odia: '',
        hindi: ''
    });

    const api = 'http://localhost:5000/api/admin/marks';

    const fetchMarks = () => {
        axios.get(api)
            .then((res) => {
                console.log("Fetched marks:", res.data); // Debug log
                setMarks(res.data || []); // Ensure we always set an array
            })
            .catch((err) => {
                console.error("Failed to fetch marks:", err);
                setMarks([]); // Reset marks on error
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert string values to integers
        const formData = {
            ...form,
            math: parseInt(form.math),
            english: parseInt(form.english),
            physics: parseInt(form.physics),
            chemistry: parseInt(form.chemistry),
            odia: parseInt(form.odia),
            hindi: parseInt(form.hindi)
        };

        axios.post(api, formData)
            .then((res) => {
                alert(res.data.message);
                fetchMarks(); // Refresh the table data
                setForm({
                    student_id: '',
                    exam_name: '',
                    class: '',
                    math: '',
                    english: '',
                    physics: '',
                    chemistry: '',
                    odia: '',
                    hindi: ''
                });
            })
            .catch((err) => {
                console.error("Error submitting marks:", err);
                alert(err.response?.data?.error || 'Error submitting marks!');
            });
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        axios.delete(`${api}?id=${deleteId}`)
            .then((res) => {
                alert(res.data.message);
                fetchMarks();
                setOpenDelete(false);
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Error deleting mark!');
            });
    };

    const handleEditClick = (entry) => {
        setEditData({
            id: entry.marks_id,
            exam_name: entry.exam_name || '',
            class: entry.class || '',
            math: entry.math || '',
            english: entry.english || '',
            physics: entry.physics || '',
            chemistry: entry.chemistry || '',
            odia: entry.odia || '',
            hindi: entry.hindi || ''
        });
        setOpenEdit(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const updateMarks = (e) => {
        e.preventDefault();
        axios.put(api, editData)
            .then((res) => {
                alert(res.data.message);
                fetchMarks();
                setOpenEdit(false);
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Error updating marks!');
            });
    };

    const handleCloseDelete = () => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            confirmDelete();
        }
        setOpenDelete(false);
        setDeleteId(null);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditData({
            id: '',
            exam_name: '',
            class: '',
            math: '',
            english: '',
            physics: '',
            chemistry: '',
            odia: '',
            hindi: ''
        });
    };

    useEffect(() => {
        fetchMarks();
    }, []);

    return (
        <>
            <Teachersidebar />
            <Grid className="contact-form" style={{
                backgroundColor: "#f8f8f8", 
                padding: "20px", 
                borderRadius: "8px", 
                width: "70%", 
                marginLeft: "20%"
            }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>
                    Marks Entry:
                </Typography>
                <form onSubmit={handleSubmit} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                name="exam_name"
                                value={form.exam_name}
                                onChange={handleChange}
                                placeholder="Exam Name"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <select
                                name="class"
                                value={form.class}
                                onChange={handleChange}
                                required
                                style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px" }}
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
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                name="student_id"
                                value={form.student_id}
                                onChange={handleChange}
                                placeholder="Student's Id"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="math"
                                value={form.math}
                                onChange={handleChange}
                                placeholder="Math Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="english"
                                value={form.english}
                                onChange={handleChange}
                                placeholder="English Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="physics"
                                value={form.physics}
                                onChange={handleChange}
                                placeholder="Physics Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="chemistry"
                                value={form.chemistry}
                                onChange={handleChange}
                                placeholder="Chemistry Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                    </Grid>

                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="odia"
                                value={form.odia}
                                onChange={handleChange}
                                placeholder="Odia Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="number"
                                name="hindi"
                                value={form.hindi}
                                onChange={handleChange}
                                placeholder="Hindi Mark"
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px" }}
                            />
                        </Grid>
                    </Grid>

                    <center>
                        <Button 
                            type="submit"
                            style={{ 
                                width: "130px", 
                                marginTop: "35px", 
                                fontWeight: 600, 
                                fontSize: "16px", 
                                backgroundColor: "#000066", 
                                color: "white" 
                            }}
                        >
                            Submit
                        </Button>
                    </center>
                </form>
            </Grid>
            <Table aria-label="simple table" sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
                <TableHead   >
                    <TableRow >
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px", fontStyle: " STL Calisto MT" }}>Student_ID</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Student Name</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">DOB</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Section</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">contact No</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Math</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">English</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Physics</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Chemistry</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Odia</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Hindi</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Total Marks</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Total Obtained</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Total Percentage</TableCell>
                        <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(marks) && marks.map((entry) => (
                        <TableRow key={entry.marks_id || entry.id}>
                            <TableCell>{entry.student_id}</TableCell>
                            <TableCell align="right">{entry.student_name}</TableCell>
                            <TableCell align="right">{entry.dob}</TableCell>
                            <TableCell align="right">{entry.class}</TableCell>
                            <TableCell align="right">{entry.section}</TableCell>
                            <TableCell align="right">{entry.gender}</TableCell>
                            <TableCell align="right">{entry.contact_no}</TableCell>
                            <TableCell align="right">{entry.math}</TableCell>
                            <TableCell align="right">{entry.english}</TableCell>
                            <TableCell align="right">{entry.physics}</TableCell>
                            <TableCell align="right">{entry.chemistry}</TableCell>
                            <TableCell align="right">{entry.odia}</TableCell>
                            <TableCell align="right">{entry.hindi}</TableCell>
                            <TableCell align="right">{entry.total_marks}</TableCell>
                            <TableCell align="right">{entry.marks_obtained}</TableCell>
                            <TableCell align="right">
                                {typeof entry.percentage === 'number' 
                                    ? `${entry.percentage.toFixed(2)}%`
                                    : `${parseFloat(entry.percentage || 0).toFixed(2)}%`
                                }
                            </TableCell>
                            <TableCell align="right">
                                <ModeEditOutlineIcon
                                    onClick={() => handleEditClick(entry)}
                                    style={{ fontSize: "18px", color: "#000066", cursor: "pointer", marginRight: "10px" }}
                                />
                                <DeleteIcon
                                    onClick={() => handleDelete(entry.marks_id)}
                                    style={{ fontSize: "18px", color: "red", cursor: "pointer" }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Delete Confirmation Modal */}
            <Modal open={openDelete} onClose={handleCloseDelete}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this entry?
                    </Typography>
                    <center style={{ marginTop: "30px" }}>
                        <Button
                            style={{ backgroundColor: '#000066', color: 'white' }}
                            onClick={() => {
                                confirmDelete();
                                handleCloseDelete();
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            style={{ backgroundColor: 'red', marginLeft: "30px", color: 'white' }}
                            onClick={handleCloseDelete}
                        >
                            No
                        </Button>
                    </center>
                </Box>
            </Modal>

            {/* Edit Marks Modal */}
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Edit Marks Entry
                    </Typography>
                    <form onSubmit={updateMarks}>
                        <input 
                            type="text" 
                            value={editData.student_id} 
                            onChange={handleEditChange} 
                            name="student_id" 
                            placeholder="Student ID" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="text" 
                            value={editData.student_name} 
                            onChange={handleEditChange} 
                            name="student_name" 
                            placeholder="Student Name" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="date" 
                            value={editData.dob} 
                            onChange={handleEditChange} 
                            name="dob" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <select
                            value={editData.class}
                            onChange={handleEditChange}
                            name="class"
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
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
                        <input 
                            type="text" 
                            value={editData.section} 
                            onChange={handleEditChange} 
                            name="section" 
                            placeholder="Section" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="text" 
                            value={editData.gender} 
                            onChange={handleEditChange} 
                            name="gender" 
                            placeholder="Gender" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="text" 
                            value={editData.contact_no} 
                            onChange={handleEditChange} 
                            name="contact_no" 
                            placeholder="Contact No" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.math} 
                            onChange={handleEditChange} 
                            name="math" 
                            placeholder="Math Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.english} 
                            onChange={handleEditChange} 
                            name="english" 
                            placeholder="English Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.physics} 
                            onChange={handleEditChange} 
                            name="physics" 
                            placeholder="Physics Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.chemistry} 
                            onChange={handleEditChange} 
                            name="chemistry" 
                            placeholder="Chemistry Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.odia} 
                            onChange={handleEditChange} 
                            name="odia" 
                            placeholder="Odia Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input 
                            type="number" 
                            value={editData.hindi} 
                            onChange={handleEditChange} 
                            name="hindi" 
                            placeholder="Hindi Marks" 
                            required 
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <Button 
                            type="submit" 
                            style={{ 
                                backgroundColor: "#000066", 
                                color: "white", 
                                marginTop: "10px",
                                width: "100%",
                                padding: "10px"
                            }}
                        >
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default MarksEntry;
