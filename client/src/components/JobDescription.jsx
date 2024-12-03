import React, { useState } from "react";

const JobDescriptionForm = ({ onSubmit }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        className="w-full p-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste the job description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Analyze Job Description
      </button>
    </form>
  );
};

export default JobDescriptionForm;
