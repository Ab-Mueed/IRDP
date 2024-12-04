import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';
import { parseJobDescriptionAPI, parseResumeAPI, compareJobAndResumeAPI } from "@/services/api"; // Importing the API functions

export default function AnalysisForm({ onAnalyzeJobDescription, onAnalyzeResume, onCompare }) {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isJobDescriptionAnalyzed, setIsJobDescriptionAnalyzed] = useState(false);
  const [isResumeAnalyzed, setIsResumeAnalyzed] = useState(false);
  const [jobAnalysis, setJobAnalysis] = useState(""); // To store job analysis result
  const [resumeAnalysis, setResumeAnalysis] = useState(""); // To store resume analysis result

  const handleAnalyzeJobDescription = async () => {
    const analysis = await parseJobDescriptionAPI(jobDescription);
    const analysisText = JSON.stringify(analysis, null, 2);
    setJobAnalysis(analysis); // Update state with job description analysis
    console.log(analysisText);
    setIsJobDescriptionAnalyzed(true);
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
    if (resumeFile) {
      const analysis = await parseResumeAPI(resumeFile);
      const analysisText = JSON.stringify(analysis, null, 2);
      setResumeAnalysis(analysis); // Update state with resume analysis result
      console.log('Analysis Text: ' + analysisText);
      console.log(analysis);
      setIsResumeAnalyzed(true);
      onAnalyzeResume(analysis); // Pass the analysis to parent component
    }
  };

  const handleCompare = async () => {
    if (jobAnalysis && resumeAnalysis) {
      const comparison = await compareJobAndResumeAPI(jobAnalysis, resumeAnalysis);
      console.log(comparison)
      onCompare(comparison.comparison); // Pass comparison result to parent component
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-4">
        <Textarea
          placeholder="Paste a job description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[100px]"
        />
        <Button 
          onClick={handleAnalyzeJobDescription} 
          className="w-full" 
          disabled={!jobDescription.trim()}
        >
          Analyze Job Description
        </Button>
        <div className="flex items-center space-x-4">
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
              accept=".pdf,.doc,.docx"
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
        <Button 
          onClick={handleCompare} 
          className="w-full" 
          disabled={!isJobDescriptionAnalyzed || !isResumeAnalyzed} 
          variant="default"
        >
          Compare
        </Button>
      </div>
    </div>
  );
}
