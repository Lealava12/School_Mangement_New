import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/api/admin/signup', {
        email,
        mobile_no: mobileNo,
        roll_no: rollNo,
        password,
      })
      .then((response) => {
        alert(response.data.message);
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error('Error during signup:', error);
        }
      });
  };

  return (
    <div className="container">
      <h1 className="title">SCHOOL MANAGEMENT</h1>
      <div className="login-box">
        <div className="avatar">
          <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User Avatar" />
        </div>
        <h2 className="login-header">SIGN UP</h2>
        <form onSubmit={handleSignup}>
          <div className="user-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
            <label>Mobile No</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
            <label>Roll No</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Create Password</label>
          </div>
          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
        <p className="signup-link">
          Do you have an account? <Link to="/Signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

