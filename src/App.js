import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Signin';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import Assignmentm from './Assignmentm';
import NoticeView from './NoticeView';
import Fee from './Fee';
import Teacherm from './Teacherm';
import Studentm from './Studentm';
import Classm from './Classm'; // Add other components as needed
import ExamResults from './ExamResults';
import TimeTable from './TimeTable';
import MarksEntry from './MarksEntry';
import Assignview from './Assignview';
import Resultview from './Resultview';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/Assignmentm" element={<Assignmentm />} />
        <Route path="/NoticeView" element={<NoticeView />} />
        <Route path="/Fee" element={<Fee />} />
        <Route path="/Teacherm" element={<Teacherm />} />
        <Route path="/Studentm" element={<Studentm />} />
        <Route path="/Classm" element={<Classm />} />
        <Route path="/ExamResults" element={<ExamResults />} />
        <Route path="/TimeTable" element={<TimeTable />} />
        <Route path="/marksEntry" element={<MarksEntry />} />
        <Route path="/Assignview" element={<Assignview />} />
        <Route path="/Resultview" element={<Resultview />} />
      </Routes>
    </Router>
    
  );
};
export default App;
