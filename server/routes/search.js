const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Route to search for student details by certificate ID
router.get('/search/:certificateId', async (req, res) => {
  try {
    const student = await Student.findOne({ certificateId: req.params.certificateId });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving student details' });
  }
});

module.exports = router;
