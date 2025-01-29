// // import React from 'react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../src/Teacherm.css';
// import PythonBackend from './Python_backend';
// import Sidebar from './Sidebar';
// import { Grid, Button, Typography } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };

// const Teacherm = () => {
    // const [openEdit, setOpenEdit] = React.useState(false);
    // const [openDelete, setOpenDelete] = React.useState(false);

    // const handleOpenEdit = () => setOpenEdit(true);
    // const handleCloseEdit = () => setOpenEdit(false);

    // const handleOpenDelete = () => setOpenDelete(true);
    // const handleCloseDelete = () => setOpenDelete(false);
//     return (
//         <>
         
//             <Sidebar />
           

//             <Grid class="contact-form" style={{
//                 backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

//             }}>
//                 <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Teacher's Details :</Typography>
//                 <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="text" id="Name" placeholder=" Name" required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="email" id="email" placeholder="Enter Email " required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>
//                     </Grid>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="number " id="mobile" placeholder="  Enter number" required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>

//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

//                         </Grid>
//                     </Grid>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>


//                         <Grid class="form-group" style={{ marginBottom: "15px", }}>
//                             <select id="venue" required style={{ width: "530px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

//                                 <option value="">Select Class</option>
//                                 <option value="saab">1</option>
//                                 <option value="mercedes">2</option>
//                                 <option value="audi">3 </option>
//                                 <option value="audi">4 </option>
//                                 <option value="audi">5 </option>
//                                 <option value="audi">6 </option>
//                                 <option value="audi">7 </option>
//                                 <option value="audi">8 </option>
//                                 <option value="audi">9 </option>
//                                 <option value="audi">10 </option>

//                             </select>
//                         </Grid>

//                         <Grid class="form-group" style={{ marginBottom: "15px", }}>
//                             <select id="venue" required style={{ width: "530px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
//                                 <option value="">Select Subject</option>
//                                 <option value="saab">Math</option>
//                                 <option value="mercedes">English</option>
//                                 <option value="audi">Physics </option>
//                                 <option value="audi">Chemistry </option>
//                                 <option value="audi">Odia </option>
//                                 <option value="audi">Hindi </option>
//                             </select>
//                         </Grid>
//                     </Grid>
//                     <Grid class="form-group" style={{ marginBottom: "15px", marginLeft: "7%" }}>

//                         <p style={{ fontWeight: 500 }}> Select your Gender:</p>
//                         <RadioGroup
//                             row
//                             aria-labelledby="demo-form-control-label-placement"
//                             name="position"
//                             defaultValue="top"
//                         >

//                             <FormControlLabel style={{ marginLeft: "10px" }} value="1" control={<Radio />} label="Male" />
//                             <FormControlLabel value="2" control={<Radio />} label="Female" />
//                             <FormControlLabel value="3" control={<Radio />} label="Other" />
//                         </RadioGroup>
//                     </Grid>

//                     <center>

//                         <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

//                             Submit
//                         </Button>
//                     </center>

//                 </form>
//             </Grid>
          
//                 <TableContainer sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
//                     <Table aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Email</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Mobile No</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Joining Date</TableCell>

//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Subject</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
//                                 <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             <TableRow>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>1</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Smita@gmail.com</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">986574545</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">02/12/24</TableCell>

//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Maths</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">10th</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">Female</TableCell>
//                                 <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
//                                     <ModeEditOutlineIcon onClick={handleOpenEdit} style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }} />
//                                     <DeleteIcon onClick={handleOpenDelete} style={{ fontSize: "18px", color: "red", cursor: "pointer" }} />
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             <Grid>

//                 <Modal open={openEdit} onClose={handleCloseEdit} style={{ marginTop: "200px" }}>
//                     <center>
//                     <Grid class="contact-form" style={{
//                 backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%"

//             }}>
//                 <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}> Edit Teacher's Details :</Typography>
//                 <form style={{ paddingTop: "20px", paddingBottom: "20px" }}>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly", }}>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="text" id="Name" placeholder=" Name" required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="email" id="email" placeholder="Enter Email " required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>
//                     </Grid>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="number " id="mobile" placeholder="  Enter number" required
//                                 style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />
//                         </Grid>

//                         <Grid class="form-group" style={{ marginBottom: "15px" }}>
//                             <input type="date" id="birthday" name="birthday" style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }} />

//                         </Grid>
//                     </Grid>


//                     <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>


//                         <Grid class="form-group" style={{ marginBottom: "15px", }}>
//                             <select id="venue" required style={{ width: "530px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>

//                                 <option value="">Select Class</option>
//                                 <option value="saab">1</option>
//                                 <option value="mercedes">2</option>
//                                 <option value="audi">3 </option>
//                                 <option value="audi">4 </option>
//                                 <option value="audi">5 </option>
//                                 <option value="audi">6 </option>
//                                 <option value="audi">7 </option>
//                                 <option value="audi">8 </option>
//                                 <option value="audi">9 </option>
//                                 <option value="audi">10 </option>

