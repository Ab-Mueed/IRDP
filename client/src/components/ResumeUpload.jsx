import { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onUploadComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error uploading file.");
      console.error(err);
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
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200"
      >
        Select Resume
      </label>
      {file && (
        <p className="mt-2 text-gray-300 font-medium">
          Selected File: {file.name}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className={`px-8 py-3 font-medium text-white rounded-lg transform transition duration-200 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default ResumeUpload;
