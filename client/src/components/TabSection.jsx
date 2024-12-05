import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Results from "./Results";
import useTabSection from "@/hooks/useTabSection";

const TabsSection = ({
  jobDescription,
  resumeAnalysis,
  comparison,
  feedback,
}) => {
  const hasResults = jobDescription || resumeAnalysis || comparison || feedback;

  const { activeTab, setActiveTab } = useTabSection({jobDescription, resumeAnalysis, comparison});

  return (
    <div className="mt-4">
      {hasResults && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="max-w-[700px] mx-auto">
            <TabsList className="flex md:flex-wrap flex-col justify-center gap-2 mb-4">
              <TabsTrigger value="job-analysis">
                Job Description Analysis
              </TabsTrigger>
              <TabsTrigger value="resume-analysis">Resume Analysis</TabsTrigger>
              <TabsTrigger value="comparison-result">
                Comparison Result
              </TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="job-analysis">
            <Results jobDescription={jobDescription} />
          </TabsContent>
          <TabsContent value="resume-analysis">
            <Results resumeAnalysis={resumeAnalysis} />
          </TabsContent>
          <TabsContent value="comparison-result">
            <Results comparison={comparison} />
          </TabsContent>
          <TabsContent value="feedback">
            <Results feedback={feedback} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TabsSection;
