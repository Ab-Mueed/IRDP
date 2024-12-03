from utils.response_cleaner import clean_json_response
from utils.model import get_model

# Temp
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
    Compare the following Job Description and Candidate Resume and say FIT or NOT FIT as a general heading. 
    Give a rating out of 10, and explain the assessment for Industry, Experience, and Skills in separate lines. 
    Also, explain reasons for not giving a perfect 10. And please do not include Markdown.

    Job Description:
    {job_json}

    Candidate Resume:
    {resume_json}
    """
    response = model.generate_content(prompt)
    return response.text
