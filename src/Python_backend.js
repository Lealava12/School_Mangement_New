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

  // API base URL from the environment variable or default
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
        mobileNo,
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
  const updateTeacher = () => {
    axios
      .put(`${apiBaseUrl}/Teachers/${teacherId}`, {
        name,
        email,
        mobileNo,
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

  // Register a new admin (this could be modified to handle sign-up logic for an admin)
  const registerAdmin = () => {
    axios
      .post(`${apiBaseUrl}/admin/signup`, {
        email,
        mobile_no: mobileNo,
        roll_no: rollNo,
        password,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error during signup!');
      });
  };

  // Log in as an admin
  const loginAdmin = () => {
    axios
      .post(`${apiBaseUrl}/admin/login`, { email, password })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error during login!');
      });
  };

  // Log out the current admin
  const logoutAdmin = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`)
      .then((response) => {
        alert(response.data.message);
        window.location.href = '/'; // Redirect to home after logging out
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error during logout!');
      });
  };

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
