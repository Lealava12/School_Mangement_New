import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from "./Signup" ;
import Signin from "./Signin";
// import PythonBackend from './Python_backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Teacherm from "./Teacherm";
import Studentm from './Studentm'
import reportWebVitals from './reportWebVitals';
import Fee from "./Fee";
import Reports from "./Reports"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <PythonBackend /> */}
        <Route path="/" element={<Signup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Signin" element={<Sidebar />} />
        <Route path="/Teacherm" element={<Teacherm />} />
        <Route path="/Studentm" element={<Studentm />} />
        <Route path="/Fee" element={<Fee />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
