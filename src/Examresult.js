import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";
import './ExamResults.css';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';

function ExamResults() {
  const [studentData, setStudentData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInStudentId, setLoggedInStudentId] = useState(null);
  const apiBaseUrl = 'http://localhost:5000/api'; // Ensure this matches your Flask route prefix
  const navigate = useNavigate();

  // Fetch the logged-in user's student_id on component mount
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const statusRes = await axios.get(`${apiBaseUrl}/login/status`, {
          withCredentials: true,
        });

        if (statusRes.data.isLoggedIn) {
          setLoggedInStudentId(statusRes.data.user_id); // Set the logged-in user's student_id
        } else {
          navigate('/signin'); // Redirect to signin if not logged in
        }
      } catch (err) {
        console.error("Error fetching login status:", err);
        navigate('/signin'); // Redirect to signin on error
      }
    };

    fetchLoginStatus();
  }, [navigate]);

  const fetchMarks = async () => {
    if (!searchId.trim()) {
      setError('Please enter a Student ID');
      return;
    }

    if (searchId !== loggedInStudentId) {
      setError('You can only view your own exam results.');
      setStudentData(null);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${apiBaseUrl}/student/marks/${searchId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.student_marks && response.data.student_marks.length > 0) {
        setStudentData(response.data.student_marks[0]);
        setError('');
      } else {
        setError('No exam results found for this Student ID');
        setStudentData(null);
      }
    } catch (err) {
      console.error('Error:', err);
      setStudentData(null);
      if (err.response?.status === 404) {
        setError('No marks found for this Student ID');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch results');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMarks();
  };

  return (
    <>
      <Studentsidebar />

      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          p: 3,
          borderRadius: 2,
          maxWidth: "1300px",
          mx: "auto",
          mt: 13,
        }}
      >
        <h1 className="exam-title">Exam Results</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Student ID"
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              backgroundColor: "#000066",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              left: 20,
              marginTop: "13px",
            }}
          >
            Search
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </Box>

      {isLoading && <p>Loading...</p>}

      {studentData && (
        <>
          <div className="student-info">
            <p><span>Name:</span> {studentData.student_name}</p>
            <p><span>Student ID:</span> {studentData.student_id}</p>
            <p><span>Class:</span> {studentData.class}</p>
          </div>

          <div style={{ overflowX: "auto", marginTop: "30px" }}>
            <table
              style={{
                marginLeft: "15%",
                maxWidth: "1300px",
                margin: "0 auto",
                textAlign: "center",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mathematics</td>
                  <td>{studentData.math}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>{studentData.english}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Physics</td>
                  <td>{studentData.physics}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Chemistry</td>
                  <td>{studentData.chemistry}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Odia</td>
                  <td>{studentData.odia}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Hindi</td>
                  <td>{studentData.hindi}</td>
                  <td>100</td>
                </tr>
                <tr className="total-row">
                  <td>Total</td>
                  <td>{studentData.marks_obtained || 0}</td>
                  <td>{studentData.total_marks || 600}</td>
                </tr>
                <tr className="percentage-row">
                  <td>Percentage</td>
                  <td colSpan="2">{studentData.percentage || 0}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default ExamResults;
