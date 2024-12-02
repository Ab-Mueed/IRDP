import { useState } from "react";
import { TextField, Button } from "@mui/material";

const JobDescriptionForm = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = () => {
    if (jobDescription) {
      onSubmit(jobDescription);
    }
  };

  return (
    <div className="mb-6">
      <TextField
        label="Enter Job Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={jobDescription}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="mt-4"
      >
        Analyze Job Description
      </Button>
    </div>
  );
};

export default JobDescriptionForm;