import { useState } from 'react';
import { parseResumeAPI } from "@/services/api";
import { simulateProgress } from "../utils/helper";

const useResumeAnalysis = (onAnalyzeResume) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [isResumeAnalyzed, setIsResumeAnalyzed] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 6 * 1024 * 1024; // 6 MB
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds the limit of 6 MB.");
        return;
      }
      setResumeFile(file);
      setIsResumeAnalyzed(false);
    }
  };

  const handleAnalyzeResume = async () => {
    setIsProgressVisible(true);
    setProgress(0);
    const timer = simulateProgress(setProgress);

    if (resumeFile) {
      const analysis = await parseResumeAPI(resumeFile);
      setResumeAnalysis(analysis);
      setIsResumeAnalyzed(true);
      setIsProgressVisible(false);
      onAnalyzeResume(analysis);
      clearInterval(timer);
    }
  };

  return {
    resumeFile,
    setResumeFile,
    isResumeAnalyzed,
    resumeAnalysis,
    isProgressVisible,
    progress,
    handleResumeUpload,
    handleAnalyzeResume,
  };
};

export default useResumeAnalysis;
