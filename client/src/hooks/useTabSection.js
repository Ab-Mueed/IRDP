import { useState, useEffect } from "react";

export default function useTabSection({
  jobDescription,
  resumeAnalysis,
  comparison,
}) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (jobDescription) setActiveTab("job-analysis");
  }, [jobDescription]);

  useEffect(() => {
    if (resumeAnalysis) setActiveTab("resume-analysis");
  }, [resumeAnalysis]);

  useEffect(() => {
    if (comparison) setActiveTab("comparison-result");
  }, [comparison]);

  return {
    activeTab,
    setActiveTab,
  };
}
