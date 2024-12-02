import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";

const ResumeUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Clear previous errors
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume_file", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/parse-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUploadComplete(response.data); // Pass parsed data to parent component
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while uploading the file.");
      console.error("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="secondary" component="span">
          Select Resume
        </Button>
      </label>
      {file && <p className="mt-2">Selected File: {file.name}</p>}
      <div className="mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload & Analyze"}
        </Button>
      </div>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default ResumeUpload;