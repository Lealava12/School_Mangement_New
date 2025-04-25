import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('');

  const apiBaseUrl = 'http://localhost:5000/api';

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    axios
      .post(`${apiBaseUrl}/admin/signup`, {
        email,
        mobile_no: mobileNo,
        roll_no: rollNo,
        password,
      })
      .then((response) => {
        alert(response.data.message);
        if (response.data.user_type) {
          setUserType(response.data.user_type);
        }
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          console.error('Error during signup:', error);
        }
      });
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to bottom right, #ffffff, #ffe4e1, #e6e6fa)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="containers">
        {/* <h1 className="title">SCHOOL MANAGEMENT</h1> */}
        <div className="login-box">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="User Avatar"
            />
          </div>
          <h2 className="login-header">SIGN UP</h2>
          <form onSubmit={handleSignup}>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <style>
              {`
                .white-placeholder::placeholder {
                  color: white;
                }
              `}
            </style>


          <div className="user-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="white-placeholder"
            />
          </div>
            <div className="user-box">
              <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder='Mobile No'
                required
                className="white-placeholder"
              />
            </div>
            <div className="user-box">
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder='ID'
                required
                className="white-placeholder"
              />
            </div>
            <div className="user-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Create Password'
                required
                className="white-placeholder"
              />
            </div>
            <div className="user-box">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                required
                className="white-placeholder"
              />
            </div>

            {userType && (
              <p style={{ color: 'green', textAlign: 'center' }}>
                Registered as: {userType === '1' ? 'Admin' : userType === '2' ? 'Teacher' : 'Student'}
              </p>
            )}

            <button type="submit" className="login-button">
              Create Account
            </button>
          </form>
          <p className="signup-link">
            Do you have an account? <Link to="/Signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
