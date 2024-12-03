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
  const [jobDescResponse, setJobDescResponse] = useState(""); // New state for storing job description response

  const handleJobDescriptionSubmit = async (description) => {
    setLoading(true);
    setError("");
    try {
      const jobDescData = await parseJobDescriptionAPI(description);
      setJobDescription(jobDescData);
      setJobDescResponse(jobDescData); // Store the response here
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

  // Helper function to render the job description response as a list of items
  const renderJobDescResponse = (response) => {
    if (typeof response === 'object' && response !== null) {
      return Object.keys(response).map((key) => {
        // Check if the value is an array (e.g., Skills) and join with commas
        if (Array.isArray(response[key])) {
          return (
            <div key={key} className="mb-4">
              <strong className="text-lg">{key}:</strong>
              <p>{response[key].join(", ")}</p> {/* Join array values with commas */}
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-gray-800 text-white rounded-lg shadow-lg p-8 flex">
        <div className="flex-1 mr-8">
          <h1 className="text-5xl font-extrabold text-white mb-8 text-center">
            Job Fit Analyzer
          </h1>
          <JobDescriptionForm onSubmit={handleJobDescriptionSubmit} />
          <ResumeUpload onUploadComplete={handleResumeUpload} />
          <div className="mt-8 flex justify-center space-x-6">
            <button
              onClick={handleCompare}
              disabled={loading}
              className={`px-8 py-3 text-white font-semibold rounded-lg transform transition duration-200 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {loading ? "Processing..." : "Compare"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
          )}
        </div>

        <div className="flex-1">
          {jobDescResponse && (
            <div className="mt-8 bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Job Description Output:
              </h2>
              <div className="text-gray-300">
                {renderJobDescResponse(jobDescResponse)}
              </div>
            </div>
          )}

          {comparisonResult && (
            <div className="mt-8">
              <CompareResults comparisonResult={comparisonResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
