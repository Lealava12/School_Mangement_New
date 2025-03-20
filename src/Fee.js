import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Grid, Button, Typography } from '@mui/material';
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
            <Grid className="contact-form" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%" }}>
                <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "65px" }}>Student's Fee Details and Fee Reports:</Typography>
                <form onSubmit={handleSubmit} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    {/* Student's Fee Details Section */}
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" ,}}>
                        <Grid className="form-group" style={{ marginBottom: "15px",marginLeft: "25px"  }}>
                            <input
                                type="text"
                                placeholder="Enter Student ID"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                onBlur={fetchStudentDetails}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                placeholder="Student's Name"
                                value={studentName}
                                readOnly
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                            />
                        </Grid>
                    </Grid>
                   <Grid style={{ display: "flex",marginLeft:"100px" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" ,}}>
                            <input
                                type="text"
                                placeholder="Class"
                                value={studentClass}
                                readOnly
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                            />
                        </Grid>
                        {/* <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                placeholder="Roll No"
                                value={rollNo}
                                readOnly
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066", backgroundColor: "#f0f0f0" }}
                            />
                        </Grid> */}
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px" ,marginLeft: "25px"}}>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <select
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                required
                                style={{ width: "520px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            >
                                <option value="">Payment Mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Grid className="form-group" style={{ marginBottom: "15px",marginLeft: "25px" }}>
                            <input
                                type="date"
                                placeholder="Payment Date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                        <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="text"
                                placeholder="Receipt No"
                                value={receiptNo}
                                onChange={(e) => setReceiptNo(e.target.value)}
                                required
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid>
                    </Grid>

                    {/* Fee Reports Section */}
                    <Grid style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
                        {/* <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <select
                                value={filterClass}
                                onChange={(e) => setFilterClass(e.target.value)}
                                style={{ width: "500px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
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
                        </Grid> */}
                        {/* <Grid className="form-group" style={{ marginBottom: "15px" }}>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
                            />
                        </Grid> */}
                    </Grid>

                    {/* Single Submit Button */}
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
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Edit Fee
                    </Typography>
                    <form onSubmit={updateFee}>
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        >
                            <option value="">Payment Mode</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            <option value="Bank">Bank</option>
                        </select>
                        <input
                            type="date"
                            placeholder="Payment Date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
                        />
                        <input
                            type="text"
                            placeholder="Receipt No"
                            value={receiptNo}
                            onChange={(e) => setReceiptNo(e.target.value)}
                            required
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
                        Are you sure you want to delete this fee record?
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

export default Fee;
