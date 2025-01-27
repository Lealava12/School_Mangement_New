import React, { useState } from 'react';
import axios from 'axios';

const PythonBackend = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Access the API base URL from the environment variable
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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

  const logoutAdmin = () => {
    axios
      .post(`${apiBaseUrl}/admin/logout`)
      .then((response) => {
        alert(response.data.message); // Show success message
        if (response.data.redirect) {
          window.location.href = response.data.redirect; // Redirect if specified
        } else {
          window.location.href = "/"; // Default redirect to the home page
        }
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error during logout!'); // Show error message
      });
  };

  return (
    <div>
      <h3>Backend Interaction Interface</h3>
    </div>
  );
};

export default PythonBackend;
