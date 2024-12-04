import { useState } from 'react';
import { compareJobAndResumeAPI } from "@/services/api";
import { simulateProgress } from "../utils/helper";

const useCompare = (onCompare) => {
  const [progress, setProgress] = useState(0);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const handleCompare = async (jobAnalysis, resumeAnalysis) => {
    setIsProgressVisible(true);
    setProgress(0);
    const timer = simulateProgress(setProgress);

    if (jobAnalysis && resumeAnalysis) {
      const comparison = await compareJobAndResumeAPI(jobAnalysis, resumeAnalysis);
      onCompare(comparison.comparison);
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
