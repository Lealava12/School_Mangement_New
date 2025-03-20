import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";

const StudentTimetable = () => {
  const [notices, setNotices] = useState([]);

  const apiBaseUrl = 'http://localhost:5000/api';

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/notices`);
      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="main-container">
      <Studentsidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Notice Board</h1>
        </div>

        <div className="notices-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '300px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ color: '#000066', fontWeight: '600', fontSize: '18px' }}>{notice.title}</h3>
              <p style={{ color: '#555', fontSize: '14px' }}>
                Uploaded on: {new Date(notice.uploaded_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTimetable;
