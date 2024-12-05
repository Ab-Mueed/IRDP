import { useEffect } from "react";

export const renderObject = (data, onRatingExtracted) => {
  useEffect(() => {
    // Extract rating only once when data is a string and includes "Rating:"
    if (typeof data === "string" && data.includes("Rating:")) {
      const match = data.match(/Rating:\s*(\d+\/\d+)/);
      if (match && match[1]) {
        onRatingExtracted(match[1]); // Pass the extracted rating
      }
    }
  }, [data, onRatingExtracted]); // Only rerun effect if 'data' changes

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
            ? renderObject(data[key], onRatingExtracted)
            : data[key]}
        </div>
      </div>
    ));
  } else if (typeof data === "string") {
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
