import React from 'react';
import Sidebar from './Sidebar';
import './ExamResults.css';

function NoticeView() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="container">
        <div className="header">
          <h1 className="exam-title">Notice Board</h1>
        </div>

        <div className="result-table">
          <table>
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>Notice</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>New Year</td>
                <td>01/01/2025</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Republic Day</td>
                <td>26/01/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NoticeView;
