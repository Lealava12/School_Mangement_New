import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';

import Signup from "./Signup";
import Signin from "./Signin";
// import PythonBackend from './Python_backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Teacherm from "./Teacherm";
import Studentm from './Studentm';
import reportWebVitals from './reportWebVitals';
import Fee from "./Fee";
import Reports from "./Reports";
import Notice from './Notice';
import Classm from "./Classm";
import Attendancem from "./Attendancem";
import Assignmentm from "./Assignmentm";
import Marksentry from "./Marksentry";
import ProfileDetails from "./ProfileDetails";
import ExamResults from "./Examresult"; // Import the ExamResults component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <PythonBackend /> */}
        <Route path="/" element={<Teacherm />} />
      
        {/* <Route path="/python-backend" element={<PythonBackend />} /> */}

        {/* <Route path="/" element={<Signup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} /> */}
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/Teacherm" element={<Teacherm />} />
        <Route path="/Studentm" element={<Studentm />} />
        <Route path="/Fee" element={<Fee />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Classm" element={<Classm />} />
        <Route path="/Attendancem" element={<Attendancem />} />
        <Route path="/Assignmentm" element={<Assignmentm />} />
        <Route path="/Marksentry" element={<Marksentry />} />
        <Route path="/ProfileDetails" element={<ProfileDetails />} />
        <Route path="/ExamResults" element={<ExamResults />} /> {/* Added the ExamResults route */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
