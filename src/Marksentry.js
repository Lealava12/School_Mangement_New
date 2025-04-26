// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@mui/material';
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
                    Marks Entry:
                </Typography>
                <form onSubmit={handleSubmit} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={5}>
                            <TextField
                                type="text"
                                name="exam_name"
                                value={form.exam_name}
                                onChange={handleChange}
                                placeholder="Exam Name"
                                fullWidth
                                required

                            />
                        </Grid>
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
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={10}>
                            <Grid className="form-group" style={{ marginBottom: "15px" }}>
                                <TextField
                                    type="text"
                                    name="student_id"
                                    value={form.student_id}
                                    onChange={handleChange}
                                    placeholder="Student's Id"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="math"
                                    value={form.math}
                                    onChange={handleChange}
                                    placeholder="Math Mark"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="english"
                                    value={form.english}
                                    onChange={handleChange}
                                    placeholder="English Mark"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} justifyContent="center" style={{ marginTop: "10px" }}>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="physics"
                                    value={form.physics}
                                    onChange={handleChange}
                                    placeholder="Physics Mark"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="chemistry"
                                    value={form.chemistry}
                                    onChange={handleChange}
                                    placeholder="Chemistry Mark"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} justifyContent="center" style={{ marginTop: "10px" }}>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="odia"
                                    value={form.odia}
                                    onChange={handleChange}
                                    placeholder="Odia Mark"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    type="number"
                                    name="hindi"
                                    value={form.hindi}
                                    onChange={handleChange}
                                    placeholder="Hindi Mark"
                                    fullWidth
                                    required
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
                                sx={{
                                    backgroundColor: "#000066",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#000044" },
                                }}
                                onClick={() => {
                                    confirmDelete();
                                    handleCloseDelete();
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: "red",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#cc0000" },
                                }}
                                onClick={handleCloseDelete}
                            >
                                No
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Edit Marks Modal */}
                <Modal open={openEdit} onClose={handleCloseEdit}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: 500, md: 600 }, // Responsive width
                            maxHeight: '90vh', // Restrict height
                            overflowY: 'auto', // Scroll if content too big
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            Edit Marks Entry
                        </Typography>
                        <form onSubmit={updateMarks}>
                            {[
                                { name: 'student_id', placeholder: 'Student ID', type: 'text' },
                                { name: 'student_name', placeholder: 'Student Name', type: 'text' },
                                { name: 'dob', placeholder: '', type: 'date' },
                                { name: 'section', placeholder: 'Section', type: 'text' },
                                { name: 'gender', placeholder: 'Gender', type: 'text' },
                                { name: 'contact_no', placeholder: 'Contact No', type: 'text' },
                                { name: 'math', placeholder: 'Math Marks', type: 'number' },
                                { name: 'english', placeholder: 'English Marks', type: 'number' },
                                { name: 'physics', placeholder: 'Physics Marks', type: 'number' },
                                { name: 'chemistry', placeholder: 'Chemistry Marks', type: 'number' },
                                { name: 'odia', placeholder: 'Odia Marks', type: 'number' },
                                { name: 'hindi', placeholder: 'Hindi Marks', type: 'number' },
                            ].map((field, index) => (
                                <input
                                    key={index}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={editData[field.name]}
                                    onChange={handleEditChange}
                                    required
                                    style={{
                                        width: '90%',
                                        padding: '10px',
                                        margin: '10px 0',
                                        borderRadius: '5px',
                                    }}
                                />
                            ))}

                            {/* Class dropdown separately */}
                            <TextField
                                select
                                name="class"
                                value={editData.class}
                                onChange={handleEditChange}
                                fullWidth
                                required
                                label="Class"
                                SelectProps={{ native: true }}
                                sx={{ margin: '10px 0' }}
                            >
                                <option value="">Select Class</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#000066',
                                    color: 'white',
                                    marginTop: '10px',
                                    width: '100%',
                                    padding: '10px',
                                    '&:hover': {
                                        backgroundColor: '#000044',
                                    },
                                }}
                            >
                                Update
                            </Button>
                        </form>
                    </Box>
                </Modal>

            </div>
        </>
    );
};

export default MarksEntry;
