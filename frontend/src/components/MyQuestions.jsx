import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Paper,
  Box,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { qnaService } from '../services/api';

const MyQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
      return;
    }

    const fetchMyQuestions = async () => {
      try {
        const data = await qnaService.getUserQuestions(username);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching my questions:', error);
        setError('Failed to load your questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuestions();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3 },
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
            }}
          >
            My Questions
          </Typography>
          <Button
            component={RouterLink}
            to="/ask"
            variant="contained"
            size="large"
            sx={{
              px: 3,
              py: 1
            }}
          >
            Ask New Question
          </Button>
        </Box>
        
        {questions.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              You haven't asked any questions yet.
            </Typography>
            <Button
              component={RouterLink}
              to="/ask"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Ask Your First Question
            </Button>
          </Box>
        ) : (
          <List sx={{ width: '100%' }}>
            {questions.map((question) => (
              <ListItem 
                key={question._id} 
                component={RouterLink} 
                to={`/question/${question._id}`}
                sx={{ 
                  borderBottom: '1px solid #eee',
                  py: 2,
                  px: { xs: 1, sm: 2 },
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { 
                    bgcolor: '#f8f9fa',
                    transition: 'background-color 0.2s'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }, 
                        mb: 1,
                        fontWeight: 500
                      }}
                    >
                      {question.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: { xs: 1, sm: 2 },
                      mt: 1,
                      flexWrap: 'wrap'
                    }}>
                      <Chip 
                        label={`${question.answers?.length || 0} answers`} 
                        size="small"
                        color="primary" 
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                          px: 1.5
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default MyQuestions; 