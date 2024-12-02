import json

def clean_json_response(response_text):
    cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(cleaned_text)  # Parse the cleaned text as JSON
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON response. The output was not valid JSON."}
