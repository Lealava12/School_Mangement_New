import React from 'react';
import { Link } from 'react-router-dom';  // Importing Link from react-router-dom
import './Signin.css';

export default function Login() {
  return (
    <div className="container">
        <h1 className="title">SCHOOL MANAGEMENT</h1>
      <div className="login-box">
        <div className="avatar">
          <img  src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User Avatar" />
        </div>
        <h2 className="login-header">LOGIN</h2>
        <form>
          <div className="user-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" required />
            <label>Password</label>
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
  );
}