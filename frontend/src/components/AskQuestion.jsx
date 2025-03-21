import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { qnaService } from '../services/api';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Get username from localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
      return;
    }

    try {
      await qnaService.createQuestion({
        ...formData,
        username
      });
      navigate('/questions');
    } catch (error) {
      console.error('Error posting question:', error);
      setError('Error posting question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', p: 3 }}>
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
            mb: 3
          }}
        >
          Ask a Question
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Question Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            placeholder="What's your question? Be specific."
            sx={{ mb: 3 }}
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Question Details"
            name="body"
            value={formData.body}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
            variant="outlined"
            placeholder="Provide all the details someone would need to answer your question..."
            sx={{ mb: 3 }}
            disabled={loading}
          />
          
          {error && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 2,
              py: 1.5,
              px: 4,
              fontWeight: 500,
              fontSize: '1rem'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Post Question'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AskQuestion; 