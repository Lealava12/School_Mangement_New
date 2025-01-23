import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/api/admin/login', { email, password })
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
          console.error('Error during login:', error);
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
        <h2 className="login-header">LOGIN</h2>
        <form onSubmit={handleLogin}>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signin.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         if (data.user.type === 'Admin') {
//           navigate('/admin-dashboard');
//         } else {
//           navigate('/signin');
//         }
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('Failed to login. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">SCHOOL MANAGEMENT</h1>
//       <div className="login-box">
//         <div className="avatar">
//           <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User Avatar" />
//         </div>
//         <h2 className="login-header">LOGIN</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="user-box">
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             <label>Email</label>
//           </div>
//           <div className="user-box">
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//             <label>Password</label>
//           </div>
//           <div className="checkbox-forgot">
//             <div className="checkbox-container">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <div className="forgot-password">
//               <a href="/">Forgot Password?</a>
//             </div>
//           </div>
//           <button type="submit" className="login-button">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }