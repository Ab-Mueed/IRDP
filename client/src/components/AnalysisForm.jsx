import JobDescriptionTextArea from "../components/JobDescriptionTextArea";
import ResumeUpload from "./ResumeUpload";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import useJobDescriptionAnalysis from "../hooks/useJobDescriptionAnalysis";
import useResumeAnalysis from "../hooks/useResumeAnalysis";
import useCompare from "../hooks/useCompare";

export default function AnalysisForm({ onAnalyzeJobDescription, onAnalyzeResume, onCompare }) {
  const {
    jobDescription,
    setJobDescription,
    isJobDescriptionAnalyzed,
    handleAnalyzeJobDescription,
    jobAnalysis,
    isProgressVisible: isJobProgressVisible,
    progress: jobProgress,
  } = useJobDescriptionAnalysis(onAnalyzeJobDescription);

  const {
    resumeFile,
    handleResumeUpload,
    isResumeAnalyzed,
    handleAnalyzeResume,
    resumeAnalysis,
    isProgressVisible: isResumeProgressVisible,
    progress: resumeProgress,
  } = useResumeAnalysis(onAnalyzeResume);

  const {
    progress: compareProgress,
    isProgressVisible: isCompareProgressVisible,
    handleCompare,
  } = useCompare(onCompare, jobAnalysis, resumeAnalysis);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-4">
        {/* Job Description Text Area */}
        <JobDescriptionTextArea
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyzeJobDescription={handleAnalyzeJobDescription}
        />

        {/* Resume Upload Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:space-x-4 space-y-4 sm:space-y-0">
          <ResumeUpload resumeFile={resumeFile} handleResumeUpload={handleResumeUpload} />
          <Button
            onClick={handleAnalyzeResume}
            className="flex-1"
            disabled={!resumeFile}
            variant="default"
          >
            Analyze Resume
          </Button>
        </div>

        {/* Compare Button */}
        <div className="flex items-stretch">
          <Button
            onClick={() => handleCompare(jobDescription, resumeFile)}
            className="w-full"
            disabled={!isJobDescriptionAnalyzed || !isResumeAnalyzed}
            variant="default"
          >
            Compare
          </Button>
        </div>

        {/* Progress Bars */}
        <ProgressBar isProgressVisible={isJobProgressVisible} progress={jobProgress} />
        <ProgressBar isProgressVisible={isResumeProgressVisible} progress={resumeProgress} />
        <ProgressBar isProgressVisible={isCompareProgressVisible} progress={compareProgress} />
      </div>
    </div>
  );
}
