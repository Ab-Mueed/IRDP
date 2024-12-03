import React, { useState } from "react";

const JobDescriptionForm = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleChange = (e) => setJobDescription(e.target.value);

  const handleSubmit = () => {
    if (jobDescription) onSubmit(jobDescription);
  };

  return (
    <div className="mb-6 bg-neutral-800 p-6 rounded-lg shadow-md">
      <textarea
        placeholder="Enter Job Description"
        value={jobDescription}
        onChange={handleChange}
        className="w-full h-40 p-4 text-neutral-300 border border-neutral-600 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 bg-neutral-900"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Analyze Job Description
      </button>
    </div>
  );
};

export default JobDescriptionForm;
