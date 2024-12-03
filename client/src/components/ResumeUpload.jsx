import React, { useState } from "react";

const ResumeUpload = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedData = reader.result;
        onUploadComplete(parsedData); // Assuming JSON or text content
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="bg-gray-900 text-gray-300 rounded-md"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default ResumeUpload;
