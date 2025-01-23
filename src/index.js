import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from "./Signup" ;
import Signin from "./Signin";
import PythonBackend from './Python_backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Signup from './Signup';
import Sidebar from './Sidebar';
import Teacherm from "./Teacherm";
import Studentm from './Studentm'
import reportWebVitals from './reportWebVitals';
import Fee from "./Fee";
import Reports from "./Reports";
import Notice from './Notice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/python-backend" element={<PythonBackend />} />

        <Route path="/" element={<Teacherm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
          {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/Teacherm" element={<Teacherm />} />
        <Route path="/Studentm" element={<Studentm />} />
        <Route path="/Fee" element={<Fee />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Notice" element={<Notice />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
