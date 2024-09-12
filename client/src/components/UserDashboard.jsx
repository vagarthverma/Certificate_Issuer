import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [certificateId, setCertificateId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search/${certificateId}`);
      setStudent(response.data);
      setError('');
    } catch (err) {
      setStudent(null);
      setError('Certificate not found');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });
  
    // Certificate border
    doc.setLineWidth(4);
    doc.setDrawColor(0, 0, 255); // Blue border
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
  
    // Title
    doc.setFont('Times', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(0, 51, 102); // Dark Blue
    doc.text('Certificate of Completion', doc.internal.pageSize.width / 2, 100, { align: 'center' });
  
    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(`This certifies that`, doc.internal.pageSize.width / 2, 160, { align: 'center' });
  
    // Student Name
    doc.setFont('Times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 51, 102); // Dark Blue
    doc.text(`${student.studentName}`, doc.internal.pageSize.width / 2, 200, { align: 'center' });
  
    // Certificate content
    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(
      `has successfully completed the internship in ${student.internshipDomain}`,
      doc.internal.pageSize.width / 2,
      240,
      { align: 'center' }
    );
    doc.text(
      `from ${new Date(student.startDate).toLocaleDateString()} to ${new Date(student.endDate).toLocaleDateString()}.`,
      doc.internal.pageSize.width / 2,
      260,
      { align: 'center' }
    );
  
    // Certificate ID
    doc.setFont('Times', 'italic');
    doc.setFontSize(14);
    doc.text(`Certificate ID: ${student.certificateId}`, doc.internal.pageSize.width / 2, 300, { align: 'center' });
  
    // Dummy Signature
    doc.setFont('Cursive', 'normal');
    doc.setFontSize(26);
    doc.text('Xavier', doc.internal.pageSize.width / 2 - 120, 365);
  
    // Signature line
    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    doc.text('_____________________', doc.internal.pageSize.width / 2 - 150, 380);
    doc.text('Authorized Signature', doc.internal.pageSize.width / 2 - 130, 400);
  
    // Footer
    doc.setFont('Times', 'italic');
    doc.setFontSize(12);
    doc.text('Thank you for your dedication and hard work.', doc.internal.pageSize.width / 2, 450, { align: 'center' });
  
    // Save the PDF
    doc.save(`Certificate_${student.certificateId}.pdf`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Redirect to the login page after logging out
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {student && (
        <div className="card bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-2">Certificate Details</h2>
          <p><strong>Certificate ID:</strong> {student.certificateId}</p>
          <p><strong>Student Name:</strong> {student.studentName}</p>
          <p><strong>Internship Domain:</strong> {student.internshipDomain}</p>
          <p><strong>Start Date:</strong> {new Date(student.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(student.endDate).toLocaleDateString()}</p>

          <button
            onClick={generatePDF}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
