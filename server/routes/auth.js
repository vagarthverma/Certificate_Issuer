const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Use environment variables in production

// Admin login route
router.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin@123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: 'admin' });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
});

// User registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: 'user' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Logout route to blacklist the token
router.post('/logout', async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  // Add token to the blacklist
  try {
    await BlacklistedToken.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
});


module.exports = router;
