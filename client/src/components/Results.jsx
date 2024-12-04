export default function Results({
  jobDescription,
  resumeAnalysis,
  comparison,
  onRatingExtracted
}) {
  const hasResults = jobDescription || resumeAnalysis || comparison;

  if (!hasResults) return null;


  // Function to render object data
  const renderObject = (data) => {
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        return (
          <div>
            {data.map((item, index) => (
              <span key={index}>
                {typeof item === "object" ? (
                  Object.keys(item).map((key) => (
                    <div key={key}>
                      <strong>{key}:</strong>{" "}
                      <span className="text-gray-600">{item[key]}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-600">{item}</span>
                )}
                {index < data.length - 1 && ", "}
              </span>
            ))}
          </div>
        );
      }
      return Object.keys(data).map((key) => (
        <div key={key}>
          <strong>{key}:</strong>
          <div className="text-gray-600">
            {Array.isArray(data[key]) || typeof data[key] === "object"
              ? renderObject(data[key])
              : data[key]}
          </div>
        </div>
      ));
    } else if (typeof data === "string") {
      if (data.includes("Rating:")) {
        // Extract rating using a regular expression
        const match = data.match(/Rating:\s*(\d+\/\d+)/);
        if (match && match[1]) {
          // Send the rating back to parent component
          onRatingExtracted(match[1]); // Pass the extracted rating
        }
      }
      return data.split("\n\n").map((line, index) => {
        if (index === 0) {
          return (
            <div key={index} className="text-2xl font-bold text-black mb-4">
              {line.trim()}
            </div>
          );
        } else {
          const [key, ...rest] = line.split(": ");
          const value = rest.join(": ");
          return (
            <div key={index} className="mb-2">
              {key && <strong>{key}:</strong>}{" "}
              {value && <span className="text-gray-600">{value}</span>}
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
      <hr className="mb-4" />
      <div className="grid grid-cols-1 ">
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
        {comparison && (
          <div className="">
            <h3 className="text-lg font-medium mb-4 italic">Comparison Result</h3>
            {renderObject(comparison)}
          </div>
        )}
      </div>
      <hr className="mt-4" />
    </div>
  );
}
