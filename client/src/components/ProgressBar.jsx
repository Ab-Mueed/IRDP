// ProgressBar.jsx
import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ isProgressVisible, progress }) => {
  if (!isProgressVisible) return null;

  return (
    <div className="mt-4">
      <Progress value={progress} className="w-[50%] mx-auto" />
    </div>
  );
};

export default ProgressBar;
