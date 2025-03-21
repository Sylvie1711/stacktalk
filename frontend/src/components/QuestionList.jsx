import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Paper,
  Box,
  Chip,
  Button
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5001/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading...</Typography>
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
            Recent Questions
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
            Ask Question
          </Button>
        </Box>
        
        {questions.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No questions yet. Be the first to ask!
            </Typography>
            <Button
              component={RouterLink}
              to="/ask"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Ask a Question
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
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                        }}
                      >
                        Asked by {question.username}
                      </Typography>
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

export default QuestionList; 