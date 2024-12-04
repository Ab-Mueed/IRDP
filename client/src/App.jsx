import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AnalysisForm from "./components/AnalysisForm";
import Results from "./components/Results";

export default function Page() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [comparison, setComparison] = useState("");

  const handleAnalyzeJobDescription = (text) => {
    setJobDescription(text);
  };

  const handleAnalyzeResume = (text) => {
    console.log(text);
    setResumeAnalysis(text);
  };

  const handleCompare = (comparisonData) => {
    console.log(comparison);
    // Here you would typically send the job description and resume to a backend service
    // For this example, we'll just set a placeholder comparison text
    setComparison(comparisonData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <main className="flex-1 flex-grow">
        <AnalysisForm
          className=""
          onAnalyzeJobDescription={handleAnalyzeJobDescription}
          onAnalyzeResume={handleAnalyzeResume}
          onCompare={handleCompare}
        />
        <Results
          jobDescription={jobDescription}
          resumeAnalysis={resumeAnalysis}
          comparison={comparison}
        />
      </main>
    </div>
  );
}
