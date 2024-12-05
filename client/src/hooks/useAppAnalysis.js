// hooks/useJobAnalysis.js
import { useState } from "react";

export default function useAppAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [comparison, setComparison] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("Compare to Reveal the Rating");
  const [showAlert, setShowAlert] = useState(true);

  const handleAnalyzeJobDescription = (text) => setJobDescription(text);
  const handleAnalyzeResume = (text) => setResumeAnalysis(text);
  const handleCompare = (comparisonData, feedbackResult) => {
    setComparison(comparisonData);
    setFeedback(feedbackResult);
    if (
      typeof comparisonData === "string" &&
      comparisonData.includes("Rating:")
    ) {
      const match = comparisonData.match(/Rating:\s*(\d+\/\d+)/);
      if (match && match[1]) {
        setRating(match[1]);
      }
    }
  };

  const handleAlertClose = () => setShowAlert(false);

  return {
    jobDescription,
    resumeAnalysis,
    comparison,
    feedback,
    rating,
    showAlert,
    handleAnalyzeJobDescription,
    handleAnalyzeResume,
    handleCompare,
    handleAlertClose,
  };
}
