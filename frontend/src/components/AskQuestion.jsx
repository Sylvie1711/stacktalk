import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/questions', formData);
      navigate('/');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Ask a Question
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Question Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Question Details"
            name="body"
            value={formData.body}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Post Question
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AskQuestion; 