import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AnalysisForm from "./components/AnalysisForm";
import useAppAnalysis from "./hooks/useAppAnalysis";
import AlertModal from "./components/AlertModal";
import TabsSection from "./components/TabSection";

export default function Page() {
  const {
    jobDescription,
    resumeAnalysis,
    comparison,
    rating,
    feedback,
    showAlert,
    handleAnalyzeJobDescription,
    handleAnalyzeResume,
    handleCompare,
    handleAlertClose,
  } = useAppAnalysis();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Hero rating={rating} />
      <AlertModal showAlert={showAlert} onClose={handleAlertClose} />
      <main className="flex-1 flex-grow px-4 sm:px-6 lg:px-8">
        <AnalysisForm
          onAnalyzeJobDescription={handleAnalyzeJobDescription}
          onAnalyzeResume={handleAnalyzeResume}
          onCompare={handleCompare}
        />
        <TabsSection
          jobDescription={jobDescription}
          resumeAnalysis={resumeAnalysis}
          comparison={comparison}
          feedback={feedback}
        />
      </main>
    </div>
  );
}
