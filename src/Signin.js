import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import axios from 'axios';
import './Signin.css';

const Login = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added error state for better error handling
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const apiBaseUrl = 'http://localhost:5000/api';

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(`${apiBaseUrl}/login`, { roll_no: rollNo, password })
      .then((response) => {
        alert(response.data.message);

        // Store user info in local storage
        const { user_type, pages, redirect } = response.data;
        localStorage.setItem('user_type', user_type);
        localStorage.setItem('user_pages', JSON.stringify(pages));

        // Redirect user to the appropriate dashboard
        if (redirect) {
          navigate(redirect); // Use navigate for redirection
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error); // Display error message
        } else {
          console.error('Error during login:', error);
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
          <h2 className="login-header">LOGIN</h2>
          <form onSubmit={handleLogin}>
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
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder='User ID'
                required
                className="white-placeholder"
              />
            </div>
            <div className="user-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
                className="white-placeholder"
              />
            </div>
            <div className="checkbox-forgot">
              <div className="checkbox-container">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="/">Forgot Password?</a>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don’t have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
