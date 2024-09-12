const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const studentsRoute = require('./routes/students');
const authRoute = require('./routes/auth');

const app = express();
const searchRoute = require('./routes/search');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', searchRoute);
app.use('/api', uploadRoute);
app.use('/api', studentsRoute);
app.use('/api/auth', authRoute); 

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/your_database_name')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
