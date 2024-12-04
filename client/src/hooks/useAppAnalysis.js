// hooks/useJobAnalysis.js
import { useState } from "react";

export default function useAppAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [comparison, setComparison] = useState("");
  const [rating, setRating] = useState("Compare to Reveal the Rating");

  const handleAnalyzeJobDescription = (text) => setJobDescription(text);
  const handleAnalyzeResume = (text) => setResumeAnalysis(text);
  const handleCompare = (comparisonData) => setComparison(comparisonData);
  const handleRatingExtracted = (extractedRating) => setRating(extractedRating);

  return {
    jobDescription,
    resumeAnalysis,
    comparison,
    rating,
    handleAnalyzeJobDescription,
    handleAnalyzeResume,
    handleCompare,
    handleRatingExtracted,
  };
}
