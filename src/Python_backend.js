// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../src/App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PythonBackend = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerAdmin = () => {
    axios
      .post('http://127.0.0.1:5000/api/admin/signup', {
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
      .post('http://127.0.0.1:5000/api/admin/login', { email, password })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Error during login!');
      });
  };

  return <div>Backend interaction interface</div>;
};




export default PythonBackend;
