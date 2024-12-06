from flask import Blueprint, request, jsonify
from services.genai_service import parse_resume_text
from services.file_parser import pdf_to_text, docx_to_text, txt_to_text

bp = Blueprint("resume_route", __name__)  # Create the Blueprint

@bp.route("/parse-resume", methods=["POST"])
def parse_resume():
    # Check if a file was uploaded
    if "resume_file" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400 #Hasaan

    resume_file = request.files["resume_file"]
    file_type = resume_file.content_type  # Get the MIME type of the uploaded file
    resume_text = ""

    # Determine the file type and extract text accordingly
    try:
        if file_type == "application/pdf":
            resume_text = pdf_to_text(resume_file)
        elif file_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            resume_text = docx_to_text(resume_file)
        elif file_type == "text/plain":
            resume_text = txt_to_text(resume_file)
        else:
            return jsonify({"error": "Unsupported file format. Please upload PDF, DOCX, or TXT."}), 400 #Hasaan
    except Exception as e:
        return jsonify({"error": f"Failed to process the uploaded file: {str(e)}"}), 500

    if not resume_text.strip():
        return jsonify({"error": "No content could be extracted from the file."}), 400 # Hasaan

    # Parse the extracted text using the AI model
    result = parse_resume_text(resume_text)
    return jsonify(result)

