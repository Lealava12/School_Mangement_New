import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';

const Login = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = 'http://localhost:5000/api';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform login
      const loginResponse = await axios.post(
        `${apiBaseUrl}/login`,
        { roll_no: rollNo, password },
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      alert(loginResponse.data.message);

      // Check login status
      const statusResponse = await axios.get(`${apiBaseUrl}/login/status`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (statusResponse.data.isLoggedIn) {
        const { user_id, user_type, redirect } = statusResponse.data;

        // Store user info in local storage
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('user_type', user_type);

        // Redirect user to the appropriate dashboard
        if (redirect) {
          navigate(redirect);
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        console.error('Error during login:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    }
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

            <div className="user-box">
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="User ID"
                required
                className="white-placeholder"
              />
            </div>
            <div className="user-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
