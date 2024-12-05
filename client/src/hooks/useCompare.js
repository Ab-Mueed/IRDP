import { useState } from "react";
import { compareJobAndResumeAPI, getFeedbackAPI } from "@/services/api";
import { simulateProgress } from "../utils/helper";

const useCompare = (onCompare, jobAnalysis, resumeAnalysis) => {
  const [progress, setProgress] = useState(0);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const handleCompare = async () => {
    setIsProgressVisible(true);
    setProgress(0);
    const timer = simulateProgress(setProgress);

    if (jobAnalysis && resumeAnalysis) {
      try {
        const comparison = await compareJobAndResumeAPI(
          jobAnalysis,
          resumeAnalysis
        );
        const feedbackResult = await getFeedbackAPI(
          jobAnalysis,
          resumeAnalysis
        );
        console.log(comparison)
        console.log(feedbackResult)
        onCompare(comparison.comparison, feedbackResult.comparison);
      } catch (error) {
        console.error("Error during comparison or feedback fetch", error);
      }
    }
    setIsProgressVisible(false);
    clearInterval(timer);
  };

  return {
    progress,
    isProgressVisible,
    handleCompare,
  };
};

export default useCompare;
