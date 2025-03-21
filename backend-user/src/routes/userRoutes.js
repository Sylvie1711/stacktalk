const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or fetch a user
router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Check if user exists
    let user = await User.findOne({ username });
    
    // If user doesn't exist, create new user
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
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