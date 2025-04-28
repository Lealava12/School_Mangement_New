import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Studentsidebar from "./Studentsidebar";
import axios from 'axios';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const apiBaseUrl = 'http://localhost:5000/api'; // Adjust the base URL as needed

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/assignments`, { withCredentials: true });
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (filePath) => {
    setSelectedImage(filePath);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage('');
  };

  return (
    <>
      <Studentsidebar />
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: "1300px",
          mx: "auto",
          mt: 13,
        }}
      >
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography
            variant="h5"
            style={{
              marginBottom: '20px',
              color: '#000066',
              textAlign: 'center',
            }}
          >
            Your Assignments
          </Typography>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : assignments.length === 0 ? (
            <Typography>No assignments found.</Typography>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={headerStyle}>Sl No</TableCell>
                    <TableCell style={headerStyle}>Title</TableCell>
                    <TableCell style={headerStyle} align="right">Date</TableCell>
                    <TableCell style={headerStyle} align="right">Description</TableCell>
                    <TableCell style={headerStyle} align="right">Download</TableCell>
                    <TableCell style={headerStyle} align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((assignment, index) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell align="right">{assignment.date}</TableCell>
                      <TableCell align="right">{assignment.description}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          href={assignment.file_path}
                          target="_blank"
                          download
                          size="small"
                        >
                          Download
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleView(assignment.file_path)}
                          size="small"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {/* Modal for Viewing Image */}
          <Dialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
              Assignment Preview
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Assignment"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              )}
            </DialogContent>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
};

const headerStyle = {
  color: "#000066",
  fontWeight: 600,
  fontSize: "15px",
};

export default StudentAssignments;
