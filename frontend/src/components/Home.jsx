import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Container,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    try {
      // Store username in localStorage
      localStorage.setItem('username', username);
      
      // In a real app, we would call the User Service API here:
      // await axios.post('http://localhost:5001/user', { username });
      
      // Navigate to questions page
      navigate('/questions');
    } catch (error) {
      setError('Error creating user. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        overflow: 'hidden' 
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <QuestionAnswerIcon 
              sx={{ 
                fontSize: '4rem', 
                color: 'primary.main', 
                mb: 2 
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                textAlign: 'center', 
                color: 'primary.main' 
              }}
            >
              Welcome to StackTalk
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                textAlign: 'center', 
                color: 'text.secondary',
                mt: 2
              }}
            >
              A community-driven Q&A platform
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Typography 
              variant="h6" 
              sx={{ mb: 2, fontWeight: 500 }}
            >
              Enter a unique username to begin
            </Typography>
            
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 3 }}
              autoFocus
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              Get Started
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home; 