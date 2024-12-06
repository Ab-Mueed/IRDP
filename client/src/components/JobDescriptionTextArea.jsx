// JobDescriptionTextarea.jsx
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JobDescriptionTextArea = ({ jobDescription, setJobDescription, onAnalyzeJobDescription }) => {
  return (
    <div>
      <Textarea
        placeholder="Paste a job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="min-h-[100px] w-full mb-2"
      />
      <Button 
        onClick={onAnalyzeJobDescription} 
        className="w-full" 
        disabled={!jobDescription.trim()}
      >
        Analyze Job Description
      </Button>
    </div>
  );
};

export default JobDescriptionTextArea;
