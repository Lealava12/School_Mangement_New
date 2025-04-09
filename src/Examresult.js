import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Studentsidebar from "./Studentsidebar";
import './ExamResults.css';

function ExamResults() {
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = 'http://localhost:5000/api';  // Make sure this matches your Flask route prefix
  const navigate = useNavigate();

  const formatPercentage = (value) => {
    const numValue = parseFloat(value);
    return isNaN(numValue) ? '0.00' : numValue.toFixed(2);
  };

  const fetchMarks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${apiBaseUrl}/student/marks/${studentId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
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
    if (studentId) {
      fetchMarks();
    } else {
      setError('Please enter a student ID');
    }
  };

  return (
    <div className="main-container">
      <Studentsidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Exam Results</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
              style={{
                padding: "8px",
                marginRight: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc"
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
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </form>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>

        {isLoading && <p>Loading...</p>}

        {studentData && (
          <>
            <div className="student-info">
              <p><span>Name:</span> {studentData.student_name}</p>
              <p><span>Student ID:</span> {studentData.student_id}</p>
              <p><span>Class:</span> {studentData.class}</p>
            </div>

            <div className="result-table">
              <table>
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
                    <td colSpan="2">{formatPercentage(studentData.percentage)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExamResults;
