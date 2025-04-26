import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {
    Grid, Button, Typography, TextField, InputLabel,
    MenuItem,
    FormControl, Select,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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

const Fee = () => {
    const [fees, setFees] = useState([]);
    const [editFeeId, setEditFeeId] = useState(null);
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [receiptNo, setReceiptNo] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteFeeId, setDeleteFeeId] = useState(null);

    const apiBaseUrl = 'http://localhost:5000/api';

    // Fetch all fee records
    const fetchFees = () => {
        axios
            .get(`${apiBaseUrl}/admin/Fee`)
            .then((response) => {
                setFees(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch fees:", error);
            });
    };

    // Fetch student details by StudentId
    const fetchStudentDetails = () => {
        if (!studentId) {
            alert('Please enter a valid Student ID');
            return;
        }

        axios
            .get(`${apiBaseUrl}/admin/Students`, { params: { student_id: studentId } })
            .then((response) => {
                const student = response.data[0];
                if (student) {
                    setStudentName(student.name);
                    setStudentClass(student.class);
                    // setRollNo(student.roll_no);
                } else {
                    alert('Student not found!');
                    clearStudentFields();
                }
            })
            .catch((error) => {
                console.error("Failed to fetch student details:", error);
                alert('Error fetching student details!');
                clearStudentFields();
            });
    };

    // Clear student-related fields
    const clearStudentFields = () => {
        setStudentName('');
        setStudentClass('');
        // setRollNo('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Add fee record
        axios
            .post(`${apiBaseUrl}/admin/Fee`, {
                student_id: studentId,
                name: studentName,
                class: studentClass,
                // roll_no: rollNo,
                amount,
                payment_mode: paymentMode,
                payment_date: paymentDate,
                receipt_no: receiptNo
            })
            .then((response) => {
                alert(response.data.message);
                fetchFees(); // Refresh the list of fees
                clearForm();
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error adding fee!');
            });

        // Optionally, handle fee report filters here if needed
        // console.log("Filter Class:", filterClass);
        // console.log("Filter Date:", filterDate);
    };

    // Clear form fields
    const clearForm = () => {
        setStudentId('');
        clearStudentFields();
        setAmount('');
        setPaymentMode('');
        setPaymentDate('');
        setReceiptNo('');
    };

    // Handle edit button click
    const handleEditClick = (fee) => {
        setEditFeeId(fee.fee_id);
        setStudentId(fee.student_id);
        setStudentName(fee.name);
        setStudentClass(fee.class);
        setAmount(fee.amount);
        setPaymentMode(fee.payment_mode);
        setPaymentDate(fee.payment_date.split('T')[0]);
        setReceiptNo(fee.receipt_no);
        setOpenEdit(true);
    };

    // Handle delete button click
    const handleDeleteClick = (id) => {
        setDeleteFeeId(id);
        setOpenDelete(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        axios
            .delete(`${apiBaseUrl}/admin/Fee?fee_id=${deleteFeeId}`)
            .then((response) => {
                alert(response.data.message);
                fetchFees(); // Refresh the list of fees
                setOpenDelete(false);
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error deleting fee!');
            });
    };

    // Update a fee record
    const updateFee = (e) => {
        e.preventDefault();
        axios
            .put(`${apiBaseUrl}/admin/Fee`, {
                fee_id: editFeeId,
                student_id: studentId,
                name: studentName,
                class: studentClass,
                amount,
                payment_mode: paymentMode,
                payment_date: paymentDate,
                receipt_no: receiptNo,
            })
            .then((response) => {
                alert(response.data.message);
                fetchFees(); // Refresh the list of fees
                setOpenEdit(false);
            })
            .catch((error) => {
                alert(error.response?.data?.error || 'Error updating fee!');
            });
    };

    // Fetch fees on component mount
    useEffect(() => {
        fetchFees();
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
                    sx={{ color: "#000066", fontWeight: 600, fontSize: 18, mb: 2,mt:1 }}
                >
                    Student's Fee Details and Fee Reports:
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Student ID and Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Enter Student ID"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                onBlur={fetchStudentDetails}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Student's Name"
                                value={studentName}
                                InputProps={{ readOnly: true }}
                                sx={{ backgroundColor: "#f0f0f0" }}
                            />
                        </Grid>

                        {/* Class */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Class"
                                value={studentClass}
                                InputProps={{ readOnly: true }}
                                sx={{ backgroundColor: "#f0f0f0" }}
                            />
                        </Grid>

                        {/* Amount and Payment Mode */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Payment Mode</InputLabel>
                                <Select
                                    value={paymentMode}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                    label="Payment Mode"
                                >
                                    <MenuItem value="Cash">Cash</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                    <MenuItem value="Bank">Bank</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Payment Date and Receipt No */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Payment Date"
                                InputLabelProps={{ shrink: true }}
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Receipt No"
                                value={receiptNo}
                                onChange={(e) => setReceiptNo(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Box textAlign="center" mt={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: 130,
                                fontWeight: 600,
                                fontSize: 16,
                                backgroundColor: "#000066",
                                color: "white",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
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

                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Student_Id</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Amount</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Payment Mode</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Payment Date</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Receipt No</TableCell>
                            <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fees.map((fee, index) => (
                            <TableRow key={fee.fee_id}>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{index + 1}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.student_id}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.name}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.class}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.amount}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.payment_mode}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.payment_date}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{fee.receipt_no}</TableCell>
                                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                                    <ModeEditOutlineIcon
                                        onClick={() => handleEditClick(fee)}
                                        style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }}
                                    />
                                    <DeleteIcon
                                        onClick={() => handleDeleteClick(fee.fee_id)}
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
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "90%", sm: 400, md: 500 },
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            Edit Fee
                        </Typography>
                        <form onSubmit={updateFee}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel>Payment Mode</InputLabel>
                                <Select
                                    value={paymentMode}
                                    label="Payment Mode"
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                >
                                    <MenuItem value="Cash">Cash</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                    <MenuItem value="Bank">Bank</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                type="date"
                                label="Payment Date"
                                InputLabelProps={{ shrink: true }}
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Receipt No"
                                value={receiptNo}
                                onChange={(e) => setReceiptNo(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: "#000066", color: "white", width: "100%" }}
                            >
                                Update
                            </Button>
                        </form>
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

export default Fee;
