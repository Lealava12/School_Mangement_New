import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const ProfileDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        venue: 'Bhubaneswar',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to server)
        console.log('Form submitted:', formData);
    };

    return (
        <>


            <Sidebar />


            <div
                className="contact-form"
                style={{
                    flex: '1 1 45%',
                    backgroundColor: '#f8f8f8',
                    padding: '20px',
                    borderRadius: '8px',
                    marginLeft: "20%",
                    width: "70%",
                }}
            >

<center>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                     
                        borderRadius: 50,
                        bgcolor: 'primary.main',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}>


                    <label htmlFor="file" style={{ display: "flex", flexDirection: "row", }}>
                        <ModeEditIcon style={{ fontSize: "20px", color: "white",marginLeft:"85px",
                            marginTop:"20px",
                         }} />

                    </label>

                    <input style={{ display: "none" }} type="file" id="file" />

                </Avatar>
                </center>
                <center>
                <form onSubmit={handleSubmit}>

                    
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your full name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '50%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop:"10px",
                            }}
                        />
                          
                    </div>
                  
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            id="email"
                            placeholder="Active email address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="tel"
                            id="mobile"
                            placeholder="Your cell phone number"
                            required
                            value={formData.mobile}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <select
                            id="venue"
                            required
                            value={formData.venue}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <option value="Bhubaneswar">Bhubaneswar</option>
                            {/* Add other venues here */}
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <textarea
                            id="message"
                            placeholder="Additional information or comment"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                height: '100px'
                            }}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="submit-btn"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#020a22',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Get in Touch
                    </button>
                  
                </form>
                </center>
            </div>
        </>
    );
};

export default ProfileDetails;
