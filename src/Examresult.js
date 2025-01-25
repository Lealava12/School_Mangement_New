import React from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';

function ExamResults() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Exam Results</h1>
        </div>

        <div className="student-info">
          <p><span>Name:</span> Rudra Prasad Rautray</p>
          <p><span>Roll No:</span> 2041018081</p>
          <p><span>Class:</span> 6<sup>th</sup></p>
          <p><span>Section:</span> B</p>
        </div>

        <div className="result-table">
          <table>
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>Subjects</th>
                <th>Half-Yearly</th>
                <th>Annual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Odia</td>
                <td>90</td>
                <td>92</td>
              </tr>
              <tr>
                <td>2</td>
                <td>English</td>
                <td>85</td>
                <td>88</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Hindi</td>
                <td>91</td>
                <td>92</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Math</td>
                <td>88</td>
                <td>89</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Science</td>
                <td>86</td>
                <td>85</td>
              </tr>
              <tr>
                <td>6</td>
                <td>SST</td>
                <td>80</td>
                <td>78</td>
              </tr>
              <tr className="total-row">
                <td colSpan="2">Total</td>
                <td>520/600</td>
                <td>524/600</td>
              </tr>
              <tr className="percentage-row">
                <td colSpan="2">Percentage</td>
                <td>86.66%</td>
                <td>87.33%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExamResults;
