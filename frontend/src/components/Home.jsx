import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { userService } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Check if username is available
      const { isAvailable } = await userService.checkUsername(username);
      
      if (!isAvailable) {
        setError('Username is already taken');
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const user = await userService.createUser(username);
      
      // Store username in localStorage
      localStorage.setItem('username', username);
      
      // Navigate to questions page
      navigate('/questions');
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      px: 2
    }}>
      <Card sx={{ 
        maxWidth: '450px',
        width: '100%',
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
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Get Started'
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home; 