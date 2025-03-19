import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Grid, Button, Typography, Modal } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'; // Import ModeEditOutlineIcon
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
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

const Assignmentm = () => {
    const [assignments, setAssignments] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [assignmentClass, setAssignmentClass] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [editAssignmentId, setEditAssignmentId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);

    const apiBaseUrl = 'http://localhost:5000/api';

    // Fetch all assignments
    const fetchAssignments = () => {
        axios
            .get(`${apiBaseUrl}/admin/assignments`)
            .then((response) => {
                setAssignments(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch assignments:", error);
            });
    };

    // Add a new assignment
    const addAssignment = async () => {
        if (!title || !date || !description || !assignmentClass || !selectedFile) {
            alert('All fields are required!');
            return;
        }

        try {
            // Upload file and assignment data
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', title); // Ensure the field name matches the backend
            formData.append('date', date);
            formData.append('description', description);
            formData.append('class', assignmentClass);

            const response = await axios.post(`${apiBaseUrl}/admin/assignments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert(response.data.message);
            fetchAssignments(); // Refresh the list of assignments
            clearForm();
        } catch (error) {
            console.error("Error adding assignment:", error);
            alert(error.response?.data?.error || 'Error adding assignment!');
        }
    };

    // Clear form fields
    const clearForm = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setAssignmentClass('');
        setSelectedFile(null);
        setEditAssignmentId(null);
    };

    // Handle edit button click
    const handleEditClick = (assignment) => {
        setEditAssignmentId(assignment.id);
        setTitle(assignment.title);
        setDate(assignment.date.split('T')[0]);
        setDescription(assignment.description);
        setAssignmentClass(assignment.class);
        setOpenEdit(true);
    };

    // Handle delete button click
    const handleDeleteClick = (assignmentId) => {
        setDeleteAssignmentId(assignmentId);
        setOpenDelete(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        axios
            .delete(`${apiBaseUrl}/admin/assignments?assignment_id=${deleteAssignmentId}`)
            .then((response) => {
                alert(response.data.message);
                fetchAssignments(); // Refresh the list of assignments
                setOpenDelete(false);
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error deleting assignment!');
            });
    };

    // Update an assignment
    const updateAssignment = (e) => {
        e.preventDefault();
        if (!title || !date || !description || !assignmentClass) {
            alert('All fields are required!');
            return;
        }

        const formData = new FormData();
        formData.append('assignment_id', editAssignmentId);
        formData.append('title', title);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('class', assignmentClass);

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        axios
            .put(`${apiBaseUrl}/admin/assignments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert(response.data.message);
                fetchAssignments(); // Refresh the list of assignments
                setOpenEdit(false);
                clearForm();
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error updating assignment!');
            });
    };

    // Fetch assignments on component mount
    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <>
            <Sidebar />
            <Grid className="contact-form" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%" }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Assignment Management:</Typography>
                <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                placeholder="Assignment Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            ></textarea>
                        </Grid>
                        <Grid>
                            <select
                                value={assignmentClass}
                                onChange={(e) => setAssignmentClass(e.target.value)}
                                required
                                style={{ width: "525px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
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
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </Box>
                    <center>
                        <Button
                            style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", color: "white" }}
                            onClick={addAssignment}
                        >
                            Submit
                        </Button>
                    </center>
                </form>
            </Grid>

            <TableContainer sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Assignment Title</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Date</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Description</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                             <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map((assignment, index) => (
                            <TableRow key={assignment.id}>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{index + 1}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{assignment.title}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{assignment.date}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{assignment.description}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{assignment.class}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                <ModeEditOutlineIcon
                                    onClick={() => handleEditClick(assignment)}
                                    style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }}
                                />
                                <DeleteIcon
                                    onClick={() => handleDeleteClick(assignment.assignment_id)}
                                    style={{ fontSize: "18px", color: "red", cursor: "pointer" }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Modal */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Edit Assignment
                    </Typography>
                    <form onSubmit={updateAssignment}>
                        <input
                            type="text"
                            placeholder="Assignment Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        ></textarea>
                        <select
                            value={assignmentClass}
                            onChange={(e) => setAssignmentClass(e.target.value)}
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
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <Button type="submit" style={{ backgroundColor: "#000066", color: "white", marginTop: "10px" }}>
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this assignment?
                    </Typography>
                    <center style={{ marginTop: "30px" }}>
                        <Button style={{ backgroundColor: '#000066', color: 'white' }} onClick={confirmDelete}>
                            Yes
                        </Button>
                        <Button style={{ backgroundColor: 'red', color: 'white', marginLeft: "30px" }} onClick={() => setOpenDelete(false)}>
                            No
                        </Button>
                    </center>
                </Box>
            </Modal>
        </>
    );
};

export default Assignmentm;
