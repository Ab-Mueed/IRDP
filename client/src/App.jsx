import React, { useState } from "react";
import JobDescriptionForm from "./components/JobDescription";
import ResumeUpload from "./components/ResumeUpload";
import CompareResults from "./components/CompareResult";
import { parseJobDescriptionAPI, compareJobAndResumeAPI } from "./services/api";

const App = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobDescResponse, setJobDescResponse] = useState("");

  const handleJobDescriptionSubmit = async (description) => {
    setLoading(true);
    setError("");
    try {
      const jobDescData = await parseJobDescriptionAPI(description);
      setJobDescription(jobDescData);
      setJobDescResponse(jobDescData);
    } catch (err) {
      setError("Failed to parse job description.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (parsedResumeData) => {
    setResumeData(parsedResumeData);
  };

  const handleCompare = async () => {
    if (!jobDescription || !resumeData) {
      setError("Please provide both a job description and a resume.");
      return;
    }

    setLoading(true);
    setError("");
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

  const renderJobDescResponse = (response) => {
    if (typeof response === "object" && response !== null) {
      return Object.keys(response).map((key) => {
        if (Array.isArray(response[key])) {
          return (
            <div key={key} className="mb-4">
              <strong className="text-lg">{key}:</strong>
              <p>{response[key].join(", ")}</p>
            </div>
          );
        } else {
          return (
            <div key={key} className="mb-4">
              <strong className="text-lg">{key}:</strong>
              <p>{response[key]}</p>
            </div>
          );
        }
      });
    }
    return <p>{response}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-gray-800 text-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-center mb-4">Job Fit Analyzer</h1>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enter Job Description</h2>
            <JobDescriptionForm onSubmit={handleJobDescriptionSubmit} />
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
            <ResumeUpload onUploadComplete={handleResumeUpload} />
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-200 shadow-md ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Compare"}
          </button>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-6">
          {jobDescResponse && (
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Job Description Analysis</h2>
              <div className="text-gray-300">{renderJobDescResponse(jobDescResponse)}</div>
            </div>
          )}

          {comparisonResult && (
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Comparison Results</h2>
              <CompareResults comparisonResult={comparisonResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
