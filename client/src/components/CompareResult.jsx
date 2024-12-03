import React from "react";

const CompareResults = ({ comparisonResult }) => {
  return (
    <div>
      {Object.entries(comparisonResult).map(([key, value]) => (
        <div key={key} className="mb-4">
          <strong className="text-lg">{key}:</strong>
          <p className="text-gray-300">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CompareResults;
