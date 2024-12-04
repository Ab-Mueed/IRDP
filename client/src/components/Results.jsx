export default function Results({
  jobDescription,
  resumeAnalysis,
  comparison,
}) {
  const hasResults = jobDescription || resumeAnalysis || comparison;

  if (!hasResults) return null;

  // Function to render object data
  const renderObject = (data) => {
    if (typeof data === "object" && data !== null) {
      // Check if it's an array (e.g., Experience), and render accordingly
      if (Array.isArray(data)) {
        // Render array elements as a comma-separated list
        return (
          <div>
            {data.map((item, index) => (
              <span key={index}>
                {typeof item === "object" ? (
                  // If the array item is an object, render its keys
                  Object.keys(item).map((key) => (
                    <div key={key}>
                      <strong>{key}:</strong> <span className="text-gray-600">{item[key]}</span>
                    </div>
                  ))
                ) : (
                  // If the array item is a simple string, render it directly
                  <span className="text-gray-600">{item}</span>
                )}
                {index < data.length - 1 && ", "} {/* Add a comma except after the last item */}
              </span>
            ))}
          </div>
        );
      }
  
      // Handle objects with nested arrays (like Skills or Experience)
      return Object.keys(data).map((key) => (
        <div key={key}>
          <strong>{key}:</strong>
          <div className="text-gray-600">
            {Array.isArray(data[key]) || typeof data[key] === "object"
              ? renderObject(data[key]) // Recursively handle nested arrays/objects
              : data[key]}
          </div>
        </div>
      ));
    } else if (typeof data === "string") {
      // Preserve newlines and bold keys for strings
      return data.split("\n\n").map((line, index) => {
        if (index === 0) {
          // Handle "FIT" as a special case
          return (
            <div key={index} className="text-2xl font-bold text-black mb-4">
              {line.trim()}
            </div>
          );
        } else {
          const [key, ...rest] = line.split(": ");
          const value = rest.join(": "); // Rejoin in case the value contains ":"
          return (
            <div key={index} className="mb-2">
              {key && <strong>{key}:</strong>} {value && <span className="text-gray-600">{value}</span>}
            </div>
          );
        }
      });
    } else {
      return <p className="text-gray-600">{data}</p>;
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <h2 className="text-3xl font-bold mb-8">Results</h2> */}
      <hr className="mb-2"/>
      <div className="grid md:grid-cols-2 gap-8">
        {jobDescription && (
          <div>
            <h3 className="text-lg font-medium mb-4 italic">
              Job Description Analysis
            </h3>
            {renderObject(jobDescription)}
          </div>
        )}
        {resumeAnalysis && (
          <div>
            <h3 className="text-lg font-medium mb-4 italic">Resume Analysis</h3>
            {renderObject(resumeAnalysis)}
          </div>
        )}
      </div>
      <hr className="mt-2" />
      {comparison && (
        <div className="mt-8">
          <h3 className="text-3xl font-medium mb-4 italic">FeedBack</h3>
          {renderObject(comparison)}
        </div>
      )}
    </div>
  );
}
