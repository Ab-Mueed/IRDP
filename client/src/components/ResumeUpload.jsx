import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { formatFileSize } from "../utils/helper";  // Import the utility function

const ResumeUpload = ({ resumeFile, handleResumeUpload }) => {
  return (
    <div 
      className="relative flex-1"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleResumeUpload({ target: { files: [file] } });
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
  );
};

export default ResumeUpload;
