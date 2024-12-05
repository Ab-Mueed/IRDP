from flask import Blueprint, request, jsonify
from services.genai_service import feedback_parse

bp = Blueprint("feedback_route", __name__)  # Create the Blueprint

@bp.route("/feedback", methods=["POST"])
def feedback():
    data = request.json
    job_json = data.get("job_json", {})
    resume_json = data.get("resume_json", {})

    if not job_json or not resume_json:
        return jsonify({"error": "Job and Resume JSON data are required"}), 400

    result = feedback_parse(job_json, resume_json)
    return jsonify({"comparison": result})
