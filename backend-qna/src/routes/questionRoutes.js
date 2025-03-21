const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const { username, title, body } = req.body;
    
    if (!username || !title || !body) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const question = new Question({
      username,
      title,
      body
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add an answer to a question
router.post('/:id/answers', async (req, res) => {
  try {
    const { username, body } = req.body;
    
    if (!username || !body) {
      return res.status(400).json({ error: 'Username and answer are required' });
    }

    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.answers.push({ username, body });
    await question.save();
    
    res.status(201).json(question);
  } catch (error) {
    console.error('Error adding answer:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get questions by username
router.get('/user/:username', async (req, res) => {
  try {
    const questions = await Question.find({ 
      username: req.params.username 
    }).sort({ createdAt: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching user questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 