//                             </select>
//                         </Grid>

//                         <Grid class="form-group" style={{ marginBottom: "15px", }}>
//                             <select id="venue" required style={{ width: "530px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}>
//                                 <option value="">Select Subject</option>
//                                 <option value="saab">Math</option>
//                                 <option value="mercedes">English</option>
//                                 <option value="audi">Physics </option>
//                                 <option value="audi">Chemistry </option>
//                                 <option value="audi">Odia </option>
//                                 <option value="audi">Hindi </option>
//                             </select>
//                         </Grid>
//                     </Grid>
//                     <Grid class="form-group" style={{ marginBottom: "15px", marginLeft: "7%" }}>

//                         <p style={{ fontWeight: 500 }}> Select your Gender:</p>
//                         <RadioGroup
//                             row
//                             aria-labelledby="demo-form-control-label-placement"
//                             name="position"
//                             defaultValue="top"
//                         >

//                             <FormControlLabel style={{ marginLeft: "10px" }} value="1" control={<Radio />} label="Male" />
//                             <FormControlLabel value="2" control={<Radio />} label="Female" />
//                             <FormControlLabel value="3" control={<Radio />} label="Other" />
//                         </RadioGroup>




//                     </Grid>

//                     <center>

//                         <Button style={{ width: "130px", marginTop: "35px", fontWeight: 600, fontSize: "16px", backgroundColor: "#000066", fontColor: " white" }} >

//                             Submit
//                         </Button>
//                     </center>

//                 </form>
//             </Grid>
//                     </center>
//                 </Modal>
//             </Grid>
//             {/* Delete Modal */}
//             <Modal open={openDelete} onClose={handleCloseDelete}>
//                 <Box sx={style}>
//                     <Typography variant="h6" component="h2">
//                         Are you sure you want to delete this entry?

//                     </Typography>
//                     <center style={{ marginTop: "30px" }}>
//                         <Button style={{ backgroundColor: '#000066' }} onClick={handleCloseDelete}>Yes</Button>
//                         <Button style={{ backgroundColor: 'red', marginLeft: "30px" }} onClick={handleCloseDelete}>No</Button>
//                     </center>
//                 </Box>
//             </Modal>
//             <PythonBackend />
//         </>
//     );
// };

// export default Teacherm;

import React, { useState, useEffect } from 'react';
import '../src/Teacherm.css';
import PythonBackend from './Python_backend';
import Sidebar from './Sidebar';
import { Grid, Button, Typography } from '@mui/material';
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

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

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
      <Grid class="contact-form" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", width: "70%", marginLeft: "20%" }}>
        <Typography style={{ color: "#000066", fontWeight: 600, fontSize: "18px", marginLeft: "7%" }}>Teacher's Details :</Typography>
        <form
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            addTeacher();
          }}
        >
          <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
              />
            </Grid>
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
              />
            </Grid>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="number"
                placeholder="Enter Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
              />
            </Grid>
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="date"
                placeholder="Joining Date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
                style={{ width: "500px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
              />
            </Grid>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <select
                value={teacherClass}
                onChange={(e) => setTeacherClass(e.target.value)}
                required
                style={{ width: "530px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
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
            <Grid class="form-group" style={{ marginBottom: "15px" }}>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{ width: "530px", height: "40px", padding: "10px", borderRadius: "5px", borderColor: "1px solid #000066" }}
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Odia">Odia</option>
                <option value="Hindi">Hindi</option>
              </select>
            </Grid>
          </Grid>
          <Grid class="form-group" style={{ marginBottom: "15px", marginLeft: "7%" }}>
            <p style={{ fontWeight: 500 }}> Select your Gender:</p>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
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
      <TableContainer sx={{ marginTop: "50px", width: "72%", marginLeft: "20%" }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }}>Sl No</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Name</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Email</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Mobile No</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Joining Date</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Subject</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Class</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Gender</TableCell>
              <TableCell style={{ color: "#000066", fontWeight: 600, fontSize: "15px" }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={teacher.id}>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }}>{index + 1}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.name}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.email}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.mobile}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.joining_date}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.subject}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.class}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">{teacher.gender}</TableCell>
                <TableCell style={{ color: "gray", fontWeight: 600, fontSize: "15px" }} align="right">
                  <ModeEditOutlineIcon
                    onClick={() => handleEditClick(teacher)}
                    style={{ fontSize: "18px", color: "#000066", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={() => handleDeleteClick(teacher.id)}
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
            Edit Teacher
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTeacher();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            />
            <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            />
            <input
              type="date"
              placeholder="Joining Date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }}
            >
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="English">English</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Odia">Odia</option>
              <option value="Hindi">Hindi</option>
            </select>
            <select
              value={teacherClass}
              onChange={(e) => setTeacherClass(e.target.value)}
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
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
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
            Are you sure you want to delete this entry?
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
      <PythonBackend />
    </>
  );
};

export default Teacherm;