import { renderObject } from "../utils/renderObject";


export default function Results({
  jobDescription,
  resumeAnalysis,
  comparison,
  feedback,
}) {
  const hasResults = jobDescription || resumeAnalysis || comparison || feedback;


  if (!hasResults) return null;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <h2 className="text-3xl font-bold mb-8">Results</h2> */}
      <hr className="mb-4" />
      <div className="grid grid-cols-1 dark:text-[#e8e6e3] ">
        {jobDescription && (
          <div>
            <h3 className="text-lg font-medium mb-4 italic ">
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
        {feedback && (
          <div className="">
            <h3 className="text-lg font-medium mb-4 italic">Feedback</h3>
            {renderObject(feedback)}
          </div>
        )}
      </div>
      <hr className="mt-4" />
    </div>
  );
}
