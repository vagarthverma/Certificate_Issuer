import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the database when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        setMessage('Error fetching data from the database');
      }
    };

    fetchStudents();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);

      // Fetch the updated list of students after file upload
      const studentData = await axios.get('http://localhost:5000/api/students');
      setStudents(studentData.data);
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded float-right"
      >
        Logout
      </button>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
          accept=".xlsx"
        />
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload File
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}

      <h2 className="text-xl font-bold mt-6">Uploaded Entries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Certificate ID</th>
              <th className="py-2 px-4 border-b">Student Name</th>
              <th className="py-2 px-4 border-b">Internship Domain</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{student.certificateId}</td>
                <td className="py-2 px-4 border-b">{student.studentName}</td>
                <td className="py-2 px-4 border-b">{student.internshipDomain}</td>
                <td className="py-2 px-4 border-b">{new Date(student.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(student.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
