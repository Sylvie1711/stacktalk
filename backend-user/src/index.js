const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stacktalk-users';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/user', userRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'User Service is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
}); 