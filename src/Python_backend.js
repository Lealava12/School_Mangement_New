import React, { useState , useEffect } from 'react';
import axios from 'axios';

const PythonBackend = () => {
  // State variables for form inputs and teacher list
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherClass, setTeacherClass] = useState('');
  const [gender, setGender] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [students, setStudents] = useState([]);

 // API base URL from the environment variable or default
const apiBaseUrl = 'http://localhost:5000/api';

// Fetch all teachers from the backend
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
      mobile: mobileNo, // Ensure field matches backend
      joining_date: joiningDate,
      subject,
      class: teacherClass,
      gender,
    })
    .then((response) => {
      alert(response.data.message);
      fetchTeachers(); // Refresh teacher list after adding
    })
    .catch((error) => {
      alert(error.response?.data?.error || 'Error adding teacher!');
    });
};

// Update a teacher's information
const updateTeacher = (id) => {
  axios
    .put(`${apiBaseUrl}/Teachers/${id}`, {
      name,
      email,
      mobile: mobileNo, // Ensure field matches backend
      joining_date: joiningDate,
      subject,
      class: teacherClass,
      gender,
    })
    .then((response) => {
      alert(response.data.message);
      fetchTeachers(); // Refresh teacher list after updating
    })
    .catch((error) => {
      alert(error.response?.data?.error || 'Error updating teacher!');
    });
};

// Delete a teacher by ID
const deleteTeacher = (id) => {
  axios
    .delete(`${apiBaseUrl}/Teachers/${id}`)
    .then((response) => {
      alert(response.data.message);
      fetchTeachers(); // Refresh teacher list after deletion
    })
    .catch((error) => {
      alert(error.response?.data?.error || 'Error deleting teacher!');
    });
};
  // // Register a new admin (this could be modified to handle sign-up logic for an admin)
  // const registerAdmin = () => {
  //   axios
  //     .post(`${apiBaseUrl}/admin/signup`, {
  //       email,
  //       mobile_no: mobileNo,
  //       roll_no: rollNo,
  //       password,
  //     })
  //     .then((response) => {
  //       alert(response.data.message);
  //     })
  //     .catch((error) => {
  //       alert(error.response?.data?.error || 'Error during signup!');
  //     });
  // };

  // // Log in as an admin
  // const loginAdmin = () => {
  //   axios
  //     .post(`${apiBaseUrl}/admin/login`, { email, password })
  //     .then((response) => {
  //       alert(response.data.message);
  //     })
  //     .catch((error) => {
  //       alert(error.response?.data?.error || 'Error during login!');
  //     });
  // };

  // // Log out the current admin
  // const logoutAdmin = () => {
  //   axios
  //     .post(`${apiBaseUrl}/admin/logout`)
  //     .then((response) => {
  //       alert(response.data.message);
  //       window.location.href = '/'; // Redirect to home after logging out
  //     })
  //     .catch((error) => {
  //       alert(error.response?.data?.error || 'Error during logout!');
  //     });
  // };

  // Fetch teacher data on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
  </div>
  );
};

export default PythonBackend;

// import axios from 'axios';

// // API base URL
// const apiBaseUrl = 'http://localhost:5000/api';

// // Fetch all students
// export const fetchStudents = async (filters = {}) => {
//     try {
//         const params = {};
//         if (filters.class) params.class = filters.class;
//         if (filters.section) params.section = filters.section;
//         if (filters.roll_no) params.roll_no = filters.roll_no;

//         const response = await axios.get(`${apiBaseUrl}/admin/Students`, { params });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.error || 'Error fetching students!');
//     }
// };

// // Add a new student
// export const addStudent = async (studentData) => {
//     try {
//         const response = await axios.post(`${apiBaseUrl}/admin/Students`, studentData);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.error || 'Error adding student!');
//     }
// };

// // Update a student
// export const updateStudent = async (studentId, studentData) => {
//     try {
//         const response = await axios.put(`${apiBaseUrl}/admin/Students`, { ...studentData, id: studentId });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.error || 'Error updating student!');
//     }
// };

// // Delete a student
// export const deleteStudent = async (studentId) => {
//     try {
//         const response = await axios.delete(`${apiBaseUrl}/admin/Students`, { params: { id: studentId } });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.error || 'Error deleting student!');
//     }
// };
