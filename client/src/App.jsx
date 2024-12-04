import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AnalysisForm from "./components/AnalysisForm";
import Results from "./components/Results";
import { Hero2 } from "./components/Hero2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


export default function Page() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [comparison, setComparison] = useState("");
  const [rating, setRating] = useState("Compare to Reveal the Rating");

  const handleAnalyzeJobDescription = (text) => {
    setJobDescription(text);
  };

  const handleAnalyzeResume = (text) => {
    setResumeAnalysis(text);
  };

  const handleCompare = (comparisonData) => {
    setComparison(comparisonData);
  };

  const handleRatingExtracted = (extractedRating) => {
    setRating(extractedRating); // Set the extracted rating
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <Hero2 rating={rating}/>
      {/* <Hero /> */}
      <main className="flex-1 flex-grow px-4 sm:px-6 lg:px-8">
        <AnalysisForm
          onAnalyzeJobDescription={handleAnalyzeJobDescription}
          onAnalyzeResume={handleAnalyzeResume}
          onCompare={handleCompare}
        />
        {/* Tabs Section */}
        <div className="mt-4">
          <Tabs defaultValue="job-analysis" className="w-full">
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
        </div>
      </main>
    </div>
  );
}
