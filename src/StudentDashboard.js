import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <ul>
        <li><Link to="/NoticeView">View Notices</Link></li>
        <li><Link to="/Assignmentm">View Assignments</Link></li>
      </ul>
    </div>
  );
};

export default StudentDashboard;
