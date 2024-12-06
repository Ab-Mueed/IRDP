import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:5000"; // Update with your Flask server URL
const API_BASE_URL = "https://hirefit-backend.onrender.com";

export const parseJobDescriptionAPI = async (description) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/parse-job`, {
      job_description: description,
    });
    return response.data;
  } catch (error) {
    console.error("Error parsing job description", error);
  }
};

export const parseResumeAPI = async (resume) => {
  const formData = new FormData();
  formData.append("resume_file", resume);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/parse-resume`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error parsing resume", error);
  }
};

export const compareJobAndResumeAPI = async (jobDesc, resumeDesc) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/compare`, {
      job_json: jobDesc,
      resume_json: resumeDesc,
    });
    return response.data;
  } catch (error) {
    console.error("Error comparing job and resume", error);
  }
};

export const getFeedbackAPI = async (jobDesc, resumeDesc) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback`, {
      job_json: jobDesc,
      resume_json: resumeDesc,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback", error);
  }
};
