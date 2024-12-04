import { useState } from "react";
import NavBar from "./components/NavBar";
import useAppAnalysis from "./hooks/useAppAnalysis";
import AnalysisForm from "./components/AnalysisForm";
import Results from "./components/Results";
import Hero from "./components/Hero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  const {
    jobDescription,
    resumeAnalysis,
    comparison,
    rating,
    handleAnalyzeJobDescription,
    handleAnalyzeResume,
    handleCompare,
    handleRatingExtracted
  } = useAppAnalysis();

  const hasResults = jobDescription || resumeAnalysis || comparison;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Hero rating={rating} />
      <main className="flex-1 flex-grow px-4 sm:px-6 lg:px-8">
        <AnalysisForm
          onAnalyzeJobDescription={handleAnalyzeJobDescription}
          onAnalyzeResume={handleAnalyzeResume}
          onCompare={handleCompare}
        />
        {/* Tabs Section */}
        <div className="mt-4">
          {hasResults && (
            <Tabs defaultValue="" className="w-full">
              <div className="max-w-[580px] mx-auto">
                <TabsList className="flex md:flex-wrap flex-col justify-center gap-2 mb-4">
                  <TabsTrigger value="job-analysis">Job Description Analysis</TabsTrigger>
                  <TabsTrigger value="resume-analysis">Resume Analysis</TabsTrigger>
                  <TabsTrigger value="comparison-result">Comparison Result</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="job-analysis">
                <Results
                  jobDescription={jobDescription}
                  resumeAnalysis={null}
                  comparison={null}
                />
              </TabsContent>
              <TabsContent value="resume-analysis">
                <Results
                  jobDescription={null}
                  resumeAnalysis={resumeAnalysis}
                  comparison={null}
                />
              </TabsContent>
              <TabsContent value="comparison-result">
                <Results
                  jobDescription={null}
                  resumeAnalysis={null}
                  comparison={comparison}
                  onRatingExtracted={handleRatingExtracted}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
