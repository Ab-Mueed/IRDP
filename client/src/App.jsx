import React, { useState } from "react";
import JobDescriptionForm from "./components/JobDescription";
import ResumeUpload from "./components/ResumeUpload";
import CompareResults from "./components/CompareResult";
import { parseJobDescriptionAPI, compareJobAndResumeAPI } from "./services/api";
import { Button, CircularProgress } from "@mui/material";

const App = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState(null); // Store parsed resume data
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Handle errors

  const handleJobDescriptionSubmit = async (description) => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const jobDescData = await parseJobDescriptionAPI(description);
      setJobDescription(jobDescData);
    } catch (err) {
      setError("Failed to parse job description.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (parsedResumeData) => {
    setResumeData(parsedResumeData); // Directly store parsed resume data
  };

  const handleCompare = async () => {
    if (!jobDescription || !resumeData) {
      setError("Please provide both a job description and a resume.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const result = await compareJobAndResumeAPI(jobDescription, resumeData);
      setComparisonResult(result);
    } catch (err) {
      setError("Failed to compare job description and resume.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Fit Analyzer</h1>

      <JobDescriptionForm onSubmit={handleJobDescriptionSubmit} />
      <ResumeUpload onUploadComplete={handleResumeUpload} />

      <div className="mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompare}
          disabled={loading}
        >
          Compare
        </Button>
      </div>

      {loading && (
        <div className="mt-4">
          <CircularProgress />
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {comparisonResult && <CompareResults comparisonResult={comparisonResult} />}
    </div>
  );
};

export default App;