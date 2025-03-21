const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questionRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stacktalk-qna';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/questions', questionRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'QnA Service is running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`QnA Service running on port ${PORT}`);
}); 