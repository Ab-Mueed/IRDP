from utils.response_cleaner import clean_json_response
from utils.model import get_model

# Temporary for Testing Purposes
import logging
logging.basicConfig(level=logging.DEBUG)

# Get the initialized Gemini model
model = get_model()

def parse_job_description(job_description):
    logging.info('Starting to Parse job description')
    prompt = f"Extract the Industry, Experience, and Skill from the Job description and show it in JSON format: {job_description}"
    response = model.generate_content(prompt)
    logging.debug(f"Raw response: {response.text}")
    return clean_json_response(response.text)


def parse_resume_text(resume_text):
    prompt = f"Extract the Industry, Experience, and Skill from the candidate's resume and show it in JSON format: {resume_text}"
    response = model.generate_content(prompt)
    return clean_json_response(response.text)

def compare_job_and_resume(job_json, resume_json):
    prompt = f"""
    Compare the following Job Description and Candidate Resume and provide a general assessment.
    Please do not include Markdown. Do not apply any visual styling to the text.

    Rating: Give a rating out of 10. Each rating level corresponds to the following:

    1/10: The resume doesn't meet any requirements of the job description.
    2/10: Very few aspects of the resume align with the job description.
    3/10: Some aspects of the resume are relevant, but there are significant gaps.
    4/10: The resume partially meets the job description with a few key areas lacking.
    5/10: The resume meets some of the key job requirements but has areas for improvement.
    6/10: The resume aligns with most aspects of the job description, with a few minor gaps.
    7/10: The resume matches the job description very well, with only minor areas for improvement.
    8/10: The resume almost perfectly matches the job description with one or two small gaps.
    9/10: The resume aligns with the job description almost perfectly, but there are very minor discrepancies.
    10/10: The resume fully matches the job description with no gaps or discrepancies.


    Industry: Give Rating out of 10 - Explain the alignment of the resume’s industry with the job description’s industry requirements.
    Experience: Give Rating out of 10 - Analyze whether the candidate’s experience matches the expectations set by the job description (duration, relevance, etc.).
    Skills: Give Rating out of 10 - Evaluate the skills in the resume and their relevance to the skills listed in the job description.
    
    Why not a perfect 10?: Explain the reasons for not giving a perfect score of 10, detailing any small discrepancies or areas for improvement.

    Job Description
    {job_json}

    Candidate Resume
    {resume_json}
    """
    response = model.generate_content(prompt)
    return response.text

def feedback_parse(job_json, resume_json):
    prompt = f"""
    Compare the following Job Description and Candidate Resume and provide a general assessment.
    Please do not include Markdown. Do not apply any visual styling to the text.

    Overall Assessment: Provide in not more than 3 words.
  
    Job Description Match: Based on the analysis of the resume, what type of job description would align best with the candidate’s current skill set? If applicable, suggest jobs that would be a better fit.

    Focus Areas for Improvement: If the user still wants to focus on the current job description (the one compared with), suggest a roadmap in paragraph.

    Job Description
    {job_json}

    Candidate Resume
    {resume_json}
    """
    response = model.generate_content(prompt)
    return response.text


