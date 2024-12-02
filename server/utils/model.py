import google.generativeai as genai
import os

def get_model():
    # Configure and return the Gemini model
    genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
    return genai.GenerativeModel(model_name="gemini-1.5-flash")
