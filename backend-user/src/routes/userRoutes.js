const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or fetch a user
router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Check if user exists
    let user = await User.findOne({ username });
    
    if (user) {
      return res.status(200).json(user);
    }

    // Create new user if doesn't exist
    user = new User({ username });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if username is available
router.get('/check/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json({ isAvailable: !user });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all questions by a user
router.get('/:username/questions', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('questions');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 