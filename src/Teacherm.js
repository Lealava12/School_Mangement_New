import React, { useState, useEffect } from 'react';

import PythonBackend from './Python_backend';

import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Sidebar from './Sidebar';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from '@mui/material/Modal';

import axios from 'axios';



const cellStyle = {
  color: "gray",
  fontWeight: 600,
  fontSize: "15px",
  whiteSpace: "nowrap",
};

const Teacherm = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherClass, setTeacherClass] = useState('');
  const [gender, setGender] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [editTeacherId, setEditTeacherId] = useState(null);

  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all teachers
  const fetchTeachers = () => {
    axios
      .get(`${apiBaseUrl}/admin/Teachers`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch teachers:", error);
      });
  };

  // Add a new teacher
  const addTeacher = () => {
    axios
      .post(`${apiBaseUrl}/admin/Teachers`, {
        name,
        email,
        mobile,
        joining_date: joiningDate,
        subject,
        class: teacherClass,
        gender,
      })
      .then((response) => {
        alert(response.data.message);
        fetchTeachers(); // Refresh the list of teachers
        clearForm();
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error adding teacher!');
      });
  };

  // Update a teacher
  const updateTeacher = () => {
    axios
      .put(`${apiBaseUrl}/Teachers/${editTeacherId}`, {
        name,
        email,
        mobile,
        joining_date: joiningDate,
        subject,
        class: teacherClass,
        gender,
      })
      .then((response) => {
        alert(response.data.message);
        fetchTeachers(); // Refresh the list of teachers
        clearForm();
        setOpenEdit(false);
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error updating teacher!');
      });
  };

  // Delete a teacher
  const deleteTeacher = (id) => {
    axios
      .delete(`${apiBaseUrl}/Teachers/${id}`)
      .then((response) => {
        alert(response.data.message);
        fetchTeachers(); // Refresh the list of teachers
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error deleting teacher!');
      });
  };

  // Clear form fields
  const clearForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setJoiningDate('');
    setSubject('');
    setTeacherClass('');
    setGender('');
    setTeacherId('');
  };

  // Handle edit button click
  const handleEditClick = (teacher) => {
    setEditTeacherId(teacher.id);
    setName(teacher.name);
    setEmail(teacher.email);
    setMobile(teacher.mobile);
    setJoiningDate(teacher.joining_date);
    setSubject(teacher.subject);
    setTeacherClass(teacher.class);
    setGender(teacher.gender);
    setOpenEdit(true);
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setTeacherId(id);
    setOpenDelete(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    deleteTeacher(teacherId);
    setOpenDelete(false);
  };

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
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
          Teacher's Details :
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTeacher();
          }}
        >
          <Grid container spacing={2}>
            {/* Name and Email */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>

            {/* Number and Joining Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enter Number"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
              />
            </Grid>

            {/* Class and Subject */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={teacherClass}
                  onChange={(e) => setTeacherClass(e.target.value)}
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
                <InputLabel>Select Subject</InputLabel>
                <Select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  label="Select Subject"
                >
                  {["Math", "English", "Physics", "Chemistry", "Odia", "Hindi"].map((subj) => (
                    <MenuItem key={subj} value={subj}>
                      {subj}
                    </MenuItem>
                  ))}
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

            {/* Submit Button */}
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

          <TableHead>
            <TableRow>
              {[
                "Sl No",
                "Teacher ID",
                "Name",
                "Email",
                "Mobile No",
                "Joining Date",
                "Subject",
                "Class",
                "Gender",
                "Actions",
              ].map((head, idx) => (
                <TableCell
                  key={idx}
                  align={idx === 0 ? "left" : "right"}
                  sx={{ color: "#000066", fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={teacher.teacher_id}>
                <TableCell sx={cellStyle}>{index + 1}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.teacher_id}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.name}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.email}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.mobile}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.joining_date}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.subject}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.class}</TableCell>
                <TableCell sx={cellStyle} align="right">{teacher.gender}</TableCell>
                <TableCell sx={cellStyle} align="right">
                  <ModeEditOutlineIcon
                    onClick={() => handleEditClick(teacher)}
                    sx={{ fontSize: 18, color: "#000066", cursor: "pointer", mr: 1 }}
                  />
                  <DeleteIcon
                    onClick={() => handleDeleteClick(teacher.teacher_id)}
                    sx={{ fontSize: 18, color: "red", cursor: "pointer" }}
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
              width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" }, // responsive width
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Edit Teacher
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTeacher();
              }}
            >
              {[
                { type: "text", placeholder: "Name", value: name, onChange: setName },
                { type: "email", placeholder: "Email", value: email, onChange: setEmail },
                { type: "number", placeholder: "Mobile", value: mobile, onChange: setMobile },
                { type: "date", placeholder: "Joining Date", value: joiningDate, onChange: setJoiningDate },
              ].map((field, i) => (
                <input
                  key={i}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              ))}

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                <option value="">Select Subject</option>
                {["Math", "English", "Physics", "Chemistry", "Odia", "Hindi"].map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>

              <select
                value={teacherClass}
                onChange={(e) => setTeacherClass(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                <option value="">Select Class</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Gender:
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </Box>

              <Button
                type="submit"
                fullWidth
                sx={{ backgroundColor: "#000066", color: "white", mt: 2, py: 1 }}
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


        <PythonBackend />




      </div>








    </>
  );
};









export default Teacherm;