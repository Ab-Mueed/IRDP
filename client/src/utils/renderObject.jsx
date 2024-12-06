export const renderObject = (data) => {
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
                    <span className="text-gray-600 dark:text-gray-400">{item[key]}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
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
        <div className="text-gray-600 dark:text-gray-400">
          {Array.isArray(data[key]) || typeof data[key] === "object"
            ? renderObject(data[key])
            : data[key]}
        </div>
      </div>
    ));
  } else if (typeof data === "string") {
    return data.split("\n\n").map((line, index) => {
      if (index === 0) {
        return (
          <div key={index} className="text-2xl font-bold text-black dark:text-gray-400 mb-4">
            {line.trim()}
          </div>
        );
      } else {
        const [key, ...rest] = line.split(": ");
        const value = rest.join(": ");
        return (
          <div key={index} className="mb-2">
            {key && <strong>{key}:</strong>}{" "}
            {value && <span className="text-gray-600 dark:text-gray-400">{value}</span>}
          </div>
        );
      }
    });
  } else {
    return <p className="text-gray-600 dark:text-gray-400">{data}</p>;
  }
};
