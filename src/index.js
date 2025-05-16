import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Signup from "./Signup";
import Signin from "./Signin";
import PythonBackend from './Python_backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sidebar from './Sidebar';
import Teacherm from "./Teacherm";
import Studentm from './Studentm'
import reportWebVitals from './reportWebVitals';
import Fee from "./Fee";
import Notice from './Notice';
import Classm from "./Classm";
import Attendancem from "./Attendancem";
import Assignmentm from "./Assignmentm"
import Marksentry from "./Marksentry";
import ProfileDetails from "./ProfileDetails";
import ExamResults from "./Examresult"; // Import the ExamResults component
import Teachersidebar from './Teachersidebar';
import StudentDashboard from './StudentDashboard';
import NoticeView from './NoticeView';
import Teachertimetable from "./Teachertimetable"
import StudentTimetable from "./StudentTimetable";
import Studentsidebar from './Studentsidebar';
import Studentsnoticeview  from './Studentsnoticeview';
import TeacherDashboard from './TeacherDashboard';
import Sidebar  from "./Sidebar";
import Dashboard from "./Dashboard";
import  TimeTable from  "./TimeTable";
import Attendanceview from './Attendanceview';
import Assignmentview from './Assignmentview';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <PythonBackend /> */}
        <Route path="/" element={<Signup />} />

        <Route path="/python-backend" element={<PythonBackend />} />

        <Route path="/" element={<Teacherm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/Teacherm" element={<Teacherm />} />
        <Route path="/Studentm" element={<Studentm />} />
        <Route path="/Fee" element={<Fee />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Classm" element={<Classm />} />
        <Route path="/Attendancem" element={<Attendancem />} />
        <Route path="/Assignmentm" element={<Assignmentm />} />
        <Route path="/Marksentry" element={<Marksentry />} />
        <Route path="/ProfileDetails" element={<ProfileDetails />} />
        <Route path="/ExamResults" element={<ExamResults />} /> {/* Added the ExamResults route */}
        <Route path="/Teachersidebar" element={<Teachersidebar />} />
         <Route path="/StudentDashboard" element={<StudentDashboard />} />
         <Route path="/NoticeView" element={<NoticeView />} />
         <Route path="/Teachertimetable" element={<Teachertimetable />} />
         <Route path="/StudentTimetable" element={<StudentTimetable />} />
         <Route path="/Studentsidebar" element={<Studentsidebar />} />
         <Route path="/Studentsnoticeview" element={<Studentsnoticeview />} />
         <Route path="/StudentDashboard" element={<StudentDashboard />} />
         <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
         <Route path="/Sidebar" element={<Sidebar />} />
         <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/TimeTable" element={<TimeTable />} />
          <Route path="/Attendanceview" element={<Attendanceview />} />
          <Route path="/Assignmentview" element={<Assignmentview />} />





      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
