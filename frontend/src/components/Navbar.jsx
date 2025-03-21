import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Chip, Avatar } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Navbar = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location]); // Re-check when location changes

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    window.location.href = '/'; // Redirect to home page
  };

  // Hide navbar on the home page
  if (location.pathname === '/' && !username) {
    return null;
  }

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        mb: 2 
      }}
    >
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: { xs: '56px', sm: '64px' },
            px: { xs: 2, sm: 3 }
          }}
        >
          <QuestionAnswerIcon 
            sx={{ 
              display: 'flex', 
              mr: 1,
              color: 'primary.main',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }} 
          />
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to={username ? "/questions" : "/"}
            sx={{ 
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            StackTalk
          </Typography>
          
          {username ? (
            // Logged in state
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              <Button 
                component={RouterLink} 
                to="/questions"
                sx={{ 
                  color: 'text.primary',
                  display: { xs: 'none', sm: 'block' },
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Questions
              </Button>
              <Button 
                component={RouterLink} 
                to="/my-questions"
                sx={{ 
                  color: 'text.primary',
                  display: { xs: 'none', sm: 'block' },
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                My Questions
              </Button>
              <Button 
                component={RouterLink} 
                to="/ask"
                variant="contained"
                sx={{ 
                  px: { xs: 1.5, sm: 2 },
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Ask Question
              </Button>
              <Chip
                avatar={<Avatar>{username.charAt(0).toUpperCase()}</Avatar>}
                label={username}
                color="primary"
                variant="outlined"
                onClick={() => {}}
                sx={{ ml: 1 }}
              />
              <Button 
                color="inherit"
                onClick={handleLogout}
                sx={{ 
                  ml: 1,
                  color: 'error.main',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            // Logged out state
            <Button 
              component={RouterLink} 
              to="/"
              variant="contained"
              sx={{ 
                px: { xs: 1.5, sm: 2 },
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 