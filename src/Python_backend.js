import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../src/App.css";

const PythonBackend = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    // GET Request for home route
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    // Admin registration
    const registerAdmin = () => {
        axios.post('http://127.0.0.1:5000/admin/register', {
            email: email,
            password: password,
            confirm_password: confirmPassword
        })
        .then((response) => {
            alert(response.data.message);
            console.log(response.data);
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                console.error("There was an error registering the admin!", error);
            }
        });
    };

    // Admin login
    const loginAdmin = () => {
        axios.post('http://127.0.0.1:5000/admin/login', {
            email: email,
            password: password
        })
        .then((response) => {
            alert(response.data.message);
            if (response.data.redirect) {
                window.location.href = response.data.redirect;
            }
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                console.error("There was an error logging in!", error);
            }
        });
    };

    return (
        <div>
            
        </div>
    );
};

export default PythonBackend;
