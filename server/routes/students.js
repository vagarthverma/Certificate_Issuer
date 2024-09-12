const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Route to fetch all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

module.exports = router;
