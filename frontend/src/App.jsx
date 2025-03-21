import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import QuestionList from './components/QuestionList';
import AskQuestion from './components/AskQuestion';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: '#f5f5f5'
      }}>
        <Navbar />
        <Box sx={{ width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
