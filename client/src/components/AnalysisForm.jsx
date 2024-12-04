import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';
import { parseJobDescriptionAPI, parseResumeAPI, compareJobAndResumeAPI } from "@/services/api"; // Importing the API functions
import { Progress } from "@/components/ui/progress"; // Import the progress bar component

export default function AnalysisForm({ onAnalyzeJobDescription, onAnalyzeResume, onCompare }) {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isJobDescriptionAnalyzed, setIsJobDescriptionAnalyzed] = useState(false);
  const [isResumeAnalyzed, setIsResumeAnalyzed] = useState(false);
  const [jobAnalysis, setJobAnalysis] = useState(""); // To store job analysis result
  const [resumeAnalysis, setResumeAnalysis] = useState(""); // To store resume analysis result
  const [progress, setProgress] = useState(0); // Progress bar value
  const [isProgressVisible, setIsProgressVisible] = useState(false); // Whether progress bar is visible

  const handleAnalyzeJobDescription = async () => {
    setIsProgressVisible(true);
    setProgress(0); // Reset progress
    // Simulating progress as the API works
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(timer); // Stop progress once it's complete
        return 100;
      });
    }, 300); // Update every 300ms to simulate progress

    const analysis = await parseJobDescriptionAPI(jobDescription);
    const analysisText = JSON.stringify(analysis, null, 2);
    setJobAnalysis(analysis); // Update state with job description analysis
    console.log(analysisText);
    setIsJobDescriptionAnalyzed(true);
    setIsProgressVisible(false); // Hide progress bar
    onAnalyzeJobDescription(analysis); // Pass the analysis to parent component
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setIsResumeAnalyzed(false);
    }
  };

  const handleAnalyzeResume = async () => {
    setIsProgressVisible(true);
    setProgress(0); // Reset progress
    // Simulating progress as the API works
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(timer); // Stop progress once it's complete
        return 100;
      });
    }, 300); // Update every 300ms to simulate progress

    if (resumeFile) {
      const analysis = await parseResumeAPI(resumeFile);
      const analysisText = JSON.stringify(analysis, null, 2);
      setResumeAnalysis(analysis); // Update state with resume analysis result
      console.log('Analysis Text: ' + analysisText);
      console.log(analysis);
      setIsResumeAnalyzed(true);
      setIsProgressVisible(false); // Hide progress bar
      onAnalyzeResume(analysis); // Pass the analysis to parent component
    }
  };

  const handleCompare = async () => {
    setIsProgressVisible(true);
    setProgress(0); // Reset progress
    // Simulating progress as the API works
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(timer); // Stop progress once it's complete
        return 100;
      });
    }, 300); // Update every 300ms to simulate progress

    if (jobAnalysis && resumeAnalysis) {
      const comparison = await compareJobAndResumeAPI(jobAnalysis, resumeAnalysis);
      onCompare(comparison.comparison); // Pass comparison result to parent component
    }
    setIsProgressVisible(false); // Hide progress bar
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-4">
        <Textarea
          placeholder="Paste a job description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[100px] w-full"
        />
        <Button 
          onClick={handleAnalyzeJobDescription} 
          className="w-full" 
          disabled={!jobDescription.trim()}
        >
          Analyze Job Description
        </Button>
        <div className="flex flex-col sm:flex-row items-stretch sm:space-x-4 space-y-4 sm:space-y-0">
          <div 
            className="relative flex-1"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                handleResumeUpload({ target: { files: [file] } });
              }
            }}
          >
            <input
              type="file"
              id="resume-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleResumeUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button variant="secondary" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {resumeFile ? `${resumeFile.name} (${formatFileSize(resumeFile.size)})` : 'Upload resume'}
            </Button>
          </div>
          <Button 
            onClick={handleAnalyzeResume} 
            className="flex-1" 
            disabled={!resumeFile} 
            variant="default"
          >
            Analyze Resume
          </Button>
        </div>
        <div className="flex items-stretch">
          <Button 
            onClick={handleCompare} 
            className="w-full" 
            disabled={!isJobDescriptionAnalyzed || !isResumeAnalyzed} 
            variant="default"
          >
            Compare
          </Button>
        </div>

        {/* Progress Bar visible only when in progress */}
        {isProgressVisible && (
          <div className="mt-4">
            <Progress value={progress} className="w-[50%] mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
