const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const developerRoutes = require('./routes/developerRoutes');
const mongoURI = 'mongodb://localhost:27017/developers-site'; // Replace with your MongoDB connection URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other operations after successful connection
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/developers', developerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
