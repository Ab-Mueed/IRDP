import React from "react";

const CompareResults = ({ comparisonResult }) => {
  const { comparison } = comparisonResult || {};

  // Helper function to handle \n and properly render text with line breaks
  const formatText = (text) => {
    if (!text) return "No results available.";
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line.trim()}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-md text-gray-300">
      <h2 className="text-2xl font-semibold text-gray-400 mb-4">
        Comparison Results
      </h2>
      <div className="bg-gray-800 p-4 text-sm text-gray-400 rounded whitespace-pre-wrap">
        {comparison ? formatText(comparison) : "No results available."}
      </div>
    </div>
  );
};

export default CompareResults;
