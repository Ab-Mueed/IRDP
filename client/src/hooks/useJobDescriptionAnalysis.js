import { useState } from "react";
import { parseJobDescriptionAPI } from "@/services/api";
import { simulateProgress } from "../utils/helper";

const useJobDescriptionAnalysis = (onAnalyzeJobDescription) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isJobDescriptionAnalyzed, setIsJobDescriptionAnalyzed] =
    useState(false);
  const [jobAnalysis, setJobAnalysis] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const handleAnalyzeJobDescription = async () => {
    setIsProgressVisible(true);
    setProgress(0);
    const timer = simulateProgress(setProgress);

    const analysis = await parseJobDescriptionAPI(jobDescription);
    setJobAnalysis(analysis);
    setIsJobDescriptionAnalyzed(true);
    setIsProgressVisible(false);
    onAnalyzeJobDescription(analysis);
    clearInterval(timer);
  };

  return {
    jobDescription,
    setJobDescription,
    isJobDescriptionAnalyzed,
    jobAnalysis,
    isProgressVisible,
    progress,
    handleAnalyzeJobDescription,
  };
};

export default useJobDescriptionAnalysis;
