import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from "./Signup" ;
import Signin from "./Signin";
// import PythonBackend from './Python_backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
=======
// import Login from './Login';
// import Signup from './Signup';
>>>>>>> 1ad0590655d88fb6f9399b7d864bfd3576b3e8e3
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
        {/* <PythonBackend /> */}
<<<<<<< HEAD
        <Route path="/" element={<Signup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Signin" element={<Sidebar />} />
=======
        <Route path="/" element={<Sidebar />} />
        <Route path="/Signup" element={<Sidebar />} />
          {/* <Route path="/Login" element={<Login />} /> */}
>>>>>>> 1ad0590655d88fb6f9399b7d864bfd3576b3e8e3
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
