const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const Student = require('../models/Student');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

function excelSerialDateToJSDate(serial) {
  // Excel date system starts at 1900-01-01 and erroneously includes 1900-02-29
  const excelEpoch = new Date(1899, 11, 30); // This adjusts for Excel's leap year bug
  const jsDate = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
  return jsDate;
}

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save each entry to the database
    for (let data of sheetData) {
      let startDate = excelSerialDateToJSDate(data['Start Date']); // Convert Excel serial date to JS date
      let endDate = excelSerialDateToJSDate(data['End Date']); // Convert Excel serial date to JS date

      // Check if conversion was successful
      if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error(`Invalid date format for entry: ${JSON.stringify(data)}`);
      }

      const student = new Student({
        certificateId: data['Certificate ID'],
        studentName: data['Name'],
        internshipDomain: data['Internship Domain'],
        startDate: startDate,
        endDate: endDate,
      });
      await student.save();
    }

    res.status(200).json({ message: 'File uploaded and data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file' });
  }
});

module.exports = router;
