import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertModal = ({ showAlert, onClose }) => {
  if (!showAlert) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
        <Alert>
          <AlertTitle className="text-lg">Welcome to the site!</AlertTitle>
          <AlertDescription>
            This website uses a large language model (LLM) in the backend to
            compare job descriptions with resume. The results may vary with
            each instance of comparison, as the LLM is not always 100% accurate
            and may contain some inaccuracies. Please note that the results may
            not always align with real-world expectations. The purpose of this
            website is simply to inform users about how well the provided job
            description matches the user's resume.
          </AlertDescription>
        </Alert>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-black"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
