import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure Sidebar is properly imported

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Sidebar for navigation */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        {/* <ul>
          <li><Link to="/Teacherm">Manage Teachers</Link></li>
          <li><Link to="/Studentm">Manage Students</Link></li>
          <li><Link to="/Fee">Manage Fees</Link></li>
          <li><Link to="/Assignmentm">Manage Assignments</Link></li>
          <li><Link to="/NoticeView">View Notices</Link></li>
        </ul> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
