import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { qnaService } from '../services/api';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
      return;
    }

    const fetchQuestion = async () => {
      try {
        const data = await qnaService.getQuestion(id);
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question:', error);
        setError('Failed to load question. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, navigate]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/');
      return;
    }

    try {
      await qnaService.addAnswer(id, {
        username,
        answer
      });
      // Refresh question data to show new answer
      const updatedQuestion = await qnaService.getQuestion(id);
      setQuestion(updatedQuestion);
      setAnswer(''); // Clear answer form
    } catch (error) {
      console.error('Error posting answer:', error);
      setError('Error posting answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
    <Box sx={{ maxWidth: '900px', mx: 'auto', p: 3 }}>
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Question Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
            }}
          >
            {question.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            {question.body}
          </Typography>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Asked by {question.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Answer Form */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 500,
              color: 'primary.main',
              mb: 2
            }}
          >
            Your Answer
          </Typography>
          <Box component="form" onSubmit={handleSubmitAnswer}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here..."
              variant="outlined"
              required
              disabled={submitting}
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained"
              disabled={submitting}
              sx={{ 
                px: 3,
                py: 1
              }}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Post Answer'
              )}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Answers List */}
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 500,
              color: 'primary.main',
              mb: 2
            }}
          >
            {question.answers?.length || 0} Answers
          </Typography>
          {question.answers?.length === 0 ? (
            <Typography color="text.secondary">
              No answers yet. Be the first to answer!
            </Typography>
          ) : (
            <List>
              {question.answers?.map((answer, index) => (
                <ListItem key={index} sx={{ 
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: 2
                }}>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          mb: 1
                        }}
                      >
                        {answer.answer}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                      >
                        Answered by {answer.username}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default QuestionDetail; 